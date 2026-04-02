"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { MAKRAM } from "@/data/makram";

export default function PortfolioSkills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll(".skill-card");
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
    <section id="skills" className="section-padding">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Skills"
          title="Tools &"
          highlight="Tech"
        />

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {MAKRAM.skills.map((category) => (
            <div
              key={category.title}
              className="skill-card rounded-2xl border border-border bg-background-card p-8"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                  >
                    {skill}
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
