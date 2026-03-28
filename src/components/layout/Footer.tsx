"use client";

import { motion } from "motion/react";
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Globe, ExternalLink, Link2, ArrowUpRight } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  twitter: Globe,
  instagram: ExternalLink,
  linkedin: Link2,
  dribbble: ArrowUpRight,
};

export default function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              {SITE_CONFIG.name}
              <span className="text-foreground-muted">.</span>
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-muted">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground-muted">
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-foreground hover:text-foreground"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {Icon && <Icon size={18} />}
                  </motion.a>
                );
              })}
            </div>
            <p className="mt-6 text-sm text-foreground-muted">
              {SITE_CONFIG.email}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="text-xs text-foreground-muted">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
