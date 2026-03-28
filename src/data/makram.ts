export interface Experience {
  company: string;
  role: string;
  description: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export const MAKRAM = {
  name: "Makram Boukaiz",
  role: "Creative Technologist",
  tagline:
    "UI/UX and motion design specialist crafting intuitive, user-focused digital interfaces where design, code, and motion collide.",
  bio: "I combine front-end development with visual design expertise, collaborating with cross-functional teams to deliver products that feel as good as they look. I bridge the gap between creativity and technology.",
  email: "makramboukaiz@gmail.com",
  stats: [
    { number: "5+", label: "Years" },
    { number: "50+", label: "Projects" },
    { number: "3", label: "Roles" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/boukaiz-makram/" },
    { label: "GitHub", href: "https://github.com/BoukaizMakram" },
    { label: "Behance", href: "https://behance.net/makramboukaiz1" },
  ] satisfies SocialLink[],
  experience: [
    {
      company: "TaskMaverick OMC Inc",
      role: "Creative Technologist",
      description:
        "Bridging creativity and technology across the full stack. Motion graphics, UI/UX design in Figma, and full-stack development including frontend, backend, API integrations, and Airtable workflows.",
      highlights: [
        "Full-stack Development",
        "Motion Graphics",
        "UI/UX Design",
        "API Integrations",
      ],
    },
    {
      company: "Atlas Secret",
      role: "Lead 3D Artist",
      description:
        "Creating 3D advertisements and website interfaces. Built the company website from scratch with immersive 3D experiences.",
      highlights: ["3D Modeling", "Web Development", "Brand Identity"],
    },
    {
      company: "Enprico",
      role: "Co-founder",
      description:
        "Full-stack development and UI/UX design from the ground up. Motion graphics and promotional content for the platform.",
      highlights: [
        "Next.js",
        "Supabase",
        "UI/UX Design",
        "Motion Graphics",
      ],
    },
  ] satisfies Experience[],
  skills: [
    {
      title: "Motion & Animation",
      skills: [
        "Framer Motion",
        "GSAP",
        "ScrollTrigger",
        "Spring Physics",
        "Layout Animations",
        "Lottie",
        "Rive",
      ],
    },
    {
      title: "Development",
      skills: [
        "React",
        "Next.js 14+",
        "TypeScript",
        "Tailwind CSS",
        "Three.js",
        "Supabase",
        "C/C++",
        "C#",
      ],
    },
    {
      title: "Motion Graphics",
      skills: [
        "After Effects",
        "Premiere Pro",
        "Blender",
        "Cinema 4D",
        "2D Animation",
        "3D Animation",
        "Video Editing",
      ],
    },
    {
      title: "3D & Visual",
      skills: [
        "Blender",
        "Three.js",
        "WebGL",
        "CSS3DRenderer",
        "Unity",
        "Figma",
      ],
    },
  ] satisfies SkillCategory[],
  projects: [
    {
      id: "enprico",
      title: "Enprico",
      url: "https://enprico.com",
      category: "Co-founded Platform",
      description:
        "A full-stack platform built from scratch with Next.js, Supabase, and GSAP-powered animations.",
      tags: ["Next.js", "Supabase", "GSAP", "UI/UX"],
    },
    {
      id: "amanatick",
      title: "Amanatick",
      url: "https://amanatick.com",
      category: "Web Development",
      description:
        "An immersive web experience combining Next.js with Three.js for 3D interactions and GSAP scroll animations.",
      tags: ["Next.js", "Three.js", "GSAP", "3D"],
    },
    {
      id: "tailorresumeai",
      title: "TailorResumeAI",
      url: "https://tailoresumeai.com",
      category: "SaaS Product",
      description:
        "AI-powered resume builder SaaS that helps users craft tailored resumes for specific job applications.",
      tags: ["AI", "SaaS", "Next.js", "Full-stack"],
    },
    {
      id: "taskmaverick",
      title: "TaskMaverick",
      url: "https://taskmaverick.com",
      category: "Productivity Tool",
      description:
        "A productivity and task management tool developed at OMC, Inc. with full-stack capabilities.",
      tags: ["React", "Full-stack", "API", "UI/UX"],
    },
    {
      id: "atlassecret",
      title: "Atlas Secret",
      url: "https://atlassecret.com",
      category: "3D Branding",
      description:
        "Complete 3D branding, website, and motion design package built from the ground up.",
      tags: ["3D", "Blender", "Branding", "Motion Design"],
    },
  ] satisfies Project[],
  education: [
    {
      school: "1337 Coding School",
      degree: "Software Engineer",
      year: "2025",
    },
    {
      school: "ISTA",
      degree: "Associate in Computer Science",
      year: "2022",
    },
  ],
};
