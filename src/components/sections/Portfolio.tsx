"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import PortfolioCard from "@/components/sections/PortfolioCard";
import { projects } from "@/data/portfolio";

export default function Portfolio() {
  return (
    <section id="work" className="section-padding">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Case Studies"
          title="Real"
          highlight="Results"
          description="Training centers and coaching businesses we've built custom platforms for — from enrollment to payments."
        />

        <div>
          {projects.map((project, i) => (
            <PortfolioCard
              key={project.id}
              title={project.title}
              category={project.category}
              year={project.year}
              description={project.description}
              tags={project.tags}
              index={i}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
