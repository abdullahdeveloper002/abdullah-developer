/**
 * Skills shown in the "toolkit" tabs. `logo` is a key of `brandLogos`
 * (src/data/brandLogos.js); add new logos via scripts/generate-brand-logos.mjs.
 * Edit these lists so they only contain tools Abu genuinely works with.
 */
export const skillGroups = [
  {
    id: "frontend",
    title: "Front-End",
    blurb: "Interfaces that load fast and feel good to use.",
    items: [
      { name: "HTML5", logo: "html5" },
      { name: "CSS3", logo: "css" },
      { name: "JavaScript", logo: "javascript" },
      { name: "React", logo: "react" },
      { name: "Next.js", logo: "nextdotjs" },
      { name: "Tailwind CSS", logo: "tailwindcss" },
      { name: "Framer Motion", logo: "framer" },
      { name: "Vite", logo: "vite" },
      { name: "Lucide", logo: "lucide" },
    ],
  },
  {
    id: "backend",
    title: "Back-End",
    blurb: "The logic and APIs behind the interface.",
    items: [
      { name: "Node.js", logo: "nodedotjs" },
      { name: "Express", logo: "express" },
      { name: "Python", logo: "python" },
      { name: "PHP", logo: "php" },
      { name: "GraphQL", logo: "graphql" },
      { name: "Prisma", logo: "prisma" },
    ],
  },
  {
    id: "database",
    title: "Database",
    blurb: "Where data lives, and how it stays fast and safe.",
    items: [
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "MongoDB", logo: "mongodb" },
      { name: "MySQL", logo: "mysql" },
      { name: "SQLite", logo: "sqlite" },
      { name: "Redis", logo: "redis" },
      { name: "Supabase", logo: "supabase" },
      { name: "Firebase", logo: "firebase" },
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    blurb: "How work moves from idea to production.",
    items: [
      { name: "Git", logo: "git" },
      { name: "GitHub", logo: "github" },
      { name: "GitHub Actions", logo: "githubactions" },
      { name: "Docker", logo: "docker" },
      { name: "Vercel", logo: "vercel" },
      { name: "Postman", logo: "postman" },
      { name: "Figma", logo: "figma" },
      { name: "npm", logo: "npm" },
    ],
  },
];
