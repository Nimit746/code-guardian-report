/**
 * Constants for the About page
 * Centralized configuration for better maintainability
 */

// Tech stack information
export const TECH_STACK = [
  {
    name: "React",
    icon: "Code2",
    color: "text-primary",
  },
  {
    name: "TypeScript",
    icon: "Layers",
    color: "text-primary",
  },
  {
    name: "Next.js",
    icon: "Zap",
    color: "text-black dark:text-white",
  },
  {
    name: "Tailwind",
    icon: "Cpu",
    color: "text-primary",
  },
] as const;

// Stats grid data
export const STATS_DATA = [
  {
    icon: "Users",
    label: "Enterprise Clients",
    value: "25,000+",
  },
  {
    icon: "FileCode",
    label: "Code Files Analyzed",
    value: "dynamic", // Will be replaced with actual count
  },
  {
    icon: "Shield",
    label: "Security Issues Detected",
    value: "150,000+",
  },
  {
    icon: "Award",
    label: "Programming Languages",
    value: "20+",
  },
] as const;

// Trust indicators for CTA section
export const TRUST_INDICATORS = [
  {
    label: "25,000+ Developers",
    color: "from-green-500 to-emerald-500",
    delay: "0s",
  },
  {
    label: "150,000+ Vulnerabilities Found",
    color: "from-blue-500 to-indigo-500",
    delay: "0.3s",
  },
  {
    label: "Free Forever",
    color: "from-purple-500 to-pink-500",
    delay: "0.6s",
  },
] as const;

// Animation delays
export const ANIMATION_DELAYS = {
  FAST: "0.1s",
  MEDIUM: "0.3s",
  SLOW: "0.6s",
  VERY_SLOW: "1s",
} as const;

// Gradient classes
export const GRADIENTS = {
  PRIMARY: "from-blue-500 to-indigo-500",
  SUCCESS: "from-green-500 to-emerald-500",
  WARNING: "from-amber-500 to-orange-500",
  DANGER: "from-red-500 to-pink-500",
  PURPLE: "from-purple-500 to-pink-500",
  TEAL: "from-teal-500 to-cyan-500",
} as const;

// Section IDs for navigation
export const SECTION_IDS = {
  ABOUT: "about",
  GETTING_STARTED: "getting-started",
  FEATURES: "features",
  EXAMPLES: "examples",
  API_REFERENCE: "api-reference",
  TECH_STACK: "tech-stack",
  CUSTOM_RULES: "custom-rules",
  UPDATES: "updates",
  ABOUT_SECTION: "about-section",
  FAQ: "faq",
  HOME: "home",
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: "200ms",
  MEDIUM: "300ms",
  SLOW: "500ms",
  VERY_SLOW: "700ms",
} as const;
