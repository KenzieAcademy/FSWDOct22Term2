import { useContext, useEffect } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export const initialThemeState = {
  theme: "light",
  successColor: "green",
  errorColor: "red",
  warningColor: "yellow",
};

export const themeReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_STATE": {
      const savedState = localStorage.getItem("theme");
      if (savedState) {
        return { ...state, ...JSON.parse(savedState) };
      } else {
        return { ...state };
      }
    }
    case "SET_THEME": {
      return { ...state, theme: action.theme };
    }
    case "TOGGLE": {
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    }
    case "SAVE_STATE": {
      localStorage.setItem("theme", JSON.stringify(state));
      return state;
    }
    case "CLEAR_LOCAL": {
      localStorage.removeItem("theme");
      return state;
    }
    default: {
      return state;
    }
  }
};

const useTheme = () => {
  const { state, dispatch } = useContext(ThemeContext);

  const setDarkMode = () => dispatch({ type: "SET_THEME", theme: "dark" });

  const setLightMode = () => dispatch({ type: "SET_THEME", theme: "light" });

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE" });
  };

  const clearLocalStorage = () => dispatch({ type: "CLEAR_LOCAL" });

  useEffect(() => {
    const savedItem = JSON.parse(localStorage.getItem("thisCart")) || false;

    console.log(savedItem);
  }, [dispatch]);

  return {
    theme: state.theme,
    setDarkMode,
    setLightMode,
    toggleTheme,
    clearLocalStorage,
  };
};

export default useTheme;
