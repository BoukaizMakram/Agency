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
}

export default function PortfolioCard({
  title,
  category,
  year,
  description,
  tags,
  index,
}: PortfolioCardProps) {
  const isReversed = index % 2 !== 0;
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    },
    { scope: cardRef }
  );

  return (
    <div ref={cardRef}>
      <Card3D>
        <div
          className="group grid grid-cols-1 gap-8 rounded-2xl border border-border bg-background-card p-6 transition-colors hover:border-foreground/20 lg:grid-cols-2 lg:p-10"
        >
          {/* Image Placeholder */}
          <div
            className={`relative aspect-video overflow-hidden rounded-xl bg-background-subtle ${
              isReversed ? "lg:order-2" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-200/30 to-neutral-100/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-6xl font-bold text-foreground/5">
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
            <div className="flex items-center gap-3 text-sm text-foreground-muted">
              <span>{category}</span>
              <span className="text-foreground-muted">&#9670;</span>
              <span>{year}</span>
            </div>
            <h3
              className="mt-4 font-display font-bold text-foreground"
              style={{ fontSize: "var(--text-h3)" }}
            >
              {title}
            </h3>
            <p className="mt-3 text-foreground-muted leading-relaxed">
              {description}
            </p>
            <div
              className={`mt-6 flex flex-wrap gap-2 ${
                isReversed ? "lg:justify-end" : ""
              }`}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-foreground-muted"
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
