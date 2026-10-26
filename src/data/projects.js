/**
 * Featured projects, shown in this order.
 *
 * NOTE: these three entries and their images in /public/projects are SAMPLE
 * projects (the images are dummy stock photos, not real products). Replace
 * each one with real work before launch:
 *  - overwrite the image in /public/projects (or point `image.src` at a new file)
 *    and update `image.alt` to describe the screenshot
 *  - set `liveUrl` / `repoUrl` (leave null if not available): buttons only show
 *    for links that exist
 *  - rewrite the title, summary, problem and features in your own words
 *
 * Images fill the whole preview area edge to edge and are cropped around the
 * centre, so use roughly 1600 x 1000 (16:10) and keep the key content central.
 */
export const projects = [
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    summary:
      "A fast, readable dashboard that turns raw numbers into charts a whole team can understand at a glance.",
    problem:
      "Data tends to live in spreadsheets and exports, which makes simple questions slow to answer.",
    features: [
      "Key metrics, trends and top channels on one clear screen",
      "Responsive layout that works from phone to widescreen",
      "Accessible color contrast and keyboard-friendly tables",
    ],
    stack: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: null,
    repoUrl: null,
    image: {
      src: "/projects/dashboard-photo.webp",
      alt: "Placeholder photo for the Analytics Dashboard project.",
    },
  },
  {
    slug: "business-landing-page",
    title: "Business Landing Page",
    summary:
      "A fast, friendly marketing site with clear messaging and one obvious next step for every visitor.",
    problem:
      "Visitors leave when a page is slow or it isn't clear what to do next, so enquiries get lost.",
    features: [
      "Optimized images and fonts for a quick first load",
      "Focused sections with clear calls to action",
      "Contact form with validation and helpful feedback",
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: null,
    repoUrl: null,
    image: {
      src: "/projects/landing-photo.webp",
      alt: "Placeholder photo for the Business Landing Page project.",
    },
  },
  {
    slug: "task-board",
    title: "Task Board",
    summary:
      "A calm, focused board for planning the week: quick to add tasks, easy to scan, and out of your way.",
    problem:
      "Most task apps try to do everything, which makes simply planning a week feel heavier than it should.",
    features: [
      "To do, doing and done columns with a clear progress bar",
      "Quick add with a keyboard shortcut",
      "Tasks are saved in the browser so nothing is lost on refresh",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS"],
    liveUrl: null,
    repoUrl: null,
    image: {
      src: "/projects/tasks-photo.webp",
      alt: "Placeholder photo for the Task Board project.",
    },
  },
];
