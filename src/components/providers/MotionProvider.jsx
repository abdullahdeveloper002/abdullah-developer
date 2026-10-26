"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

// Animation features load after first paint, keeping them out of the initial bundle.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

/**
 * `reducedMotion="user"` makes every transform/layout animation respect the
 * visitor's OS "reduce motion" setting, in one place.
 */
export default function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
