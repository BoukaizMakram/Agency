"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Marquee from "@/components/ui/Marquee";

const stats = [
  "20+ Training Centers Powered",
  "5,000+ Students Managed",
  "100% Custom Built",
  "Zero Generic Templates",
  "Desktop · Tablet · Mobile",
  "Replaces 5+ Tools",
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 75%",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-6"
    >
      <Marquee speed="slow">
        {stats.map((stat) => (
          <div key={stat} className="flex items-center gap-8">
            <span className="whitespace-nowrap text-sm font-medium text-foreground">
              {stat}
            </span>
            <span className="text-foreground/50" aria-hidden="true">
              &#9670;
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
