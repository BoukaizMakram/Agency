import type { Metadata } from "next";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioAbout from "@/components/portfolio/PortfolioAbout";
import PortfolioExperience from "@/components/portfolio/PortfolioExperience";
import PortfolioSkills from "@/components/portfolio/PortfolioSkills";
import PortfolioProjects from "@/components/portfolio/PortfolioProjects";
import PortfolioContact from "@/components/portfolio/PortfolioContact";
import PortfolioNav from "@/components/portfolio/PortfolioNav";

export const metadata: Metadata = {
  title: "Makram Boukaiz | Creative Technologist",
  description:
    "UI/UX and motion design specialist crafting intuitive, user-focused digital interfaces where design, code, and motion collide.",
  robots: { index: false, follow: false },
};

export default function MakramPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioAbout />
      <PortfolioExperience />
      <PortfolioSkills />
      <PortfolioProjects />
      <PortfolioContact />
      <PortfolioNav />
    </>
  );
}
