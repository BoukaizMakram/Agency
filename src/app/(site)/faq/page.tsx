import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "FAQ | Snowflake Systems",
  description:
    "Common questions about our custom training center software — pricing, timelines, and how we work.",
};

const TIERS = [
  {
    name: "Starter",
    price: "2,000 – 4,000",
    description:
      "Student management + scheduling on a single platform. Ideal for small centers.",
  },
  {
    name: "Growth",
    price: "4,000 – 8,000",
    description:
      "Full platform with payments, teacher coordination, analytics, web + mobile.",
  },
  {
    name: "Enterprise",
    price: "8,000+",
    description:
      "Multi-branch, unlimited modules, custom integrations, dedicated support.",
  },
];

const FAQS = [
  {
    question: "How long does it take?",
    answer:
      "Most projects are delivered within 4 to 8 weeks, depending on the scope and complexity of your system.",
  },
  {
    question: "Do I need to know anything technical?",
    answer:
      "Not at all. We handle everything — from design to development to deployment. You just tell us how your business works.",
  },
  {
    question: "Can I add features later?",
    answer:
      "Absolutely. Your system is built to grow with you. We can add new modules, integrations, or platforms anytime.",
  },
  {
    question: "What platforms do you build for?",
    answer:
      "Web, tablet, and mobile — or all three. We build for whatever devices your team and students use.",
  },
  {
    question: "How does payment work?",
    answer:
      "50% upfront to start development, 50% on delivery. No hidden fees, no surprises.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-foreground px-6 py-24">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <p className="mb-4 font-display text-sm font-medium uppercase tracking-widest text-background/50">
          / FAQ
        </p>
        <h1 className="font-display text-4xl font-bold text-background md:text-5xl">
          Frequently Asked Questions
        </h1>

        {/* Pricing Reference */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-background">
            Reference Pricing
          </h2>
          <p className="mt-2 text-background/60">
            Every project is custom, but here are typical ranges to help you
            plan.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl border border-background/15 p-6"
              >
                <h3 className="font-display text-lg font-bold text-background">
                  {tier.name}
                </h3>
                <p className="mt-2 font-display text-2xl font-bold text-background">
                  &euro;{tier.price}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-background/60">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="mt-20 space-y-8">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="border-b border-background/10 pb-8"
            >
              <h3 className="font-display text-xl font-bold text-background">
                {faq.question}
              </h3>
              <p className="mt-3 leading-relaxed text-background/70">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-background/90"
          >
            Get a Quote
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
