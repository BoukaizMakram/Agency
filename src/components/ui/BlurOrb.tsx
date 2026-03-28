"use client";

import { cn } from "@/lib/utils";

interface BlurOrbProps {
  color?: "accent" | "blue" | "purple";
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}

const colorMap = {
  accent: "bg-neutral-300/30",
  blue: "bg-neutral-200/40",
  purple: "bg-neutral-300/25",
};

const sizeMap = {
  sm: "w-[300px] h-[300px]",
  md: "w-[500px] h-[500px]",
  lg: "w-[700px] h-[700px]",
};

export default function BlurOrb({
  color = "accent",
  size = "md",
  className,
  animate = true,
}: BlurOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-[120px] pointer-events-none",
        colorMap[color],
        sizeMap[size],
        animate && "animate-float",
        className
      )}
      aria-hidden="true"
    />
  );
}
