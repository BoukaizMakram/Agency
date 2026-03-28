"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            end: "top 65%",
            scrub: true,
          },
        }
      );
    },
    { scope: contentRef }
  );

  const testimonial = testimonials[current];

  return (
    <section
      id="reviews"
      className="section-padding bg-background-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What Clients"
          highlight="Say"
        />

        <div ref={contentRef} className="relative mx-auto max-w-3xl text-center">
          {/* Decorative quote */}
          <Quote
            size={64}
            className="absolute -top-8 left-0 pointer-events-none"
            style={{ color: "rgba(10, 10, 10, 0.05)" }}
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display text-xl font-medium leading-relaxed text-foreground md:text-2xl lg:text-3xl">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-8">
                <p className="font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-foreground hover:text-foreground"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-foreground"
                      : "w-2 bg-border hover:bg-foreground-muted"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-foreground hover:text-foreground"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
