import { experience } from "@/data/experience";
import ExperienceCard from "@/components/ui/ExperienceCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  return (
    <Section id="experience" tone="mist">
      <SectionHeading
        id="experience"
        index="04"
        eyebrow="Experience"
        title="Where I've worked, and what I've learned along the way."
        description="The roles that shaped how I build."
      />

      {/* A career path: a node per role, a full-height card under each. Newest first. */}
      <ol
        aria-label="Work history, newest first"
        className={experience.length > 2 ? "grid gap-x-6 gap-y-8 lg:grid-cols-3" : "grid gap-x-6 gap-y-8 lg:grid-cols-2"}
      >
        {experience.map((entry, index) => (
          <ExperienceCard key={entry.id} delay={index * 0.08} {...entry} />
        ))}
      </ol>
    </Section>
  );
}
