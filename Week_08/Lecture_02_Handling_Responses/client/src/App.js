import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateHero from "./pages/CreateHero";
import HeroDetails from "./pages/HeroDetails";
import HeroesDashboard from "./pages/HeroesDashboard";
import UpdateHero from "./pages/UpdateHero";

function App() {
  return (
    <Container>
      <Routes>
        {/* GET / DELETE request */}
        <Route path="heroes" element={<HeroesDashboard />} />
        {/* GET / DELETE request */}
        <Route path="heroes/:id" element={<HeroDetails />}>
          {/* PUT request */}
          <Route path="edit" element={<UpdateHero />} />
        </Route>
        {/* POST request */}
        <Route path="heroes/create" element={<CreateHero />} />
      </Routes>
    </Container>
  );
}

export default App;
