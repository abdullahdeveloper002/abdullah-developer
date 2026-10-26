import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StackedCards from "@/components/ui/StackedCards";

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        index="03"
        eyebrow="Featured projects"
        title="Selected work, and the problems behind it."
        description="Each project starts with a real need. Here's what I built, why, and how it works."
      />

      {/* Wide screens only: on phones each card is taller than the screen, so they simply stack in the page. */}
      <StackedCards top={96} step={16} gap={24} depth={0.04} query="(min-width: 1024px)">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </StackedCards>
    </Section>
  );
}
