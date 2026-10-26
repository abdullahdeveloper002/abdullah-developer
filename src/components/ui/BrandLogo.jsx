import { brandLogos } from "@/data/brandLogos";
import { cn } from "@/lib/utils";

// Relative luminance of a #rrggbb color (0 = black, 1 = white).
function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const channel = (value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(n >> 16) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

// Every mark is sized by its real shape so they carry the same visual weight:
// roughly TARGET px of "square-root area", but never wider or taller than SLOT.
const SLOT = 48;
const TARGET = 40;

/**
 * Brand mark in its official color (near-black marks follow the text color so they
 * stay visible in dark theme). Decorative: the tile's text names the tool.
 * `className` sizes the SLOT-sized frame the mark is centred in (default size-12 = 48px).
 */
export default function BrandLogo({ name, className }) {
  const logo = brandLogos[name];
  if (!logo) return null;

  const [x, y, width, height] = logo.box;
  const scale = Math.min(TARGET / Math.sqrt(width * height), SLOT / Math.max(width, height));

  return (
    <span aria-hidden="true" className={cn("grid place-items-center", className)}>
      <svg
        viewBox={`${x} ${y} ${width} ${height}`}
        width={Math.round(width * scale * 10) / 10}
        height={Math.round(height * scale * 10) / 10}
        focusable="false"
        style={{ fill: luminance(logo.color) < 0.05 ? "var(--color-ink)" : logo.color }}
      >
        <path d={logo.path} />
      </svg>
    </span>
  );
}
