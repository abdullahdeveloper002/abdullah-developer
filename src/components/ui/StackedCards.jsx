"use client";

import { Children, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { m, motionValue, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];
// Breathing room kept below the stack when deciding whether it fits the viewport.
const FIT_MARGIN = 24;

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const pick = (value, isLarge) => (typeof value === "object" ? (isLarge ? value.lg : value.base) : value);

/**
 * Cards that pile up as you scroll: each card sticks a little lower than the one
 * before it, so the next card slides over the previous one while that one eases
 * back in scale. Scrolling stays native; only `position: sticky` and a `scale`
 * motion value are involved, so it never fights the browser's scroll.
 *
 * The effect switches itself off, leaving a plain list, when it would hurt:
 *   - the visitor prefers reduced motion,
 *   - the viewport doesn't match `query`,
 *   - the tallest card doesn't fit the viewport (sticky would hide its bottom).
 *
 * `top` and `step` accept a number or `{ base, lg }` for per-breakpoint values.
 * `gap` is in pixels because the scroll maths needs the exact flow spacing.
 */
export default function StackedCards({
  children,
  top = 96,
  step = 16,
  gap = 24,
  depth = 0.04,
  query = "(min-width: 1024px)",
  className,
  cardClassName,
}) {
  const items = Children.toArray(children);
  const count = items.length;

  const isLarge = useMediaQuery("(min-width: 1024px)");
  const queryMatches = useMediaQuery(query);
  const reduceMotion = useReducedMotion();
  const topPx = pick(top, isLarge);
  const stepPx = pick(step, isLarge);

  const [fits, setFits] = useState(false);
  const enabled = queryMatches && fits && !reduceMotion;

  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const layout = useRef({ heights: [], offsets: [] });
  const settings = useRef({ enabled: false, topPx, stepPx, depth });
  const scales = useMemo(() => Array.from({ length: count }, () => motionValue(1)), [count]);

  // Runs on every scroll event: one layout read, then plain arithmetic.
  const update = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const { enabled: active, topPx: base, stepPx: stride, depth: strength } = settings.current;
    if (!active) {
      for (const scale of scales) if (scale.get() !== 1) scale.set(1);
      return;
    }

    const { heights, offsets } = layout.current;
    const listTop = list.getBoundingClientRect().top;
    const covered = new Array(count).fill(0);

    // Card j slides over card j-1 while its top travels from j-1's bottom edge
    // down to its own stuck position. That progress shrinks every card beneath it.
    for (let j = 1; j < count; j++) {
      const from = base + (j - 1) * stride + heights[j - 1];
      const to = base + j * stride;
      const progress = clamp01((from - (listTop + offsets[j])) / (from - to));
      for (let i = 0; i < j; i++) covered[i] += progress;
    }

    scales.forEach((scale, i) => scale.set(1 - strength * covered[i]));
  }, [count, scales]);

  useEffect(() => {
    settings.current = { enabled, topPx, stepPx, depth };
    update();
  }, [enabled, topPx, stepPx, depth, update]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || count === 0) return;

    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    const measure = () => {
      const heights = itemRefs.current.slice(0, count).map((el) => el?.offsetHeight ?? 0);
      let offset = 0;
      const offsets = heights.map((height) => {
        const current = offset;
        offset += height + gap;
        return current;
      });
      layout.current = { heights, offsets };
      setFits(Math.max(...heights) + topPx + (count - 1) * stepPx + FIT_MARGIN <= window.innerHeight);
      update();
    };

    // Mobile browsers resize the viewport as their URL bar collapses mid-scroll;
    // only re-measure for a real change so the effect never flips while scrolling.
    const onResize = () => {
      const widthChanged = window.innerWidth !== lastWidth;
      if (!widthChanged && Math.abs(window.innerHeight - lastHeight) < 120) return;
      lastWidth = window.innerWidth;
      lastHeight = window.innerHeight;
      measure();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    for (const el of itemRefs.current) if (el) observer.observe(el);
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [count, gap, topPx, stepPx, update]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", update);

  // A covered card can still hold focusable links. If one receives keyboard
  // focus, scroll back until that card is on top so the focus ring is visible.
  const bringIntoView = (index) => {
    if (!settings.current.enabled || scales[index].get() >= 1) return;
    const { offsets } = layout.current;
    const { topPx: base, stepPx: stride } = settings.current;
    const target = window.scrollY + listRef.current.getBoundingClientRect().top + offsets[index] - (base + index * stride);
    window.scrollTo({ top: target, behavior: "instant" });
  };

  return (
    <ul ref={listRef} className={cn("flex flex-col", className)} style={{ gap }}>
      {items.map((child, index) => (
        <m.li
          key={child.key}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.55, ease: EASE }}
          onFocus={() => bringIntoView(index)}
          className={cn(
            "rounded-card",
            enabled && "sticky shadow-[0_-10px_24px_-14px_rgb(14_26_18/0.22)] will-change-transform dark:shadow-[0_-10px_24px_-14px_rgb(0_0_0/0.7)]",
            cardClassName,
          )}
          style={{
            scale: scales[index],
            transformOrigin: "50% 0%",
            ...(enabled ? { top: topPx + index * stepPx } : null),
          }}
        >
          {child}
        </m.li>
      ))}
    </ul>
  );
}
