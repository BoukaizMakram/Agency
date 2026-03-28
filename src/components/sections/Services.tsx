"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import {
  Compass,
  Monitor,
  Smartphone,
  Palette,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

const iconComponents: Record<string, React.ComponentType<{ size?: number }>> = {
  Compass,
  Monitor,
  Smartphone,
  Palette,
  TrendingUp,
  Sparkles,
};

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".service-card");
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
    <section id="services" className="section-padding bg-background-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Services"
          title="What We"
          highlight="Do"
          description="We offer a comprehensive suite of digital services to help your brand thrive in the modern world."
        />

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconComponents[service.icon];
            return (
              <motion.div
                key={service.id}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className="service-card group relative rounded-2xl border border-border bg-background p-8 transition-colors hover:border-foreground/20"
              >
                {/* Number */}
                <span className="font-display text-sm font-semibold text-foreground-muted">
                  {service.number}
                </span>

                {/* Icon */}
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/5 text-foreground transition-colors group-hover:bg-foreground/10">
                  {Icon && <Icon size={24} />}
                </div>

                {/* Content */}
                <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
