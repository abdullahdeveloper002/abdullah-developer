"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import SiteLogo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

const sectionIds = navLinks.map((link) => link.href.slice(1));

// Prefixing "/" keeps the anchors working from other routes (e.g. the 404 page).
const toHome = (hash) => `/${hash}`;

function HomeLink() {
  return (
    <a href={toHome("#top")} aria-label={`${site.wordmark}, back to top`} className="rounded-control">
      <SiteLogo />
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <HomeLink />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ label, href }) => {
            const isActive = active === href.slice(1);
            return (
              <li key={href}>
                <a
                  href={toHome(href)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "group relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive ? "text-lime-deep" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {label}
                  {/* Underline grows out from the centre on hover and stays for the current section. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 bottom-1 h-0.5 origin-center rounded-full bg-lime-deep transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* A wrapper hides it: Button's own display class would override `hidden`. On small screens the menu has its own copy. */}
          <div className="hidden md:block">
            <Button href={toHome("#contact")} size="md">
              Let&rsquo;s talk
            </Button>
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-control border border-ink/20 md:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Reading progress: shows how far down the page you are. Decorative, so hidden from assistive tech. */}
      <m.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-lime-deep motion-reduce:hidden"
      />

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full border-b border-line bg-paper md:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={toHome(href)}
                    onClick={() => setOpen(false)}
                    aria-current={active === href.slice(1) ? "location" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-line py-4 font-display text-2xl font-semibold",
                      active === href.slice(1) ? "text-lime-deep" : "text-ink",
                    )}
                  >
                    {label}
                    <span aria-hidden="true" className="font-mono text-sm text-ink-soft">
                      0{sectionIds.indexOf(href.slice(1)) + 1}
                    </span>
                  </a>
                </li>
              ))}
              <li className="py-5">
                <Button href={toHome("#contact")} size="lg" className="w-full" onClick={() => setOpen(false)}>
                  Let&rsquo;s talk
                </Button>
              </li>
            </ul>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
