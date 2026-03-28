"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
}

export default function TextReveal({ text, className }: TextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const words = containerRef.current.querySelectorAll(".word");

      gsap.fromTo(
        words,
        { opacity: 0.15, filter: "blur(4px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <p
      ref={containerRef}
      className={cn(
        "font-display text-2xl font-medium leading-relaxed md:text-3xl lg:text-4xl",
        className
      )}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="word inline-block" style={{ marginRight: "0.3em" }}>
          {word}
        </span>
      ))}
    </p>
  );
}
