import { cn } from "@/lib/utils";

/** Editor-style window chrome shared by the hero and about code cards. */
export default function CodeWindow({ filename, className, children }) {
  return (
    <div
      className={cn(
        "on-dark overflow-hidden rounded-card border border-forest-light bg-night text-paper",
        className,
      )}
    >
      <div className="flex items-center gap-4 border-b border-forest-light bg-forest/60 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-paper/20" />
          <span className="size-3 rounded-full bg-paper/20" />
          <span className="size-3 rounded-full bg-lime" />
        </div>
        <span className="font-mono text-xs text-fog">{filename}</span>
      </div>
      {children}
    </div>
  );
}

/** Syntax token colors, kept in one place so snippets stay consistent. */
export const token = {
  keyword: "text-lime",
  string: "text-azure-light",
  plain: "text-paper",
  punct: "text-fog",
  comment: "text-fog italic",
};
