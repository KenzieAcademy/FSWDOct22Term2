import { useState, createContext } from "react";

// Step 1: Create a context (no inputs or anything needed; just an empty vessel for now)
export const themeContext = createContext();

// Step 2: Create the context provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const setDark = () => setTheme("dark");
  const setLight = () => setTheme("light");

  return (
    <themeContext.Provider value={{ theme, toggleTheme, setDark, setLight }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;
