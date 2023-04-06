import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { setAuthHeader } from "./config/api.config";
import { Route, Routes } from "react-router-dom";
import { Dashboard, LandingPage, LoginPage, RegisterPage } from "./pages";

// Step 3A: Import the AuthProvider
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="signin" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
