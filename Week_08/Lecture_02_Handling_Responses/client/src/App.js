import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CreateHero from "./pages/CreateHero";
import HeroDetails from "./pages/HeroDetails";
import HeroesDashboard from "./pages/HeroesDashboard";
import UpdateHero from "./pages/UpdateHero";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        {/* GET / DELETE request */}
        <Route path="heroes" element={<HeroesDashboard />} />
        {/* GET / DELETE request */}
        <Route path="heroes/:id" element={<HeroDetails />} />
        {/* POST request */}
        <Route path="heroes/create" element={<CreateHero />} />
      </Routes>
      <ToastContainer />
    </Container>
  );
}

export default App;
