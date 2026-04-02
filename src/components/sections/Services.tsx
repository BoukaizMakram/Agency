"use client";

import { useRef } from "react";
import {
  Users,
  Calendar,
  CreditCard,
  UserCog,
  Monitor,
  BarChart3,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

const iconComponents: Record<string, React.ComponentType<{ size?: number }>> = {
  Users,
  Calendar,
  CreditCard,
  UserCog,
  Monitor,
  BarChart3,
};

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".service-card");
      cards.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, scale: 0.95, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: gridRef }
  );

  return (
    <section id="services" className="section-padding">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="What We Build"
          title="Everything Your Center"
          highlight="Needs"
          description="From student enrollment to payment tracking — every feature is built specifically for how your training center operates."
        />

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconComponents[service.icon];
            return (
              <div
                key={service.id}
                className="service-card group relative rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
              >
                {/* Number */}
                <span className="font-display text-sm font-semibold text-foreground">
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
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
