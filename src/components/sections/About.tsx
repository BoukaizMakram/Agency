"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import TextReveal from "@/components/ui/TextReveal";

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useGSAP(
    () => {
      if (!statsRef.current) return;

      const items = statsRef.current.querySelectorAll(".stat-item");
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 65%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: statsRef }
  );

  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text Side */}
          <div>
            <SectionHeading
              label="About Us"
              title="We build what"
              highlight="matters."
              align="left"
            />
            <TextReveal
              text="We work with founders, product teams, companies and brands based on strategy and innovation. We set one goal, cut noise, and move. When the job is done, the result is live and measured, not just designed."
              className="mt-8 text-foreground-muted"
            />

            {/* Stats */}
            <div ref={statsRef} className="mt-12 grid grid-cols-3 gap-6">
              {[
                { number: "50+", label: "Projects" },
                { number: "5+", label: "Years" },
                { number: "98%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="stat-item">
                  <p className="font-display text-3xl font-bold text-foreground">
                    {stat.number}
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-background-card"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-200/50 via-transparent to-neutral-300/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-display text-8xl font-bold text-foreground/5">
                    S.
                  </span>
                </div>
              </div>
            </motion.div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
