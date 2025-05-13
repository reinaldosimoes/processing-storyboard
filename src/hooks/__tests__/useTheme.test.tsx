import { renderHook, act } from "@testing-library/react";
import { useTheme } from "../useTheme";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("useTheme", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document classes
    document.documentElement.classList.remove("dark");
    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("should initialize with light theme when no saved theme and system prefers light", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("should initialize with dark theme when system prefers dark", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useTheme());
    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should initialize with saved theme from localStorage", () => {
    localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should toggle theme when toggleTheme is called", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDarkMode).toBe(false);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("should update localStorage when theme changes", () => {
    const { result } = renderHook(() => useTheme());
    expect(localStorage.getItem("theme")).toBe("light");

    act(() => {
      result.current.toggleTheme();
    });

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("should update document classes when theme changes", () => {
    const { result } = renderHook(() => useTheme());
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    act(() => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
