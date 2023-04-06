import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const useSignUp = () => {
  const { signUp, signIn } = useContext(AuthContext);
};

export default useSignUp;
