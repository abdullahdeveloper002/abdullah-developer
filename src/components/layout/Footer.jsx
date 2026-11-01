import { Mail } from "lucide-react";
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
      <div className="container-page grid gap-8 py-10 md:grid-cols-12 md:gap-8 md:py-12">
        <div className="md:col-span-5">
          <a href={toHome("#top")} aria-label={`${site.wordmark}, back to top`} className="inline-block rounded-control">
            <SiteLogo size="lg" />
          </a>
          <p className="mt-3 max-w-sm text-fog">
            Building fast, accessible and carefully crafted web experiences, from first idea to production.
          </p>
          <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-forest-light bg-forest/40 py-1.5 pr-4 pl-3 text-sm">
            <span aria-hidden="true" className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-lime" />
            </span>
            {site.availability}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <ColumnTitle>Navigate</ColumnTitle>
          <ul className="flex flex-col">
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
        <p className="container-page py-6 text-sm text-fog">
          &copy; <CurrentYear /> {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
