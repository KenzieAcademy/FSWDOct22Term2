import logo from "./logo.svg";
import "./App.css";
import ThemeProvider from "./providers/ThemeProvider";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Routes>
        <Route path="" element={<LandingPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
