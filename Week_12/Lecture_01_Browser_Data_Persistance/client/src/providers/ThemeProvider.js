import { createContext, useEffect, useReducer } from "react";
import { initialThemeState, themeReducer } from "../hooks/useTheme";
import useThemeProvider from "../hooks/useThemeProvider";

export const ThemeContext = createContext();

export default ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {});

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
