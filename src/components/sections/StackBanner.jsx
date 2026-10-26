import BrandLogo from "@/components/ui/BrandLogo";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

// `logo` is a key of `brandLogos` (src/data/brandLogos.js). The first four are the tools named in the copy.
const tools = [
  { logo: "nextdotjs", name: "Next.js" },
  { logo: "react", name: "React" },
  { logo: "tailwindcss", name: "Tailwind" },
  { logo: "framer", name: "Framer Motion" },
  { logo: "javascript", name: "JavaScript" },
  { logo: "nodedotjs", name: "Node.js" },
  { logo: "vercel", name: "Vercel" },
  { logo: "github", name: "GitHub" },
  { logo: "figma", name: "Figma" },
];

// `delay` (seconds, negative) offsets each tile's float so they drift out of step with one another.
function Tile({ logo, name, className, delay = 0 }) {
  return (
    <div
      style={{ animationDelay: `${delay}s` }}
      className={cn(
        "flex animate-float flex-col items-center justify-center gap-2.5 rounded-2xl border border-white/80 bg-white/70 px-2 py-5 motion-reduce:animate-none",
        "shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_14px_30px_-18px_rgba(30,80,10,0.5)] backdrop-blur-sm",
        className,
      )}
    >
      <BrandLogo name={logo} className="size-12" />
      <span className="font-mono text-[0.6875rem] font-medium tracking-wide text-ink-soft">{name}</span>
    </div>
  );
}

/**
 * Full-width band that sums up the stack behind the projects. It is not a nav
 * section, so it has no number or anchor link. Pinned to the light palette
 * (`on-lime`) so the text stays dark on the green in both themes.
 */
export default function StackBanner() {
  return (
    <section aria-labelledby="stack-title" className="on-lime relative isolate overflow-hidden bg-lime-soft text-ink">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-lime/70 via-lime-soft/40 to-lime/30" />
      {/* Soft light pooled behind the tiles so they read as floating above the band. */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-[8%] -z-10 hidden size-[34rem] -translate-y-1/2 rounded-full bg-white/50 blur-3xl lg:block"
      />

      <div className="container-page relative py-14 md:py-20 lg:min-h-[24rem]">
        <Reveal className="max-w-xl">
          <h2 id="stack-title" className="text-3xl leading-tight font-semibold sm:text-4xl md:text-[2.75rem]">
            Built with a modern, reliable stack.
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg">
            Every project here uses tools chosen for speed, accessibility and easy upkeep: React and Next.js for the
            interface, Tailwind CSS for a consistent design, and Framer Motion for smooth, purposeful motion.
          </p>
        </Reveal>

        {/* Wide screens: a staggered 3 x 3 cluster beside the text, cropped top and bottom by the band. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-8 hidden w-[25rem] lg:block">
          <div className="grid h-full grid-cols-3 content-center gap-3.5">
            {[0, 1, 2].map((column) => (
              <div
                key={column}
                className={cn("flex flex-col gap-3.5", ["-translate-y-8", "translate-y-6", "-translate-y-3"][column])}
              >
                {tools
                  .map((tool, index) => ({ tool, index }))
                  .filter(({ index }) => index % 3 === column)
                  .map(({ tool, index }) => (
                    <Tile key={tool.logo} {...tool} delay={-index * 0.7} />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Small screens: three tools (five from tablet width) in an even row under the text. */}
        <div aria-hidden="true" className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:hidden">
          {tools.slice(0, 5).map((tool, index) => (
            <Tile key={tool.logo} {...tool} delay={-index * 0.7} className={index > 2 ? "hidden sm:flex" : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
