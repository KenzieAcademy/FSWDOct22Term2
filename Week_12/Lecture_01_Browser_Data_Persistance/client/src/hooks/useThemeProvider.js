import { useContext, useEffect } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const useThemeProvider = () => {
  const { state, dispatch } = useContext(ThemeContext);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      dispatch({ type: "LOAD_STATE" });
    }
  }, []);

  useEffect(() => {
    if (state.theme) {
      dispatch({ type: "SAVE_STATE" });
    }
  }, [state]);

  return;
};

export default useThemeProvider;
