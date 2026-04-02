"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const elements = containerRef.current.querySelectorAll(".scroll-reveal");
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: i === 1 ? 20 : 10, filter: i === 1 ? "blur(8px)" : "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="scroll-reveal mb-4 font-display text-sm font-medium uppercase tracking-widest text-foreground">
          / {label}
        </p>
      )}
      <h2
        className="scroll-reveal font-display font-bold leading-tight"
        style={{ fontSize: "var(--text-h1)" }}
      >
        {title}{" "}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && (
        <p
          className={cn(
            "scroll-reveal mt-4 text-foreground leading-relaxed",
            align === "center" && "mx-auto max-w-2xl"
          )}
          style={{ fontSize: "var(--text-body)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
