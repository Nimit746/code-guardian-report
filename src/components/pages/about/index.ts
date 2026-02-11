/**
 * About page components barrel file
 * Centralized exports for all about page components
 */

// Main section
export { AboutSection } from "./AboutSection";

// Sub-sections
export { AnimatedBackground } from "./AnimatedBackground";
export { StatsGrid } from "./StatsGrid";
export { VersionInfo } from "./VersionInfo";
export { DetailedInfo } from "./DetailedInfo";
export { CallToActionSection } from "./CallToActionSection";
export { HowToUseSection } from "./HowToUseSection";
export { HowItWorksSection } from "./HowItWorksSection";
export { MeetDeveloperSection } from "./MeetDeveloperSection";
export { EnhancedFeatureShowcase } from "./EnhancedFeatureShowcase";
export { AboutFeatures } from "./AboutFeatures";
export { CustomRulesSection } from "./CustomRulesSection";
export { SupportedToolsSection } from "./SupportedToolsSection";
export { MonitoringInfoSection } from "./MonitoringInfoSection";
export { GitHubContributorsSection } from "./GitHubContributorsSection";

// Supporting components
export { ToolCard, type Tool } from "./ToolCard";

// Types
export type {
  BaseSectionProps,
  Stat,
  StatsGridProps,
  TechStackItem,
  Feature,
  ToolCardProps,
  StepDetail,
  SeverityLevel,
  ExportFormat,
  Step,
  AnalysisStep,
  TeamMember,
  ProjectHighlight,
  TrustIndicator,
  Capability,
  FeatureItem,
  AdvancedMetric,
} from "./types";

// Utilities
export {
  scrollToElement,
  formatNumber,
  getContributorRole,
  getContributorBadgeColor,
  getToolIconType,
  truncateText,
  isValidUrl,
  ensureProtocol,
  openUrlInNewTab,
  debounce,
  throttle,
} from "./utils";

// Constants
export {
  TECH_STACK,
  STATS_DATA,
  TRUST_INDICATORS,
  ANIMATION_DELAYS,
  GRADIENTS,
  SECTION_IDS,
  ANIMATION_DURATIONS,
} from "./constants";
