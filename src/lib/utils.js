/** Joins truthy class names. Keeps conditional Tailwind classes readable. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** True for links that leave the site and should open in a new tab. */
export function isExternal(href = "") {
  return /^https?:\/\//.test(href);
}
