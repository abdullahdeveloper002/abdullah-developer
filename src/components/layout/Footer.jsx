import { ArrowUp, Mail } from "lucide-react";
import { navLinks, site } from "@/data/site";
import SiteLogo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";
import CurrentYear from "./CurrentYear";

// Prefixing "/" keeps the anchors working from other routes (e.g. the 404 page).
const toHome = (hash) => `/${hash}`;

const linkClasses =
  "inline-flex items-center gap-2 py-1.5 text-paper/80 transition-colors duration-200 hover:text-lime";

function ColumnTitle({ children }) {
  return <p className="mb-4 font-mono text-xs tracking-widest text-fog uppercase">{children}</p>;
}

export default function Footer() {
  return (
    <footer className="on-dark border-t border-forest-light/60 bg-night text-paper">
      <div className="container-page grid gap-10 py-12 md:grid-cols-12 md:gap-8 md:py-16">
        <div className="md:col-span-5">
          <a href={toHome("#top")} aria-label={`${site.wordmark}, back to top`} className="inline-block rounded-control">
            <SiteLogo size="lg" />
          </a>
          <p className="mt-4 max-w-sm text-fog">
            Building fast, accessible and carefully crafted web experiences, from first idea to production.
          </p>
          <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-forest-light bg-forest/40 py-1.5 pr-4 pl-3 text-sm">
            <span aria-hidden="true" className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-lime" />
            </span>
            {site.availability}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <ColumnTitle>Navigate</ColumnTitle>
          <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-1">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={toHome(href)} className={linkClasses}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <ColumnTitle>Get in touch</ColumnTitle>
          <a href={`mailto:${site.email}`} className={`${linkClasses} break-all`}>
            <Mail aria-hidden="true" className="size-4 shrink-0 text-lime" />
            {site.email}
          </a>
          <SocialLinks className="mt-4" />
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col-reverse items-start justify-between gap-4 py-6 text-sm text-fog sm:flex-row sm:items-center">
          <p>
            &copy; <CurrentYear /> {site.name}. All rights reserved.
          </p>
          <a
            href={toHome("#top")}
            className="group inline-flex items-center gap-2 rounded-full border border-paper/20 py-2 pr-4 pl-3 text-paper transition-colors duration-200 hover:border-lime hover:text-lime"
          >
            <ArrowUp
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
            />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
