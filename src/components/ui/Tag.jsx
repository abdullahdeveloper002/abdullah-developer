import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-mist text-ink-soft",
  lime: "bg-lime-soft text-lime-deep",
  azure: "bg-azure-soft text-azure-deep",
};

/** Small mono label used for tech stacks and status markers. */
export default function Tag({ tone = "neutral", className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs leading-none font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
