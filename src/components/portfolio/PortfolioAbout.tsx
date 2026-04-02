"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import TextReveal from "@/components/ui/TextReveal";
import { MAKRAM } from "@/data/makram";

export default function PortfolioAbout() {
  const statsRef = useRef<HTMLDivElement>(null);

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
        <SectionHeading
          label="About"
          title="Design, Code &"
          highlight="Motion"
        />

        <div className="mx-auto max-w-3xl">
          <TextReveal
            text={MAKRAM.bio}
            className="text-foreground"
          />

          <div ref={statsRef} className="mt-16 grid grid-cols-3 gap-8">
            {MAKRAM.stats.map((stat) => (
              <div key={stat.label} className="stat-item text-center">
                <p className="font-display text-4xl font-bold text-foreground">
                  {stat.number}
                </p>
                <p className="mt-2 text-sm text-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
