import { ArrowRight, Code2, Layers, Route } from "lucide-react";
import { aboutParagraphs, principles } from "@/data/about";
import { site } from "@/data/site";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

// The fact sheet. `live` swaps the icon for a pulsing dot so availability reads as a real-time signal.
const glance = [
  { icon: Code2, label: "Role", value: site.role },
  { icon: Layers, label: "Focus", value: "Fast, accessible web apps" },
  { icon: Route, label: "Approach", value: "Understand, build, refine" },
  { label: "Status", value: site.availability, live: true },
];

function PrincipleCard({ icon: Icon, title, text, index }) {
  return (
    <article className="card-surface card-hover flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-control bg-lime-soft text-lime-deep">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span aria-hidden="true" className="font-mono text-sm text-ink-soft">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-[0.95rem] text-ink-soft">{text}</p>
    </article>
  );
}

export default function About() {
  const [lead, ...rest] = aboutParagraphs;

  return (
    <Section id="about">
      <SectionHeading
        id="about"
        index="01"
        eyebrow="About"
        title="I like turning messy problems into simple, solid software."
      />

      {/* Bento layout: a story card beside a fact sheet, then the working principles in one even row. */}
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
        <Reveal className="flex lg:col-span-7">
          <article className="card-surface flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
            <p className="font-mono text-xs tracking-widest text-lime-deep uppercase">My approach</p>
            <p className="mt-4 font-display text-xl leading-snug font-medium text-balance sm:text-2xl lg:text-[1.65rem]">
              {lead}
            </p>

            <div className="mt-6 space-y-4 border-t border-line pt-6">
              {rest.map((paragraph) => (
                <p key={paragraph} className="text-ink-soft sm:text-[1.05rem]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <Button href="#contact" icon={ArrowRight}>
                Work with me
              </Button>
              <Button href="#projects" variant="outline">
                See my projects
              </Button>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08} className="flex lg:col-span-5">
          <article className="on-dark relative isolate flex flex-1 flex-col overflow-hidden rounded-card bg-forest p-6 text-paper sm:p-8 lg:p-10">
            {/* Soft lime glow in the corner lifts the flat green into something with depth. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-lime/20 blur-3xl"
            />
            <p className="font-mono text-xs tracking-widest text-fog uppercase">At a glance</p>

            <dl className="mt-6 flex flex-1 flex-col divide-y divide-white/10">
              {glance.map(({ icon: Icon, label, value, live }) => (
                <div key={label} className="flex flex-1 items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-control bg-white/10 text-lime"
                  >
                    {live ? (
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70 motion-reduce:animate-none" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-lime" />
                      </span>
                    ) : (
                      <Icon className="size-5" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <dt className="font-mono text-xs tracking-wide text-fog uppercase">{label}</dt>
                    <dd className="mt-0.5 text-lg font-medium">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      </div>

      <ul aria-label="How I work" className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4 lg:gap-6">
        {principles.map((principle, index) => (
          <Reveal as="li" key={principle.title} delay={index * 0.06}>
            <PrincipleCard index={index} {...principle} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
