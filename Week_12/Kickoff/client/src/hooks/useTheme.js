import { useContext, useState } from "react";
import { themeContext } from "../providers/ThemeProvider/ThemeProvider";

const useTheme = () => {
  const { theme, setTheme } = useContext(themeContext);

  const setLightMode = () => setTheme("light");
  const setDarkMode = () => setTheme("dark");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return {
    theme,
    setLightMode,
    setDarkMode,
    toggleTheme,
  };
};

export default useTheme;
