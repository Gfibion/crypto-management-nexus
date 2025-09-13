
import React from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  // Add error boundary for useState
  if (typeof React.useState !== 'function') {
    console.error('React hooks not available');
    return React.createElement('div', { className: 'min-h-screen bg-slate-900 text-white' }, children);
  }

  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  React.useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme;
      if (storedTheme && (storedTheme === "dark" || storedTheme === "light")) {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error);
    }
  }, [storageKey]);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
        setTheme(newTheme);
      }
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      <div className={theme}>
        {children}
      </div>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
