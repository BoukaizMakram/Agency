"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import PortfolioCard from "@/components/sections/PortfolioCard";
import { projects } from "@/data/portfolio";

export default function Portfolio() {
  return (
    <section id="work" className="section-padding">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Portfolio"
          title="Selected"
          highlight="Work"
          description="A carefully picked showcase of projects that highlight our commitment to craft and innovation."
        />

        <div className="space-y-8">
          {projects.map((project, i) => (
            <PortfolioCard
              key={project.id}
              title={project.title}
              category={project.category}
              year={project.year}
              description={project.description}
              tags={project.tags}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
