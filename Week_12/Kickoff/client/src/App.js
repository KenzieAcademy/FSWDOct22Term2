import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import ThemeProvider from "./providers/ThemeProvider/ThemeProvider";
import { LandingPage } from "./pages";
import { Container } from "react-bootstrap";

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
