import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/** Eyebrow + h2 + optional intro. `id` must match the parent Section's id. */
export default function SectionHeading({ id, index, eyebrow, title, description, tone = "light", className }) {
  const dark = tone === "dark";

  return (
    <Reveal className={cn("mb-8 max-w-2xl md:mb-10", className)}>
      <p
        className={cn(
          "mb-4 flex items-center gap-3 font-mono text-sm",
          dark ? "text-lime" : "text-lime-deep",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
            dark ? "bg-lime/15 text-lime" : "bg-lime-soft text-lime-deep",
          )}
        >
          {index}
        </span>
        <span className="tracking-wide uppercase">{eyebrow}</span>      </p>
      <h2 id={`${id}-title`} className="text-3xl leading-tight font-semibold sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base sm:mt-5 sm:text-lg", dark ? "text-fog" : "text-ink-soft")}>{description}</p>
      ) : null}
    </Reveal>
  );
}
