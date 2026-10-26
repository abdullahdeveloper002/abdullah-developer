/**
 * Experience, education and achievements. Every entry is sample content:
 * replace with real details or delete it. Nothing here is a claim about Abu.
 *
 * `kind` on education and achievement entries picks the label and icon on its
 * card: "education", "certification" or "achievement".
 */
export const experience = [
  {
    id: "role-1",
    title: "Your Most Recent Role",
    organization: "Company or Client Name",
    period: "Start year – Present",
    summary: "One or two sentences on what you owned and the outcome it had.",
    highlights: ["Add a concrete contribution", "Add a measurable result, if you have one"],
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "role-2",
    title: "Previous Role",
    organization: "Company, Agency or Freelance",
    period: "Start year – End year",
    summary: "Briefly describe the scope of the work and what you learned.",
    highlights: ["Add a project or responsibility worth mentioning"],
    tags: ["JavaScript", "Node.js"],
  },
];

export const education = [
  {
    id: "edu-1",
    kind: "education",
    title: "Degree, Bootcamp or Self-Study Program",
    organization: "Institution",
    period: "Year",
  },
  {
    id: "cert-1",
    kind: "certification",
    title: "Certification Name",
    organization: "Issuing body",
    period: "Year",
  },
];

export const achievements = [
  {
    id: "ach-1",
    kind: "achievement",
    title: "Add an award, talk, hackathon or open-source contribution",
    organization: "Where or when",
  },
];
