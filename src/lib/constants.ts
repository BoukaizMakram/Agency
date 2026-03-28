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
  { label: "Dribbble", href: "https://dribbble.com", icon: "dribbble" },
] as const;

export const SITE_CONFIG = {
  name: "Snowflake",
  tagline: "Digital Agency",
  description:
    "We craft digital experiences that blend strategy, design, and technology to help brands thrive in the modern world.",
  email: "hello@snowflake.agency",
} as const;
