"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import Card3D from "@/components/ui/Card3D";

interface PortfolioCardProps {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  index: number;
  total: number;
}

export default function PortfolioCard({
  title,
  category,
  year,
  description,
  tags,
  index,
  total,
}: PortfolioCardProps) {
  const isReversed = index % 2 !== 0;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isLast = index === total - 1;

  useGSAP(
    () => {
      if (!wrapperRef.current) return;
      const el = wrapperRef.current;

      // Entrance animation
      gsap.fromTo(
        el,
        { opacity: 0, y: 60, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 55%",
            scrub: true,
          },
        }
      );

      // 3D exit animation — card scales down & tilts as next card covers it
      if (!isLast) {
        gsap.to(el, {
          scale: 0.92,
          rotateX: 5,
          scrollTrigger: {
            trigger: el,
            start: "bottom 80%",
            end: "bottom 20%",
            scrub: true,
          },
        });
      }
    },
    { scope: wrapperRef }
  );

  const stickyTop = 80 + index * 20;

  return (
    <div
      ref={wrapperRef}
      className="sticky"
      style={{
        top: `${stickyTop}px`,
        zIndex: index + 1,
        perspective: "1200px",
        transformStyle: "preserve-3d",
        paddingBottom: isLast ? 0 : "2rem",
      }}
    >
      <Card3D>
        <div className="group grid grid-cols-1 gap-10 rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl shadow-black/[0.08] lg:grid-cols-2 lg:p-12">
          {/* Image Placeholder */}
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 ${
              isReversed ? "lg:order-2" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-200/50 to-neutral-100/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-8xl font-bold text-foreground/[0.03]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="rounded-full bg-foreground p-4"
              >
                <ArrowUpRight size={24} className="text-background" />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`flex flex-col justify-center ${
              isReversed ? "lg:order-1 lg:text-right" : ""
            }`}
            style={{ direction: "ltr" }}
          >
            <div className="flex items-center gap-3 text-sm text-foreground">
              <span>{category}</span>
              <span className="text-foreground">&#9670;</span>
              <span>{year}</span>
            </div>
            <h3
              className="mt-4 font-display text-3xl font-bold text-foreground lg:text-4xl"
            >
              {title}
            </h3>
            <p className="mt-4 text-foreground/80 leading-relaxed lg:text-lg">
              {description}
            </p>
            <div
              className={`mt-8 flex flex-wrap gap-2 ${
                isReversed ? "lg:justify-end" : ""
              }`}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-medium text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card3D>
    </div>
  );
}
