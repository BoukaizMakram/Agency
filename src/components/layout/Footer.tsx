"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Globe, ExternalLink, Link2, ArrowUpRight } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  twitter: Globe,
  instagram: ExternalLink,
  linkedin: Link2,
  dribbble: ArrowUpRight,
};

export default function Footer() {
  const pathname = usePathname();
  const isDarkPage = pathname === "/quote" || pathname === "/faq";

  if (isDarkPage) return null;

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background border-t border-background/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/LOGO/logo_transparent.png"
                alt={SITE_CONFIG.name}
                width={32}
                height={32}
                className="h-8 w-8 invert"
              />
              <h3 className="font-display text-2xl font-bold text-background">
                {SITE_CONFIG.name}
              </h3>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/60">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/60">
              Connect
            </h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 text-background/70 transition-colors hover:border-background hover:text-background"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {Icon && <Icon size={18} />}
                  </motion.a>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-background/70">
              {SITE_CONFIG.email}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-background/10 pt-8 text-center">
          <p className="text-xs text-background/50">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
