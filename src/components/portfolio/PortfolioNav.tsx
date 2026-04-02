"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MAKRAM } from "@/data/makram";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

export default function PortfolioNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("Home");

  /* Show after scrolling past hero */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(NAV_ITEMS.find((n) => n.href === `#${id}`)?.label ?? "");
          }
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-1 rounded-full border border-border bg-white/80 px-2 py-2 shadow-lg backdrop-blur-xl">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  color: active === item.label ? "var(--background)" : "var(--foreground)",
                }}
              >
                {active === item.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}

            {/* Contact CTA */}
            <a
              href={`mailto:${MAKRAM.email}`}
              className="ml-1 flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
            >
              Contact
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
