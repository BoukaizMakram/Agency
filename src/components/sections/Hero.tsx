"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import BlurOrb from "@/components/ui/BlurOrb";
import Button from "@/components/ui/Button";

const words = ["We", "craft", "digital", "experiences"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Blur Orbs */}
      <BlurOrb
        color="accent"
        size="lg"
        className="top-1/4 -left-[200px]"
      />
      <BlurOrb
        color="blue"
        size="md"
        className="top-1/3 -right-[100px] animate-float-delayed"
      />
      <BlurOrb
        color="purple"
        size="sm"
        className="bottom-1/4 left-1/3 animate-float-delayed"
      />

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Headline */}
        <h1 className="font-display font-bold leading-[0.95] tracking-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
              style={{
                fontSize: "var(--text-hero)",
                marginRight: "0.25em",
                color:
                  word === "digital" ? "var(--foreground-muted)" : "var(--foreground)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-foreground-muted leading-relaxed"
          style={{ fontSize: "var(--text-body)" }}
        >
          We blend strategy, design, and technology to build brands that
          stand out and products that perform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            size="lg"
            onClick={() =>
              document
                .querySelector("#work")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Our Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get in Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
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
          <ChevronDown size={20} className="text-foreground-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
