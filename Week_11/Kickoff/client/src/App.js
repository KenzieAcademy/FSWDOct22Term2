import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { themeContext } from "./providers/ThemeProvider";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const { theme } = useContext(themeContext);
  return (
    <Container id="app-wrap" fluid className={`theme-bg-${theme}`}>
      <Header />
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="dashboard/:uid" element={<Dashboard />} />
        <Route path="signup" element={<RegisterPage />} />
      </Routes>
    </Container>
  );
}

export default App;
