// Copies the brand logos listed below out of `simple-icons` (a dev dependency)
// into src/data/brandLogos.js, so the site ships only the paths it renders.
// To add a logo: add its slug here and run `npm run logos`.
import { writeFileSync } from "node:fs";
import * as simpleIcons from "simple-icons";

const slugs = [
  "html5", "css", "javascript", "react", "nextdotjs", "tailwindcss", "framer", "vite", "lucide",
  "nodedotjs", "express", "python", "php", "graphql", "prisma",
  "postgresql", "mongodb", "mysql", "sqlite", "redis", "supabase", "firebase",
  "git", "github", "githubactions", "docker", "vercel", "postman", "figma", "npm",
];

/**
 * Tight bounding box [x, y, width, height] of an SVG path. Curves and arcs are
 * sampled, which is accurate to well under 0.01 of a 24-unit icon. The site uses
 * it to size every mark by its real shape instead of its (uneven) padding.
 */
function pathBox(d) {
  const number = /[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/y;
  let i = 0;
  const skip = () => { while (i < d.length && /[\s,]/.test(d[i])) i++; };
  const num = () => {
    skip();
    number.lastIndex = i;
    const m = number.exec(d);
    if (!m) throw new Error(`Bad path near "${d.slice(i, i + 12)}"`);
    i = number.lastIndex;
    return parseFloat(m[0]);
  };
  const flag = () => { skip(); return d[i++] === "1" ? 1 : 0; }; // arc flags may be packed: "011"

  const xs = [], ys = [];
  const add = (x, y) => { xs.push(x); ys.push(y); };
  const cubic = (p0, p1, p2, p3) => {
    for (let t = 1 / 32; t <= 1; t += 1 / 32) {
      const u = 1 - t;
      add(
        u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0],
        u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1],
      );
    }
  };
  const quad = (p0, p1, p2) => cubic(p0, [p0[0] + (2 / 3) * (p1[0] - p0[0]), p0[1] + (2 / 3) * (p1[1] - p0[1])],
    [p2[0] + (2 / 3) * (p1[0] - p2[0]), p2[1] + (2 / 3) * (p1[1] - p2[1])], p2);
  const arc = (x1, y1, rx, ry, phiDeg, fa, fs, x2, y2) => {
    if (rx === 0 || ry === 0) return add(x2, y2);
    rx = Math.abs(rx); ry = Math.abs(ry);
    const phi = (phiDeg * Math.PI) / 180, cos = Math.cos(phi), sin = Math.sin(phi);
    const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
    const x1p = cos * dx + sin * dy, y1p = -sin * dx + cos * dy;
    const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
    if (lambda > 1) { rx *= Math.sqrt(lambda); ry *= Math.sqrt(lambda); }
    const num2 = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
    const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
    const k = (fa === fs ? -1 : 1) * Math.sqrt(Math.max(0, num2 / den));
    const cxp = (k * rx * y1p) / ry, cyp = (-k * ry * x1p) / rx;
    const cx = cos * cxp - sin * cyp + (x1 + x2) / 2, cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
    const angle = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
    const theta = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
    let delta = angle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
    if (!fs && delta > 0) delta -= 2 * Math.PI;
    if (fs && delta < 0) delta += 2 * Math.PI;
    for (let step = 1; step <= 48; step++) {
      const a = theta + (delta * step) / 48;
      add(cx + rx * Math.cos(a) * cos - ry * Math.sin(a) * sin, cy + rx * Math.cos(a) * sin + ry * Math.sin(a) * cos);
    }
  };

  let x = 0, y = 0, startX = 0, startY = 0, cmd = "", prevCtrl = null, prevCmd = "";
  while (true) {
    skip();
    if (i >= d.length) break;
    if (/[a-zA-Z]/.test(d[i])) cmd = d[i++];
    const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
    const ox = rel ? x : 0, oy = rel ? y : 0;
    let ctrl = null;
    if (C === "Z") { x = startX; y = startY; add(x, y); }
    else if (C === "M") { x = ox + num(); y = oy + num(); startX = x; startY = y; add(x, y); cmd = rel ? "l" : "L"; }
    else if (C === "L") { x = ox + num(); y = oy + num(); add(x, y); }
    else if (C === "H") { x = ox + num(); add(x, y); }
    else if (C === "V") { y = oy + num(); add(x, y); }
    else if (C === "C") { const p1 = [ox + num(), oy + num()], p2 = [ox + num(), oy + num()], p3 = [ox + num(), oy + num()]; cubic([x, y], p1, p2, p3); ctrl = p2; [x, y] = p3; }
    else if (C === "S") { const p1 = prevCtrl && "CS".includes(prevCmd) ? [2 * x - prevCtrl[0], 2 * y - prevCtrl[1]] : [x, y]; const p2 = [ox + num(), oy + num()], p3 = [ox + num(), oy + num()]; cubic([x, y], p1, p2, p3); ctrl = p2; [x, y] = p3; }
    else if (C === "Q") { const p1 = [ox + num(), oy + num()], p2 = [ox + num(), oy + num()]; quad([x, y], p1, p2); ctrl = p1; [x, y] = p2; }
    else if (C === "T") { const p1 = prevCtrl && "QT".includes(prevCmd) ? [2 * x - prevCtrl[0], 2 * y - prevCtrl[1]] : [x, y]; const p2 = [ox + num(), oy + num()]; quad([x, y], p1, p2); ctrl = p1; [x, y] = p2; }
    else if (C === "A") { const rx = num(), ry = num(), rot = num(), fa = flag(), fs = flag(); const nx = ox + num(), ny = oy + num(); arc(x, y, rx, ry, rot, fa, fs, nx, ny); x = nx; y = ny; }
    else throw new Error(`Unsupported path command "${cmd}"`);
    prevCtrl = ctrl; prevCmd = C;
  }

  const r = (value) => Math.round(value * 1000) / 1000;
  const minX = Math.min(...xs), minY = Math.min(...ys);
  return [r(minX), r(minY), r(Math.max(...xs) - minX), r(Math.max(...ys) - minY)];
}

const bySlug = Object.fromEntries(
  Object.values(simpleIcons).filter((icon) => icon?.slug).map((icon) => [icon.slug, icon]),
);

const logos = Object.fromEntries(
  slugs.map((slug) => {
    const icon = bySlug[slug];
    if (!icon) throw new Error(`No simple-icons logo for "${slug}"`);
    return [slug, { path: icon.path, color: `#${icon.hex}`, box: pathBox(icon.path) }];
  }),
);

const source = `// Generated by scripts/generate-brand-logos.mjs. Do not edit by hand.
// Logo paths come from simple-icons (CC0); brand names and marks belong to their owners.
export const brandLogos = ${JSON.stringify(logos, null, 2)};
`;

writeFileSync(new URL("../src/data/brandLogos.js", import.meta.url), source);
console.log(`Wrote ${slugs.length} logos`);
