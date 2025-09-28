import Icon from "../iconsSvg/IconsSvg.tsx";
import { useEffect, useState, useCallback } from "react";

/* DarkModeToggle component allows the user to switch between light, dark, or system theme */
const DarkModeToggle = () => {
  /* Theme state ("light", "dark", or "system") */
  const [theme, setTheme] = useState("system");

  /* Tracks if the system prefers dark mode */
  const [systemDark, setSystemDark] = useState(false);

  /* Initialize theme based on localStorage or system preference */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    } else {
      setTheme("system");
    }

    /* Listen for changes in system color scheme preference */
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystem = (e: MediaQueryListEvent) => setSystemDark(e.matches);

    setSystemDark(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateSystem);

    return () => mediaQuery.removeEventListener("change", updateSystem);
  }, []);

  /* Apply the theme class to the document root element */
  useEffect(() => {
    const html = document.documentElement;

    if (theme === "dark") html.classList.add("dark");
    else if (theme === "light") html.classList.remove("dark");
    else html.classList.toggle("dark", systemDark);
  }, [theme, systemDark]);

  /* Cycle theme between light → dark → system → light */
  const cycleTheme = useCallback(() => {
    setTheme((prev) => {
      let next;
      if (prev === "light") next = "dark";
      else if (prev === "dark") next = "system";
      else next = "light";

      /* Persist user-selected theme to localStorage, remove if system */
      if (next === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);

      return next;
    });
  }, []);

  /* Flags to determine which icon to show */
  const isLight = theme === "light";
  const isDark = theme === "dark";

  return (
    <div className="w-6 h-6 flex items-center justify-center relative">
      {/* Theme toggle button */}
      <button
        onClick={cycleTheme}
        className="rounded-full cursor-pointer transition-colors duration-500"
        title={`Current theme: ${theme}`}
      >
        {/* Sun icon for light theme */}
        <Icon
          type="sun"
          className={`text-xl text-yellow-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${
            isLight ? "opacity-100 rotate-0" : "opacity-0 -rotate-12"
          }`}
        />

        {/* Moon icon for dark theme */}
        <Icon
          type="moon"
          className={`text-xl text-gray-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${
            isDark ? "opacity-100 rotate-0" : "opacity-0 rotate-12"
          }`}
        />

        {/* Optional system icon when theme is set to "system" */}
        {theme === "system" && (
          <Icon
            type="system"
            className="text-xl text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
        
      </button>
    </div>
  );
};

export default DarkModeToggle;
