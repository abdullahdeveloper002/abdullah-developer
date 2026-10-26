import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLinks from "@/components/ui/SocialLinks";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <Section id="contact" tone="forest">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact"
            index="05"
            eyebrow="Contact"
            tone="dark"
            className="mb-8 md:mb-8"
            title="Have an idea worth building? Let's talk."
            description="Whether it's a new product, a rebuild, or just a question, I'd love to hear about it. Send a message and I'll get back to you."
          />

          <Reveal delay={0.1} className="space-y-8">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4 rounded-card border border-paper/15 bg-night/40 p-4 sm:p-5 transition-colors duration-200 hover:border-lime"
            >
              <span className="grid size-12 shrink-0 place-items-center on-lime rounded-control bg-lime text-ink">
                <Mail aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-fog">Email</span>
                <span className="block truncate font-medium">{site.email}</span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="ml-auto size-5 shrink-0 text-fog transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime"
              />
            </a>

            <div>
              <p className="mb-3 text-sm text-fog">Find me elsewhere</p>
              <SocialLinks />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="card-pad rounded-card bg-night-raised text-paper ring-1 ring-white/10">
            <h3 className="font-display text-[clamp(1.625rem,2.6vw,2.25rem)] leading-tight font-semibold">
              Send a message
            </h3>
            <p className="mt-2 mb-7 text-paper/60">All fields are required. I&rsquo;ll reply by email.</p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
