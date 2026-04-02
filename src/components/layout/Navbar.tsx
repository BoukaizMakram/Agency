"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const isDarkPage = pathname === "/quote" || pathname === "/faq";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 300);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (pathname === "/") {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/" + href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isDarkPage
            ? "bg-transparent"
            : isScrolled
              ? "glass-strong"
              : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex items-center gap-2"
            >
              <Image
                src="/LOGO/logo_transparent.png"
                alt={SITE_CONFIG.name}
                width={36}
                height={36}
                className={cn("h-9 w-9", isDarkPage && "invert")}
              />
              <span className={cn("font-display text-lg font-bold tracking-tight", isDarkPage ? "text-background" : "text-foreground")}>
                {SITE_CONFIG.name}
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={cn("hover-line relative px-4 py-2 text-sm transition-colors", isDarkPage ? "text-background hover:text-background" : "text-foreground hover:text-foreground")}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                onClick={() => handleNavClick("#contact")}
                className={cn("flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors", isDarkPage ? "border-background/20 text-background hover:border-background" : "border-border text-foreground hover:border-foreground")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Let&apos;s Talk
              </motion.button>
              <Link href="/quote">
                <motion.span
                  className={cn("flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors", isDarkPage ? "bg-background text-foreground hover:bg-background/90" : "bg-foreground text-background hover:bg-accent-hover")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start a Project
                </motion.span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={cn("md:hidden relative z-50 p-2", isDarkPage ? "text-background" : "text-foreground")}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  onClick={() => handleNavClick(link.href)}
                  className="font-display text-3xl font-semibold text-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: NAV_LINKS.length * 0.08,
                  duration: 0.4,
                }}
                onClick={() => handleNavClick("#contact")}
                className="mt-4 rounded-full border border-foreground px-8 py-3 text-lg font-medium text-foreground"
              >
                Let&apos;s Talk
              </motion.button>
              <Link href="/quote" onClick={() => setIsMobileOpen(false)}>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: (NAV_LINKS.length + 1) * 0.08,
                    duration: 0.4,
                  }}
                  className="inline-block rounded-full bg-foreground px-8 py-3 text-lg font-medium text-background"
                >
                  Start a Project
                </motion.span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
