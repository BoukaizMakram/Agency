"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { MAKRAM } from "@/data/makram";

export default function PortfolioExperience() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll(".exp-card");
      cards.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, filter: "blur(6px)" },
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
    { scope: gridRef }
  );

  return (
    <section id="experience" className="section-padding bg-background-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Experience"
          title="Where I've"
          highlight="Worked"
        />

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MAKRAM.experience.map((exp) => (
            <div
              key={exp.company}
              className="exp-card group rounded-2xl border border-border bg-background p-8 transition-colors hover:border-foreground/20"
            >
              <p className="font-display text-sm font-semibold text-foreground-muted">
                {exp.role}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                {exp.company}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                {exp.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {exp.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-foreground-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
