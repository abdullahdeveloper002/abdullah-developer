import { ArrowRight, Quote } from "lucide-react";
import { aboutParagraphs, principles, processSteps } from "@/data/about";
import { site } from "@/data/site";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/** Understand → Build → Refine: the method as three connected steps, so the card shows the process, not just states it. */
function ProcessSteps() {
  return (
    <ol aria-label="My process" className="relative grid gap-3 md:grid-cols-3 md:gap-6">
      {processSteps.map(({ title, text }, index) => (
        <li
          key={title}
          className="group relative rounded-control border border-line bg-mist/60 p-5 transition-colors duration-300 hover:border-lime-deep/40 hover:bg-lime-soft/50"
        >
          {/* Badge and title share one row and one centre line; the description then gets the full card width. */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-lime-soft font-mono text-sm leading-none font-semibold text-lime-deep transition-colors duration-300 group-hover:bg-lime group-hover:text-night"
            >
              {index + 1}
            </span>
            <p className="text-lg leading-none font-semibold">{title}</p>
          </div>
          <p className="mt-3 text-sm text-ink-soft sm:text-[0.95rem]">{text}</p>
        </li>
      ))}
    </ol>
  );
}

function PrincipleCard({ icon: Icon, title, text, index }) {
  return (
    <article className="card-surface card-hover group relative flex h-full gap-4 overflow-hidden p-5 sm:flex-col sm:gap-0 sm:p-5">
      {/* Icon and index share one row, so the number sits on the icon's centre line and is never clipped. */}
      <div className="flex shrink-0 items-start justify-between sm:items-center">
        <span className="grid size-12 place-items-center rounded-control bg-lime-soft text-lime-deep transition-colors duration-300 group-hover:bg-lime group-hover:text-night">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span
          aria-hidden="true"
          className="hidden font-display text-4xl leading-none font-semibold text-ink-soft/70 tabular-nums sm:block transition-colors duration-500 group-hover:text-lime-deep"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-semibold sm:mt-5">{title}</h3>
        <p className="mt-1.5 text-[0.95rem] text-ink-soft sm:mt-2">{text}</p>
      </div>

      {/* Accent underline draws in from the left on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none"
      />
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
        description="A developer who cares as much about how a product feels as how it's built."
      />

      {/* One full-width story card (voice, method, next step), then the working principles in an even row. */}
      <Reveal>
        <article className="card-surface relative overflow-hidden p-5 sm:p-7 lg:p-10">
          {/* Soft lime wash in the corner and a quote mark anchor the lead statement as the section's voice. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-lime/20 blur-3xl"
          />
          <Quote
            aria-hidden="true"
            className="pointer-events-none absolute top-6 right-6 size-20 -rotate-6 fill-lime-soft text-lime-soft sm:size-24 lg:top-10 lg:right-12 lg:size-28"
          />

          <p className="relative font-mono text-xs tracking-widest text-lime-deep uppercase">My approach</p>
          <p className="relative mt-5 max-w-4xl font-display text-2xl leading-snug font-medium text-balance sm:text-3xl lg:text-[2.5rem] lg:leading-[1.2]">
            {lead}
          </p>

          <div className="relative mt-6 max-w-3xl space-y-4 border-t border-line pt-6">
            {rest.map((paragraph) => (
              <p key={paragraph} className="text-ink-soft sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative mt-8">
            <ProcessSteps />
          </div>

          <div className="relative mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-paper py-1.5 pr-4 pl-3 text-sm font-medium text-ink-soft">
              <span className="relative flex size-2.5" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2.5 rounded-full bg-lime-deep" />
              </span>
              {site.availability}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="#contact" icon={ArrowRight} className="w-full sm:w-auto">
                Work with me
              </Button>
              <Button href="#projects" variant="outline" className="w-full sm:w-auto">
                See my projects
              </Button>
            </div>
          </div>
        </article>
      </Reveal>

      <Reveal className="mt-10 mb-4 md:mt-12">
        <h3 className="font-mono text-xs tracking-widest text-lime-deep uppercase">How I work</h3>
      </Reveal>

      <ul aria-label="How I work" className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {principles.map((principle, index) => (
          <Reveal as="li" key={principle.title} delay={index * 0.06}>
            <PrincipleCard index={index} {...principle} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
