"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: "2,000 – 4,000",
    description: "Core module for small training centers — get student management and scheduling up and running fast.",
    features: [
      "Student management system",
      "Class scheduling & booking",
      "Single platform (web or mobile)",
      "Up to 500 students",
      "3 months support",
      "Delivery in 4–6 weeks",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "4,000 – 8,000",
    description: "Full platform for growing centers — payments, teacher coordination, and analytics in one system.",
    features: [
      "Student management",
      "Scheduling & booking",
      "Payment & invoicing",
      "Teacher coordination",
      "Web + mobile access",
      "Analytics dashboard",
      "Up to 2,000 students",
      "6 months support",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "8,000+",
    description: "For multi-branch operations that need unlimited scale, custom integrations, and dedicated support.",
    features: [
      "Unlimited modules",
      "Multi-branch management",
      "Custom integrations",
      "White-label option",
      "Dedicated support",
      "Priority feature requests",
      "Unlimited students",
      "Custom timeline",
    ],
  },
] as const;

type TierId = (typeof TIERS)[number]["id"];

interface FormData {
  name: string;
  email: string;
  company: string;
  description: string;
}

export default function QuoteBuilder() {
  const [selectedTier, setSelectedTier] = useState<TierId | null>(null);
  const [step, setStep] = useState<"select" | "details" | "summary">("select");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    description: "",
  });
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;
      const els = heroRef.current.querySelectorAll(".quote-reveal");
      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            delay: 0.1 + i * 0.1,
            ease: "power2.out",
          }
        );
      });
    },
    { scope: heroRef }
  );

  const selectedTierData = TIERS.find((t) => t.id === selectedTier);

  const handleNext = () => {
    if (step === "select" && selectedTier) setStep("details");
    else if (step === "details") setStep("summary");
  };

  const handleBack = () => {
    if (step === "details") setStep("select");
    else if (step === "summary") setStep("details");
  };

  const handleCheckout = () => {
    // Stripe placeholder — would redirect to Stripe Checkout
    alert(
      `Stripe Checkout placeholder\n\nPackage: ${selectedTierData?.name}\nName: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nThis would redirect to Stripe.`
    );
  };

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden pt-24">
        <div ref={heroRef} className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="quote-reveal mb-4 font-display text-sm font-medium uppercase tracking-widest text-foreground">
            / Get a Quote
          </p>
          <h1
            className="quote-reveal font-display font-bold leading-tight text-foreground"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Let&apos;s price your{" "}
            <span className="text-gradient">project</span>
          </h1>
          <p
            className="quote-reveal mt-4 max-w-xl text-foreground leading-relaxed"
            style={{ fontSize: "var(--text-body)" }}
          >
            Choose a package that fits your training center, tell us about
            your business, and get started.
          </p>

          {/* Step indicator */}
          <div className="quote-reveal mt-10 flex items-center gap-3">
            {["Package", "Details", "Summary"].map((label, i) => {
              const stepIndex = i;
              const currentIndex = step === "select" ? 0 : step === "details" ? 1 : 2;
              const isActive = stepIndex === currentIndex;
              const isDone = stepIndex < currentIndex;

              return (
                <div key={label} className="flex items-center gap-3">
                  {i > 0 && (
                    <div
                      className={`h-px w-8 transition-colors ${
                        isDone ? "bg-foreground" : "bg-border"
                      }`}
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-foreground text-background"
                          : isDone
                            ? "bg-foreground text-background"
                            : "border border-border text-foreground/40"
                      }`}
                    >
                      {isDone ? <Check size={14} /> : stepIndex + 1}
                    </div>
                    <span
                      className={`text-sm font-medium transition-colors ${
                        isActive || isDone ? "text-foreground" : "text-foreground/40"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {step === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-3"
              >
                {TIERS.map((tier) => (
                  <motion.button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex flex-col rounded-3xl border p-8 text-left transition-all lg:p-10 ${
                      selectedTier === tier.id
                        ? "border-foreground bg-white shadow-xl shadow-black/[0.08]"
                        : "border-neutral-200 bg-white shadow-md shadow-black/[0.04] hover:border-neutral-300"
                    }`}
                  >
                    {"popular" in tier && tier.popular && (
                      <div className="absolute -top-3 right-6 flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                        <Sparkles size={12} />
                        Popular
                      </div>
                    )}

                    <h3 className="font-display text-xl font-bold text-foreground">
                      {tier.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold text-foreground">
                        &euro;{tier.price}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                      {tier.description}
                    </p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                          <Check size={16} className="mt-0.5 shrink-0 text-foreground" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div
                      className={`mt-8 flex items-center justify-center rounded-full py-3 text-sm font-semibold transition-colors ${
                        selectedTier === tier.id
                          ? "bg-foreground text-background"
                          : "border border-border text-foreground"
                      }`}
                    >
                      {selectedTier === tier.id ? "Selected" : "Select Package"}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {step === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-2xl"
              >
                <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl shadow-black/[0.08] lg:p-12">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Tell us about your project
                  </h2>
                  <p className="mt-2 text-sm text-foreground/60">
                    Selected: <strong>{selectedTierData?.name}</strong> (&euro;{selectedTierData?.price})
                  </p>

                  <div className="mt-8 space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Training Center / Business
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Elite Fitness Academy"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Project Description *
                      </label>
                      <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Tell us about your training center, how many students you manage, what tools you currently use, and what you need..."
                        rows={4}
                        className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "summary" && selectedTierData && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-2xl"
              >
                <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl shadow-black/[0.08] lg:p-12">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Order Summary
                  </h2>

                  <div className="mt-8 space-y-6">
                    {/* Package */}
                    <div className="flex items-center justify-between rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                      <div>
                        <p className="text-sm text-foreground/60">Package</p>
                        <p className="mt-1 font-display text-lg font-bold text-foreground">
                          {selectedTierData.name}
                        </p>
                      </div>
                      <p className="font-display text-2xl font-bold text-foreground">
                        &euro;{selectedTierData.price}
                      </p>
                    </div>

                    {/* Client info */}
                    <div className="space-y-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                      <p className="text-sm font-medium text-foreground/60">Client Details</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-foreground/50">Name</p>
                          <p className="font-medium text-foreground">{form.name || "—"}</p>
                        </div>
                        <div>
                          <p className="text-foreground/50">Email</p>
                          <p className="font-medium text-foreground">{form.email || "—"}</p>
                        </div>
                        <div>
                          <p className="text-foreground/50">Company</p>
                          <p className="font-medium text-foreground">{form.company || "—"}</p>
                        </div>
                      </div>
                      {form.description && (
                        <div className="text-sm">
                          <p className="text-foreground/50">Project</p>
                          <p className="mt-1 font-medium leading-relaxed text-foreground">
                            {form.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground/60">Included</p>
                      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {selectedTierData.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                            <Check size={14} className="shrink-0 text-foreground" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <motion.button
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-4 text-lg font-semibold text-background transition-colors hover:bg-accent-hover"
                  >
                    Proceed to Payment
                    <ArrowRight size={20} />
                  </motion.button>
                  <p className="mt-3 text-center text-xs text-foreground/40">
                    You&apos;ll be redirected to Stripe for secure payment
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="mx-auto mt-10 flex max-w-2xl items-center justify-between">
            {step !== "select" ? (
              <motion.button
                onClick={handleBack}
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                <ArrowLeft size={16} />
                Back
              </motion.button>
            ) : (
              <div />
            )}
            {step !== "summary" && (
              <motion.button
                onClick={handleNext}
                disabled={
                  (step === "select" && !selectedTier) ||
                  (step === "details" && (!form.name || !form.email || !form.description))
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-30"
              >
                Continue
                <ArrowRight size={16} />
              </motion.button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
