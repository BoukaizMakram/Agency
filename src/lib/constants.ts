export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
] as const;

export const SITE_CONFIG = {
  name: "Snowflake Systems",
  tagline: "Custom Software",
  description:
    "We build fully custom software for training centers and coaching businesses — replacing spreadsheets, WhatsApp, and manual tracking with one centralized platform.",
  email: "hello@snowflakesystems.com",
} as const;
