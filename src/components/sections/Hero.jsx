import { Accessibility, Code2, Mail, Zap } from "lucide-react";
import { site } from "@/data/site";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const strengths = [
  { icon: Zap, label: "Fast by default" },
  { icon: Accessibility, label: "Accessible to everyone" },
  { icon: Code2, label: "Code that lasts" },
];

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[80svh] items-center pt-28 pb-10 md:pt-32 md:pb-12"
    >
      {/* Dot texture fades out at the bottom so the hero melts into the next section. */}
      <div
        aria-hidden="true"
        className="bg-dots absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]"
      />
      {/* Soft ambient glows give the flat page some depth without adding noise. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[28rem] w-[44rem] max-w-[120vw] -translate-x-1/2 animate-drift rounded-full bg-lime/25 blur-[110px] motion-reduce:animate-none dark:bg-lime/15" />
        <div className="absolute top-1/3 -right-32 size-80 animate-drift rounded-full bg-azure/10 blur-[110px] motion-reduce:animate-none" />
      </div>
      <div className="container-page flex flex-col items-center text-center">
        <Reveal immediate>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-3 text-sm font-medium text-ink-soft">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-lime-deep" />
            </span>
            {site.availability}
          </p>
        </Reveal>

        <Reveal immediate delay={0.08}>
          <h1
            id="hero-title"
            className="mt-7 max-w-5xl text-[2.5rem] leading-[1.08] font-semibold sm:text-5xl xl:text-6xl"
          >
            Hi, I&rsquo;m {site.name}. I build web <br className="hidden lg:block" />
            experiences that feel{" "}
            <span className="on-lime rounded-lg bg-lime px-2 text-ink box-decoration-clone">effortless.</span>
          </h1>
        </Reveal>

        <Reveal immediate delay={0.16}>
          <p className="mt-7 max-w-4xl text-lg text-ink-soft sm:text-xl">
            <span className="block">
              I&rsquo;m a developer who turns ideas into fast, accessible, carefully crafted software.
            </span>
            <span className="block">
              Whether you&rsquo;re shipping a product or starting with an idea, I&rsquo;ll help you get it
              live.
            </span>
          </p>
        </Reveal>

        <Reveal
          immediate
          delay={0.24}
          className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button href="#projects" size="lg">
            View My Work
          </Button>
          <Button href="#contact" size="lg" variant="outline" icon={Mail}>
            Let&rsquo;s Talk
          </Button>
        </Reveal>

        <Reveal immediate delay={0.32}>
          <ul className="mt-14 flex flex-wrap justify-center gap-3 text-sm font-medium text-ink-soft">
            {strengths.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full border border-line bg-surface/70 py-2 pr-4 pl-3 backdrop-blur-sm"
              >
                <Icon aria-hidden="true" className="size-4 text-lime-deep" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
