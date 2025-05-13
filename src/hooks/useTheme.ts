import { useState, useEffect } from "react";

interface ThemeHook {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

/**
 * Custom hook for managing theme state (light/dark mode)
 *
 * Features:
 * - Persists theme preference in localStorage
 * - Respects system color scheme preference
 * - Provides toggle functionality
 * - Automatically applies theme to document
 *
 * @returns {Object} Theme state and controls
 * @returns {boolean} isDarkMode - Current theme state
 * @returns {Function} toggleTheme - Function to switch between themes
 */
export function useTheme(): ThemeHook {
  /**
   * Initialize theme state with preference from:
   * 1. localStorage (if previously set)
   * 2. System preference (if no localStorage value)
   * 3. Default to light mode if neither available
   */
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Handle SSR by checking window availability
    if (typeof window === "undefined") return false;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }

    // Fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  /**
   * Effect to handle theme changes:
   * - Updates document class for Tailwind dark mode
   * - Persists theme preference to localStorage
   */
  useEffect(() => {
    // Apply theme class to document root
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save theme preference
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  /**
   * Toggle function to switch between light and dark themes
   */
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return { isDarkMode, toggleTheme };
}
