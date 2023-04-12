import { useContext, useEffect } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

/**
 * sessionStorage also has a method called
 * .getItem()
 *
 * sessionStorage.getItem() accepts just 1 argument:
 *  1. key: string - the name of the value you wish to
 *    pull from sessionStorage. This value must match
 *    the value used when the data was stored initially
 *
 * If the data stored in sessionStorage was serialized
 * (i.e. it was an object, so you had to convert it to
 * a string), you will likely want to deserialize it.
 */
const storedVal = sessionStorage.getItem("theme");
const firstVisitState = {
  theme: "light",
  successColor: "green",
  errorColor: "red",
  warningColor: "yellow",
};

export const initialThemeState = storedVal
  ? JSON.parse(storedVal) // Notice how we use JSON.parse() to deserialize the object
  : firstVisitState;

export const themeReducer = (state, action) => {
  switch (action.type) {
    case "SET_DARK": {
      return { ...state, theme: "dark" };
    }
    case "SET_LIGHT": {
      return { ...state, theme: "light" };
    }
    case "TOGGLE": {
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    }
    case "UPDATE_SESSION": {
      /**
       * To set data into session storage, use the sessionStorage
       * object that JavaScript has built in, and call the .setItem()
       * method.
       *
       * sessionStorage.setItem() accepts 2 arguments:
       *  1. key: string - the name that will be used to access the data
       *  2. value: string - the actual data you wish to save
       *
       * You *can* store an object in both local and session storage, but
       * it must be serialized to a string
       */
      sessionStorage.setItem("theme", JSON.stringify(state));
      return { ...state };
    }
    case "CLEAR_SESSION": {
      /**
       * To delete an item stored in sessionStorage, use the
       * .removeItem() method.
       *
       * sesionStorage.removeItem() accepts 1 argument:
       *  1. key: string - The key of the value you wish to
       *    delete from sessionStorage
       */
      sessionStorage.removeItem("theme");
      return { ...firstVisitState };
    }
    default: {
      return { ...state };
    }
  }
};

const useTheme = () => {
  const { state, dispatch } = useContext(ThemeContext);

  const setDarkMode = () => dispatch({ type: "SET_DARK" });

  const setLightMode = () => dispatch({ type: "SET_LIGHT" });

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE" });
  };

  const updateSessionStorage = () => dispatch({ type: "UPDATE_SESSION" });

  const clearSessionStorage = () => dispatch({ type: "CLEAR_SESSION" });

  useEffect(() => {
    updateSessionStorage();
  }, [state.theme]);

  return {
    theme: state.theme,
    setDarkMode,
    setLightMode,
    toggleTheme,
    clearSessionStorage,
  };
};

export default useTheme;
