"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import BlurOrb from "@/components/ui/BlurOrb";
import { SITE_CONFIG } from "@/lib/constants";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Character reveal on heading
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.02,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      }

      // Scrub reveal for other elements
      const reveals = sectionRef.current.querySelectorAll(".contact-reveal");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 65%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const headingText = "Let's build something great together.";

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden">
      <BlurOrb
        color="accent"
        size="md"
        className="-right-[200px] top-1/2 -translate-y-1/2"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Heading */}
          <div>
            <p className="contact-reveal mb-6 font-display text-sm font-medium uppercase tracking-widest text-foreground-muted">
              / Get in Touch
            </p>

            <h2
              ref={headingRef}
              className="font-display font-bold leading-tight"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {headingText.split(" ").map((word, wi) => (
                <span key={wi} className="inline-block" style={{ marginRight: "0.25em" }}>
                  {word.split("").map((char, ci) => (
                    <span key={ci} className="char inline-block">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            <p className="contact-reveal mt-6 max-w-md text-foreground-muted leading-relaxed">
              Have a project in mind? We&apos;d love to hear about it. Drop us a
              line and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {/* Right: Contact Info + Form */}
          <div className="flex flex-col justify-center">
            <div className="contact-reveal space-y-6">
              {/* Email */}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="group flex items-center gap-4 rounded-xl border border-border p-5 transition-colors hover:border-foreground/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-foreground">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Email us</p>
                  <p className="font-medium text-foreground">
                    {SITE_CONFIG.email}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="ml-auto text-foreground-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground"
                />
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 rounded-xl border border-border p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-foreground">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-sm text-foreground-muted">Based in</p>
                  <p className="font-medium text-foreground">
                    Remote — Worldwide
                  </p>
                </div>
              </div>

              {/* CTA */}
              <MagneticWrapper strength={0.2}>
                <motion.a
                  href={`mailto:${SITE_CONFIG.email}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-4 text-lg font-semibold text-background transition-colors hover:bg-accent-hover"
                >
                  Start a Project
                  <ArrowUpRight size={20} />
                </motion.a>
              </MagneticWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
