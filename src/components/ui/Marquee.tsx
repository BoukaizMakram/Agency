"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
}

const speedMap = {
  slow: "50s",
  normal: "35s",
  fast: "20s",
};

export default function Marquee({
  children,
  className,
  speed = "normal",
  direction = "left",
}: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${speedMap[speed]} linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
