"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Button from "@/components/ui/Button";

const words = ["We", "build", "your", "system"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full px-6 pb-10 pt-24 lg:px-10 xl:px-14"
      >
        {/* Full-width headline — fills the viewport */}
        <h1
          className="w-full lowercase leading-[0.82] tracking-tighter"
          style={{
            fontFamily: '"Nohemi", ui-sans-serif, system-ui, sans-serif',
            color: "var(--foreground)",
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{
                opacity: 0,
                y: 60,
                filter: "blur(10px)",
                fontWeight: 100,
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                fontWeight: 800,
              }}
              transition={{
                opacity: {
                  duration: 0.6,
                  delay: 0.15 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                y: {
                  duration: 0.8,
                  delay: 0.15 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                filter: {
                  duration: 0.8,
                  delay: 0.15 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                fontWeight: {
                  duration: 1.2,
                  delay: 0.3 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              className="block w-full"
              style={{
                fontSize: "clamp(3rem, 13vw, 15rem)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Tagline + CTAs — right-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="-mt-[clamp(4rem,10vw,12rem)] ml-auto flex max-w-sm flex-col items-end text-right relative z-20"
        >
          <p
            className="text-foreground leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Custom software that replaces spreadsheets, WhatsApp groups, and
            manual tracking with{" "}
            <strong className="font-semibold text-foreground">
              one platform built around your workflow.
            </strong>
          </p>
          <div className="mt-6 flex gap-4">
            <Button
              size="lg"
              onClick={() =>
                document
                  .querySelector("#work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See How It Works
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
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
