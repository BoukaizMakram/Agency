"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function SlideUp({
  children,
  className,
}: SlideUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "top 60%",
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
