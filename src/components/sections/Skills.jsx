import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillTabs from "@/components/ui/SkillTabs";

export default function Skills() {
  return (
    <Section id="skills" tone="mist">
      <SectionHeading
        id="skills"
        index="02"
        eyebrow="Skills & technologies"
        title="The toolkit behind the work."
        description="A focused set of tools I use to design, build and ship, grouped by what they're for."
      />

      <SkillTabs />
    </Section>
  );
}
