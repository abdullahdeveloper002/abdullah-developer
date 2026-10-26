import { cn } from "@/lib/utils";

const tones = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  night: "on-dark bg-night text-paper",
  forest: "on-dark bg-forest text-paper",
};

/** Page section wrapper: consistent rhythm, anchor offset and landmark labelling. */
export default function Section({ id, tone = "paper", className, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("section-y scroll-mt-20", tones[tone], className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
