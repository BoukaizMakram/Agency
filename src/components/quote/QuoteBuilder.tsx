"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "quote-form-data";

interface FormData {
  name: string;
  email: string;
  business: string;
  description: string;
  budget: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  business: "",
  description: "",
  budget: "",
};

export default function QuoteBuilder() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setForm(JSON.parse(saved));
      }
    } catch {}
    setLoaded(true);
  }, []);

  // Save to localStorage on every change
  const updateForm = useCallback(
    (updates: Partial<FormData>) => {
      setForm((prev) => {
        const next = { ...prev, ...updates };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const handleSubmit = async () => {
    if (!form.name || !form.email || submitting) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("quotes").insert({
        name: form.name,
        email: form.email,
        business: form.business || null,
        description: form.description || null,
        budget: form.budget ? Number(form.budget) : null,
      });
      if (error) console.error("Supabase error:", error);
    } catch (err) {
      console.error("Submit error:", err);
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
  };

  if (!loaded) {
    return <div className="min-h-screen bg-foreground" />;
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-foreground px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold text-background md:text-5xl">
            Thank you.
          </h1>
          <p className="mt-4 text-lg text-background/70">
            We&apos;ve received your request and will get back to you within 24
            hours.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-3 text-sm font-medium text-background transition-colors hover:border-background/50"
          >
            Back to Home
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center bg-foreground px-6 py-24">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 font-display text-sm font-medium uppercase tracking-widest text-background/50">
            / Get a Quote
          </p>
          <h1 className="font-display text-4xl font-bold text-background md:text-5xl">
            Tell us about your project.
          </h1>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 space-y-8"
        >
          {/* Name */}
          <div>
            <label className="mb-3 block font-display text-lg font-semibold text-background">
              Full Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
              placeholder="John Doe"
              className="w-full border-0 border-b border-background/20 bg-transparent px-0 py-4 text-background outline-none transition-colors placeholder:text-background/30 focus:border-background/60"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-3 block font-display text-lg font-semibold text-background">
              Email *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
              placeholder="john@example.com"
              className="w-full border-0 border-b border-background/20 bg-transparent px-0 py-4 text-background outline-none transition-colors placeholder:text-background/30 focus:border-background/60"
            />
          </div>

          {/* Business */}
          <div>
            <label className="mb-3 block font-display text-lg font-semibold text-background">
              Business Name
            </label>
            <input
              type="text"
              value={form.business}
              onChange={(e) => updateForm({ business: e.target.value })}
              placeholder="Elite Fitness Academy"
              className="w-full border-0 border-b border-background/20 bg-transparent px-0 py-4 text-background outline-none transition-colors placeholder:text-background/30 focus:border-background/60"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-3 block font-display text-lg font-semibold text-background">
              Tell us about your business
            </label>
            <textarea
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
              placeholder="What does your center do, how many students do you manage, what tools are you currently using..."
              rows={4}
              className="w-full resize-none border-0 border-b border-background/20 bg-transparent px-0 py-4 text-background outline-none transition-colors placeholder:text-background/30 focus:border-background/60"
            />
          </div>

          {/* Budget */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <label className="font-display text-lg font-semibold text-background">
                Your Budget
              </label>
              <div className="group relative">
                <span className="flex h-6 w-6 cursor-help items-center justify-center rounded-full border-2 border-background font-display text-xs font-bold text-background">
                  ?
                </span>
                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-xl bg-background p-4 opacity-0 shadow-xl transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                  <p className="text-sm text-foreground">
                    Not sure?{" "}
                    <Link
                      href="/faq"
                      className="font-semibold underline transition-colors hover:text-foreground/70"
                    >
                      Check our FAQ
                    </Link>{" "}
                    for reference pricing.
                  </p>
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-background" />
                </div>
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 font-display text-lg font-semibold text-background/50">
                &euro;
              </span>
              <input
                type="number"
                value={form.budget}
                onChange={(e) => updateForm({ budget: e.target.value })}
                placeholder="5,000"
                className="w-full border-0 border-b border-background/20 bg-transparent py-4 pl-6 pr-0 text-background outline-none transition-colors placeholder:text-background/30 focus:border-background/60 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            onClick={handleSubmit}
            disabled={!form.name || !form.email || submitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-background py-4 text-lg font-semibold text-foreground transition-colors hover:bg-background/90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {submitting ? "Sending..." : "Send Request"}
            {!submitting && <ArrowRight size={20} />}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
