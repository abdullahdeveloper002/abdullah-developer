import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { GithubIcon } from "./BrandIcons";
import ProjectPreview from "./ProjectPreview";
import Tag from "./Tag";

/**
 * Project showcase card: screenshot on the left, story on the right (stacked on
 * small screens). Without an `image` the card falls back to a text-only layout.
 */
export default function ProjectCard({ project }) {
  const { title, summary, problem, features, stack, liveUrl, repoUrl, image } = project;
  const hasLinks = Boolean(liveUrl || repoUrl);

  return (
    <article
      className={cn(
        "group card-surface flex h-full flex-col overflow-hidden",
        "card-hover",
        image && "lg:grid lg:grid-cols-[1.05fr_1fr]",
      )}
    >
      {image ? (
        <div className="overflow-hidden">
          <div className="size-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
            <ProjectPreview image={image} />
          </div>
        </div>
      ) : null}

      <div className="card-pad flex flex-1 flex-col">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-3 text-ink-soft">{summary}</p>

        <p className="mt-6 font-mono text-xs tracking-wide text-lime-deep uppercase">The problem</p>
        <p className="mt-1.5 text-ink">{problem}</p>

        <ul className="mt-5 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="text-sm text-ink-soft">
              {feature}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
          {stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        {hasLinks ? (
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            {liveUrl ? (
              <Button href={liveUrl} variant="solid" icon={ArrowUpRight}>
                Live demo<span className="sr-only"> of {title}</span>
              </Button>
            ) : null}
            {repoUrl ? (
              <Button href={repoUrl} variant="outline">
                <GithubIcon className="size-4" />
                Code<span className="sr-only"> for {title}</span>
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
