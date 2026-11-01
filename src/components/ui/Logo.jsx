import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// The browser-tab icon (src/app/icon.svg) is a separate glyph: a wordmark can't be read at 16px.
// The share image (src/app/opengraph-image.js) repeats this wordmark; keep the two in step.

/**
 * Wordmark: the name in the display face with a lime full stop. Text inherits the surrounding colour,
 * so it works on light and dark surfaces. `size` sets the name; the stop scales with it.
 */
export default function Logo({ size = "md", className }) {
  const large = size === "lg";
  return (
    <span className={cn("group inline-flex items-center leading-none", className)}>
      <span className={cn("font-display font-semibold tracking-tight", large ? "text-3xl" : "text-2xl")}>
        {site.wordmark}
        {/* The full stop is a lime dot (a shape, not a glyph) so it keeps its colour on any surface. */}
        <span
          aria-hidden="true"
          className={cn(
            "ml-[0.12em] inline-block rounded-full bg-lime ring-1 ring-ink/10 transition-transform duration-300",
            "group-hover:scale-125 motion-reduce:transition-none motion-reduce:group-hover:transform-none",
            large ? "size-2" : "size-1.5",
          )}
        />
      </span>
    </span>
  );
}
