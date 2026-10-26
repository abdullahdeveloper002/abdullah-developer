import { Award, BadgeCheck, GraduationCap } from "lucide-react";
import { achievements, education, experience } from "@/data/experience";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import TimelineItem from "@/components/ui/TimelineItem";

// Label and icon for each `kind` of entry in src/data/experience.js.
const kinds = {
  education: { label: "Education", icon: GraduationCap },
  certification: { label: "Certification", icon: BadgeCheck },
  achievement: { label: "Achievement", icon: Award },
};

const milestones = [...education, ...achievements];

function MilestoneCard({ kind, title, organization, period }) {
  const { label, icon: Icon } = kinds[kind] ?? kinds.achievement;
  const highlight = kind === "achievement";

  return (
    <article
      className={cn(
        "card-pad card-hover flex h-full flex-col rounded-card",
        highlight ? "on-lime border border-ink/10 bg-lime text-ink" : "border border-line bg-surface",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "grid size-11 place-items-center rounded-control",
            highlight ? "bg-ink text-lime" : "bg-lime-soft text-lime-deep",
          )}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>
        {period ? (
          <span
            className={cn(
              "rounded-full px-3 py-1 font-mono text-xs font-medium",
              highlight ? "bg-ink/10 text-ink" : "bg-mist text-ink-soft",
            )}
          >
            {period}
          </span>
        ) : null}
      </div>

      <p className={cn("mt-6 font-mono text-xs tracking-widest uppercase", highlight ? "text-ink/70" : "text-ink-soft")}>
        {label}
      </p>
      <h3 className="mt-2 text-lg leading-snug font-semibold">{title}</h3>
      <p className={cn("mt-auto pt-3 text-sm", highlight ? "text-ink/70" : "text-ink-soft")}>{organization}</p>
    </article>
  );
}

export default function Experience() {
  return (
    <Section id="experience" tone="mist">
      <SectionHeading
        id="experience"
        index="04"
        eyebrow="Experience & achievements"
        title="Where I've worked, and what I've learned along the way."
        description="The roles, learning and wins that shaped how I build."
      />

      {/* Career timeline: dates on the left, rail in the middle, role cards on the right. */}
      <ol aria-label="Work history, newest first">
        {experience.map((entry, index) => (
          <TimelineItem key={entry.id} delay={index * 0.08} {...entry} />
        ))}
      </ol>

      <Reveal className="mt-16 mb-6">
        <h3 className="text-2xl font-semibold sm:text-3xl">Learning &amp; recognition</h3>
        <p className="mt-2 text-ink-soft">Education, certifications and achievements beyond the day job.</p>
      </Reveal>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {milestones.map((entry, index) => (
          <Reveal as="li" key={entry.id} delay={index * 0.06}>
            <MilestoneCard {...entry} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
