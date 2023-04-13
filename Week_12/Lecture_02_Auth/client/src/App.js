import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages";
import { Header } from "./components";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
