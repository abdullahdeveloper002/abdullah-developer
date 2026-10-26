import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { socialIcons } from "./BrandIcons";

/** Icon-only social links with accessible names. Styled for dark surfaces. */
export default function SocialLinks({ className }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {site.socials.map(({ label, href, icon }) => {
        const Icon = socialIcons[icon];
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className="grid size-11 place-items-center rounded-control border border-paper/20 text-paper transition-colors duration-200 hover:border-lime hover:text-lime"
            >
              <Icon className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
