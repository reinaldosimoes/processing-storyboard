import { type ClassValue, clsx } from "clsx";

/**
 * Utility function to merge class names with clsx
 *
 * A lightweight utility for conditionally joining class names together.
 * Similar to the cn function used in popular UI libraries like shadcn/ui.
 *
 * Features:
 * - Handles conditional classes with boolean values
 * - Merges arrays and objects of class names
 * - Filters out falsy values automatically
 * - Type-safe with TypeScript
 *
 * Usage:
 * ```tsx
 * cn("base-class", isActive && "active", className)
 * cn("btn", { "btn-primary": isPrimary, "btn-secondary": !isPrimary })
 * cn(["class1", "class2"], "class3")
 * ```
 *
 * @param inputs - Class names to merge (strings, arrays, objects, or booleans)
 * @returns Merged class name string
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
