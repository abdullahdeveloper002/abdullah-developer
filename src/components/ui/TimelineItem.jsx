import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/**
 * One stop on the career timeline. On wide screens it is three columns: when and
 * where on the left, the rail with its status node in the middle, the role card on
 * the right. On small screens the rail moves to the left edge and everything stacks.
 *
 * A period containing "Present" marks the current role: a lime, pulsing node and
 * the dark featured card, so the eye lands on it first.
 *
 * The rail line is drawn per item (not by the parent) so it can start at the first
 * node and stop at the last. Its x position must match the node's: both use
 * `left-2` on mobile and `md:left-[calc(11rem+1.25rem)]` from md up (date column
 * width + half the rail column).
 */
export default function TimelineItem({ title, organization, period, summary, highlights = [], tags = [], delay = 0 }) {
  const current = /present/i.test(period);

  return (
    <Reveal
      as="li"
      delay={delay}
      className={cn(
        "relative grid gap-4 pb-8 pl-8 last:pb-0 md:grid-cols-[11rem_2.5rem_1fr] md:gap-0 md:pl-0",
        // The rail: a hairline running the full height of each item (so neighbours join up),
        // starting at the node for the first item and ending at the last node.
        "before:absolute before:top-0 before:bottom-0 before:left-2 before:w-px before:-translate-x-1/2 before:bg-ink/15 before:content-['']",
        "first:before:top-6 md:first:before:top-8",
        "md:before:left-[calc(11rem+1.25rem)]",
        "last:before:bottom-auto last:before:h-6 md:last:before:h-8",
      )}
    >
      {/* Status node on the rail. */}
      <span
        aria-hidden="true"
        className="absolute top-6 left-2 z-10 grid size-4 -translate-x-1/2 place-items-center md:left-[calc(11rem+1.25rem)] md:top-8"
      >
        {current ? (
          <>
            <span className="absolute inset-0 rounded-full bg-lime/60 motion-safe:animate-ping" />
            <span className="relative size-4 rounded-full border-[3px] border-mist bg-lime ring-2 ring-lime" />
          </>
        ) : (
          <span className="size-4 rounded-full border-[3px] border-mist bg-ink-soft/60" />
        )}
      </span>

      <div className="md:pt-7 md:pr-4 md:text-right">
        <p className="font-display text-lg leading-snug font-semibold">{period}</p>
        <p className="mt-1 text-sm text-ink-soft">{organization}</p>
      </div>

      <div className="hidden md:block" aria-hidden="true" />

      <article
        className={cn(
          "card-pad card-hover relative rounded-card",
          current ? "on-dark border border-forest-light/60 bg-night text-paper" : "border border-line bg-surface",
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="min-w-0 text-xl leading-snug font-semibold sm:text-2xl">{title}</h3>
          {current ? (
            <span className="on-lime flex shrink-0 items-center gap-2 rounded-full bg-lime px-3 py-1 font-mono text-xs font-medium text-ink">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-ink" />
              Current
            </span>
          ) : null}
        </div>

        {summary ? <p className={cn("mt-3", current ? "text-fog" : "text-ink-soft")}>{summary}</p> : null}

        {highlights.length > 0 ? (
          <ul className="mt-5 space-y-2.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                    current ? "bg-lime/15 text-lime" : "bg-lime-soft text-lime-deep",
                  )}
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className={current ? "text-paper/90" : undefined}>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {tags.length > 0 ? (
          <ul aria-label="Tools and skills" className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className={cn(
                  "rounded-md px-2.5 py-1 font-mono text-xs leading-none font-medium",
                  current ? "bg-white/10 text-paper/90" : "bg-mist text-ink-soft",
                )}
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </Reveal>
  );
}
