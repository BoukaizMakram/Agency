"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
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

  const headingText = "Let's build your system.";

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Heading */}
          <div>
            <p className="contact-reveal mb-6 font-display text-sm font-medium uppercase tracking-widest text-background/60">
              / Get in Touch
            </p>

            <h2
              ref={headingRef}
              className="font-display font-bold leading-tight text-background"
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

            <p className="contact-reveal mt-6 max-w-md text-background/70 leading-relaxed">
              Running a training center or coaching business? Tell us how you
              work today, and we&apos;ll build the software to make it effortless.
            </p>
          </div>

          {/* Right: Contact Info + Form */}
          <div className="flex flex-col justify-center">
            <div className="contact-reveal space-y-6">
              {/* Email */}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="group flex items-center gap-4 rounded-xl border border-background/20 p-5 transition-colors hover:border-background/40"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/10 text-background">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-sm text-background/60">Email us</p>
                  <p className="font-medium text-background">
                    {SITE_CONFIG.email}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="ml-auto text-background/60 transition-transform group-hover:translate-x-1 group-hover:text-background"
                />
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 rounded-xl border border-background/20 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background/10 text-background">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-sm text-background/60">Based in</p>
                  <p className="font-medium text-background">
                    Remote — Worldwide
                  </p>
                </div>
              </div>

              {/* CTA */}
              <MagneticWrapper strength={0.2}>
                <motion.a
                  href="/quote"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-background py-4 text-lg font-semibold text-foreground transition-colors hover:bg-background/90"
                >
                  Start Your Project
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
