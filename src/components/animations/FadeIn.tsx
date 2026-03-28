"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

const directionOffsets = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
};

export default function FadeIn({
  children,
  direction = "up",
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        { opacity: 0, filter: "blur(6px)", ...directionOffsets[direction] },
        {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          y: 0,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "top 65%",
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
