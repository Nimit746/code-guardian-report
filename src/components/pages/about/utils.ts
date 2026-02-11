/**
 * Utility functions for the About page components
 * Common helper functions for better code reusability
 */

/**
 * Scrolls to a specific element by ID with smooth behavior
 * @param elementId - The ID of the element to scroll to
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

/**
 * Formats a number with locale-specific formatting
 * @param value - The number to format
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @returns The formatted number string
 */
export const formatNumber = (
  value: number,
  locale: string = "en-US"
): string => {
  return value.toLocaleString(locale);
};

/**
 * Gets a contributor role based on contributions and index
 * @param contributions - Number of contributions
 * @param index - Index in the contributors list
 * @returns The contributor role string
 */
export const getContributorRole = (
  contributions: number,
  index: number
): string => {
  if (index === 0) return "Lead Contributor";
  if (contributions > 50) return "Core Contributor";
  if (contributions > 20) return "Active Contributor";
  if (contributions > 10) return "Regular Contributor";
  return "Contributor";
};

/**
 * Gets a contributor badge color based on contributions and index
 * @param contributions - Number of contributions
 * @param index - Index in the contributors list
 * @returns The gradient class string
 */
export const getContributorBadgeColor = (
  contributions: number,
  index: number
): string => {
  if (index === 0) return "bg-gradient-to-r from-yellow-500 to-orange-500";
  if (contributions > 50) return "bg-gradient-to-r from-purple-500 to-pink-500";
  if (contributions > 20) return "bg-gradient-to-r from-blue-500 to-cyan-500";
  if (contributions > 10)
    return "bg-gradient-to-r from-green-500 to-emerald-500";
  return "bg-gradient-to-r from-gray-500 to-slate-500";
};

/**
 * Gets a tool icon component based on the tool type
 * @param type - The tool type string
 * @returns The icon component name
 */
export const getToolIconType = (type: string): "Shield" | "Star" | "Zap" => {
  if (type.toLowerCase().includes("security")) return "Shield";
  if (type.toLowerCase().includes("quality")) return "Star";
  return "Zap";
};

/**
 * Truncates text to a specified length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns The truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

/**
 * Validates if a URL is properly formatted
 * @param url - The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Ensures a URL has a protocol (http:// or https://)
 * @param url - The URL to check
 * @returns The URL with protocol
 */
export const ensureProtocol = (url: string): string => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

/**
 * Opens a URL in a new tab
 * @param url - The URL to open
 */
export const openUrlInNewTab = (url: string): void => {
  const urlWithProtocol = ensureProtocol(url);
  window.open(urlWithProtocol, "_blank", "noopener,noreferrer");
};

/**
 * Debounces a function call
 * @param func - The function to debounce
 * @param wait - The wait time in milliseconds
 * @returns The debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttles a function call
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds
 * @returns The throttled function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
