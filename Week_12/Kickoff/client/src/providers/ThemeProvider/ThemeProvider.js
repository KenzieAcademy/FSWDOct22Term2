import { createContext, useState, useEffect } from "react";

export const themeContext = createContext();

const ThemeProvider = ({ children }) => {
  const localTheme = localStorage.getItem("ko-theme");
  const [theme, setTheme] = useState(localTheme ? localTheme : "light");

  useEffect(() => {
    if (theme !== undefined) {
      localStorage.setItem("ko-theme", theme);
    }
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;
