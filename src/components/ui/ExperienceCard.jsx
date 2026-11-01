import { Briefcase, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/**
 * One stop on the career path: a node with the period above a card that fills the column height,
 * so cards in the same row line up whatever their content.
 *
 * A period containing "Present" marks the current role: a lime, pulsing node and the dark
 * featured card, so the eye lands on it first.
 */
export default function ExperienceCard({
  title,
  organization,
  period,
  summary,
  highlights = [],
  tags = [],
  delay = 0,
}) {
  const current = /present/i.test(period);
  const muted = current ? "text-fog" : "text-ink-soft";

  return (
    <Reveal as="li" delay={delay} className="flex flex-col">
      {/* The path: node, period, and a line on to the next stop. */}
      <div className="mb-4 flex items-center gap-3">
        <span aria-hidden="true" className="relative grid size-4 shrink-0 place-items-center">
          {current ? (
            <>
              <span className="absolute inset-0 rounded-full bg-lime/60 motion-safe:animate-ping" />
              <span className="relative size-4 rounded-full border-[3px] border-mist bg-lime ring-2 ring-lime" />
            </>
          ) : (
            <span className="size-4 rounded-full border-[3px] border-mist bg-ink-soft/60" />
          )}
        </span>
        <p className={cn("font-mono text-sm font-medium tracking-wide", current ? "text-lime-deep" : "text-ink-soft")}>
          {period}
        </p>
      </div>

      <article
        className={cn(
          "card-pad card-hover relative flex flex-1 flex-col overflow-hidden rounded-card",
          current ? "on-dark border border-forest-light/60 bg-night text-paper" : "border border-line bg-surface",
        )}
      >
        {current ? (
          <>
            {/* A soft glow marks the featured role without adding noise. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-lime/15 blur-3xl"
            />
          </>
        ) : null}

        <div className="relative flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className={cn(
              "grid size-12 shrink-0 place-items-center rounded-control",
              current ? "bg-lime/15 text-lime" : "bg-lime-soft text-lime-deep",
            )}
          >
            <Briefcase className="size-5" />
          </span>
          {current ? (
            <span className="on-lime flex items-center gap-2 rounded-full bg-lime px-2.5 py-1 font-mono text-xs leading-none font-medium text-ink">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-ink" />
              Current
            </span>
          ) : null}
        </div>

        <h3 className="relative mt-5 text-xl leading-snug font-semibold sm:text-2xl">{title}</h3>
        <p className={cn("relative mt-1.5 text-sm font-medium", muted)}>{organization}</p>

        {summary ? <p className={cn("relative mt-4", muted)}>{summary}</p> : null}

        {highlights.length > 0 ? (
          <ul className="relative mt-5 space-y-2">
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

        {/* Tools sit at the bottom of every card, so the footers line up across a row. */}
        {tags.length > 0 ? (
          <div className="relative mt-auto pt-5">
            <ul
              aria-label="Tools and skills"
              className={cn("flex flex-wrap gap-2 border-t pt-4", current ? "border-white/10" : "border-line")}
            >
              {tags.map((tag) => (
                <li
                  key={tag}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 font-mono text-xs leading-none font-medium",
                    current ? "bg-white/10 text-paper/90" : "bg-mist text-ink-soft",
                  )}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </Reveal>
  );
}
