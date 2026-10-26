/**
 * Global site content. Anything marked REPLACE is a placeholder and should be
 * swapped for Abu's real details before launch.
 */
export const site = {
  name: "Abu",
  wordmark: "Abdullah",
  role: "Developer",
  title: "Abu | Developer",
  description:
    "Abu is a developer who builds fast, accessible and carefully crafted web experiences, from first idea to production.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // REPLACE: shown in the hero chip and used on the contact section.
  availability: "Available for new projects",
  email: "mabdullah13954@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/your-username", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-username", icon: "linkedin" },
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
