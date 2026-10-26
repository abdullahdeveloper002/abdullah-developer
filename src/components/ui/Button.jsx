import { cn, isExternal } from "@/lib/utils";

const base =
  "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-control font-medium whitespace-nowrap " +
  "transition-[border-color,color,transform] duration-300 active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-60";

/**
 * Each variant has a resting look and a `water` colour that rises through the
 * button on hover, with the label switching to `hoverText` as the fill passes it.
 */
const variants = {
  // Lime on a light or dark surface: the main call to action.
  accent: {
    base: "on-lime bg-lime text-ink border border-ink/10",
    water: "bg-night",
    hoverText: "hover:text-lime",
  },
  // Ink on light surfaces.
  solid: {
    base: "bg-ink text-paper border border-ink",
    water: "bg-lime",
    hoverText: "hover:text-night",
  },
  outline: {
    base: "border border-ink/25 text-ink hover:border-ink",
    water: "bg-ink",
    hoverText: "hover:text-paper",
  },
  // Outline for dark surfaces.
  "outline-light": {
    base: "border border-paper/30 text-paper hover:border-lime",
    water: "bg-lime",
    hoverText: "hover:text-night",
  },
};

const sizes = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
};

/**
 * The water: a wide, rounded blob parked just below the button. On hover it rises
 * to cover the button while slowly rotating, so its top edge ripples like a surface.
 * It rests fully out of sight, and reduced-motion visitors get the fill without the ripple.
 */
function Water({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-[calc(100%+1.5rem)] left-1/2 -z-10 aspect-square w-[260%] -translate-x-1/2 rounded-[42%] opacity-95",
        "transition-[top] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150",
        "group-hover:top-[-3.25rem] group-hover:animate-[spin_5s_linear_infinite] motion-reduce:group-hover:animate-none",
        className,
      )}
    />
  );
}

/**
 * Renders an <a> when `href` is given (external links open safely in a new tab),
 * otherwise a <button>. `icon` is a Lucide component placed after the label.
 */
export default function Button({
  href,
  variant = "accent",
  size = "md",
  icon: Icon,
  className,
  children,
  ...props
}) {
  const v = variants[variant];
  const classes = cn(base, v.base, v.hoverText, sizes[size], className);
  const content = (
    <>
      <Water className={v.water} />
      <span className="inline-flex items-center gap-2">
        {children}
        {Icon ? <Icon aria-hidden="true" className="size-4" /> : null}
      </span>
    </>
  );

  if (href) {
    const external = isExternal(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
