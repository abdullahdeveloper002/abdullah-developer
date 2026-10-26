import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// The same mark is used for the favicon (src/app/icon.svg) and the share image
// (src/app/opengraph-image.js); keep the three in sync if the shape changes.
// A solid, geometric "A": outer silhouette plus a triangular counter, filled with the even-odd rule.
const MARK_PATH = "M32 11 54 53H43.5L39.2 43.5H24.8L20.5 53H10ZM32 26.5 35.8 35H28.2Z";

/** The monogram alone: a lime "A" on a forest-green rounded square. Decorative. */
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <rect width="64" height="64" rx="16" fill="#273f2b" />
      <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" fill="none" stroke="#ffffff" strokeOpacity="0.1" />
      <path d={MARK_PATH} fill="#87e64b" fillRule="evenodd" stroke="#87e64b" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Monogram + wordmark lockup. Text inherits the surrounding colour, so it works on
 * light and dark surfaces. `size` sets the mark; the wordmark scales with it.
 */
export default function Logo({ size = "md", tagline = true, className }) {
  const large = size === "lg";
  return (
    <span className={cn("group inline-flex items-center", large ? "gap-3.5" : "gap-3", className)}>
      <LogoMark
        className={cn(
          "shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none",
          large ? "size-12" : "size-10",
        )}
      />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display font-semibold tracking-tight", large ? "text-2xl" : "text-xl")}>
          {site.wordmark}
        </span>
        {tagline ? (
          <span className="mt-1.5 font-mono text-[0.625rem] tracking-[0.22em] uppercase opacity-60">{site.role}</span>
        ) : null}
      </span>
    </span>
  );
}
