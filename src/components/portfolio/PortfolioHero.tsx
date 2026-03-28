"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MAKRAM } from "@/data/makram";

export default function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full"
      >
        {/* Split-name row — full width, only side padding */}
        <div className="flex flex-col items-center gap-8 px-8 lg:flex-row lg:items-center lg:gap-0 lg:px-12 xl:px-20">
          {/* Left — First name */}
          <div className="text-center lg:flex-1 lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-2 font-display text-sm font-medium uppercase tracking-widest text-foreground-muted"
            >
              Creative Technologist
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="whitespace-nowrap font-display font-black uppercase leading-[0.85] tracking-tighter text-foreground"
              style={{ fontSize: "clamp(2.5rem, 7.5vw, 8rem)" }}
            >
              {MAKRAM.name.split(" ")[0]}
            </motion.h1>
          </div>

          {/* Center — Photo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="shrink-0 lg:mx-8 xl:mx-12"
            style={{ width: "clamp(160px, 14vw, 220px)" }}
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-border bg-background-card"
              style={{ aspectRatio: "3/4" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-background-subtle to-background-card" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="select-none font-display font-black uppercase text-foreground"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", opacity: 0.06 }}
                >
                  MB
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — Last name */}
          <div className="text-center lg:flex-1 lg:text-right">
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-2 font-display text-sm font-medium uppercase tracking-widest text-foreground-muted"
            >
              UI/UX &amp; Motion Designer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="whitespace-nowrap font-display font-black uppercase leading-[0.85] tracking-tighter text-foreground"
              style={{ fontSize: "clamp(2.5rem, 7.5vw, 8rem)" }}
            >
              {MAKRAM.name.split(" ")[1]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-3 font-display text-xs font-medium uppercase tracking-widest text-foreground-muted"
            >
              Based in Morocco
            </motion.p>
          </div>
        </div>

        {/* Bottom tagline — constrained width */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mx-auto mt-12 max-w-xl px-6 text-center text-foreground-muted leading-relaxed"
          style={{ fontSize: "var(--text-body)" }}
        >
          {MAKRAM.tagline}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-foreground-muted">
            Scroll
          </span>
          <div className="h-8 w-px bg-foreground-muted/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
