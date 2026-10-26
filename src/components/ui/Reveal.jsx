"use client";

import { m } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Fade-and-rise entrance. Uses only opacity + transform, so it never shifts layout.
 * `immediate` plays on mount (hero); otherwise it plays once when scrolled into view.
 */
export default function Reveal({
  as = "div",
  delay = 0,
  y = 16,
  immediate = false,
  className,
  children,
  ...props
}) {
  const Component = m[as];
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -80px 0px" } };

  return (
    <Component
      className={className}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
      }}
      {...trigger}
      {...props}
    >
      {children}
    </Component>
  );
}
