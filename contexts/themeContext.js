"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create a theme context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  // Function to get the initial theme preference from local storage
  const getInitialTheme = () => {
    if (typeof localStorage !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme !== null) {
        return storedTheme === "dark";
      }
    }
    return true; // Fallback to 'light' if localStorage is not available or no stored value found
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;

      // Store the theme preference in localStorage
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", newMode ? "dark" : "light");
      }

      return newMode;
    });
  };

  useEffect(() => {
    // Check if 'window' is defined (Next.js might not have 'window' on the server)
    if (typeof window !== "undefined") {
      // Listen for changes to the prefers-color-scheme media query
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Function to handle changes in system dark mode preference
      const handleSystemThemeChange = (e) => {
        setIsDarkMode(e.matches);
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);

      // Cleanup the event listener when the component unmounts
      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        baseColor: isDarkMode ? "bg-[#0a0a0a]" : "bg-white",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
