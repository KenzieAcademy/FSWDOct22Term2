import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { setAuthHeader } from "./config/api.config";
import { Route, Routes } from "react-router-dom";
import { Dashboard, LandingPage, LoginPage, RegisterPage } from "./pages";

// Step 2A: Import the AuthContext
import AuthContext from "./contexts/AuthContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const logIn = (token, user) => {
    setAuthHeader(token);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logOut = () => {
    setIsAuthenticated(false);
    setAuthHeader();
    setUser();
  };

  return (
    // Step 2B: Provide the AuthContext to the entire app
    // Add a value prop, and provide whatever value(s) you want to provide to any
    // context consumers within the provider
    <AuthContext.Provider value={{ isAuthenticated, user, logIn, logOut }}>
      <Header />
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="" element={<LandingPage />} />
        <Route path="signin" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
