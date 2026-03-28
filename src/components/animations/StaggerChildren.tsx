"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function StaggerChildren({
  children,
  className,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const items = ref.current.children;
      gsap.fromTo(
        items,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "top 55%",
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
