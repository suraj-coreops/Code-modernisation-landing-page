import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggle: () => {} });

/** Light/dark, persisted, and kept in sync with Agent Core when framed.
 *
 *  The initial value is read back off <html> rather than recomputed: the boot
 *  script in index.html has already applied a theme before first paint, and
 *  deciding again here could disagree with the paint the user is looking at. */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");

  const apply = useCallback((next, fromParent = false) => {
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("cc_theme", next);
    } catch {
      // Private mode or blocked site data: the theme still applies for this
      // page load, it simply will not be remembered.
    }
    // Our own toggle tells the host; an incoming sync must not bounce back as
    // an "I changed" notification.
    if (!fromParent && document.documentElement.classList.contains("framed")) {
      try {
        parent.postMessage({ type: "code-console:theme-changed", theme: next }, "*");
      } catch {
        /* cross-origin parent that will not accept messages - nothing to do */
      }
    }
  }, []);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.source !== parent || !e.data || e.data.type !== "code-console:set-theme") return;
      apply(e.data.theme === "light" ? "light" : "dark", true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [apply]);

  const toggle = useCallback(() => apply(theme === "light" ? "dark" : "light"), [theme, apply]);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
