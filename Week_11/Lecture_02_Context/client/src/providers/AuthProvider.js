import { useState } from "react";
import api, { setAuthHeader } from "../config/api.config";

// Step 2A: Import the Context
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";

// Ensure that the children are passed along;
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  const navigate = useNavigate();

  const signUp = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  ) =>
    new Promise(async (resolve, reject) =>
      api
        .post("/auth/signup", {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        })
        .then(({ token, user }) => {
          logInUser(token, user);
          resolve({ token, user });
        })
        .catch((error) => reject(error))
    );

  const signIn = async (email, password) =>
    new Promise(async (resolve, reject) =>
      api
        .post("/auth/signin", {
          email,
          password,
        })
        .then(({ token, user }) => {
          logInUser(token, user);
          resolve({ token, user });
        })
        .catch((error) => reject(error))
    );

  const logInUser = (token, user) => {
    setAuthHeader(token);
    setIsAuthenticated(true);
    setUser(user);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setAuthHeader();
    setUser();
    navigate("/signin");
  };

  const openSignInPopup = () => setDisplayModal(true);
  const closeSignInPopup = () => setDisplayModal(false);

  const promptSignIn = () => openSignInPopup();
  // Step 2B: Provide the Context and the value
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signOut, signUp, promptSignIn }}
    >
      <AuthModal
        isAuthenticated={isAuthenticated}
        show={displayModal}
        hide={closeSignInPopup}
        signUp={signUp}
        signIn={signIn}
      />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
