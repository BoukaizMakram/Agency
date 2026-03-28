"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MAKRAM } from "@/data/makram";

export default function PortfolioProjects() {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!listRef.current) return;
      const cards = listRef.current.querySelectorAll(".project-card");
      cards.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: "blur(8px)" },
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
    { scope: listRef }
  );

  return (
    <section id="projects" className="section-padding bg-background-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Projects"
          title="Selected"
          highlight="Work"
        />

        <div ref={listRef} className="space-y-6">
          {MAKRAM.projects.map((project, i) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group grid grid-cols-1 gap-6 rounded-2xl border border-border bg-background p-6 transition-colors hover:border-foreground/20 lg:grid-cols-[1fr_2fr_auto] lg:items-center lg:p-8"
            >
              {/* Number + Category */}
              <div>
                <span className="font-display text-sm font-semibold text-foreground-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-foreground-muted">
                  {project.category}
                </p>
              </div>

              {/* Description + Tags */}
              <div>
                <p className="text-foreground-muted leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs text-foreground-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden lg:block">
                <ArrowUpRight
                  size={20}
                  className="text-foreground-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
