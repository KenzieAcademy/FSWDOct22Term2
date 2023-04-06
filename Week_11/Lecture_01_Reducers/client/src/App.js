import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { setAuthHeader } from "./config/api.config";
import { Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "./pages";

const initialAuth = {
  isAuthenticated: false,
  user: null,
};

function App() {
  const [auth, setAuth] = useState(initialAuth);

  const logout = () => {
    setAuthHeader();
    setAuth(initialAuth);
  };

  return (
    <>
      <Header auth={auth} logout={logout} />
      {auth.isAuthenticated ? (
        <Routes></Routes>
      ) : (
        <Routes>
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
