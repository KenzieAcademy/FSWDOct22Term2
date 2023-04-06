import axios from "axios";
// To use Reducers, you need several steps:

import { useReducer } from "react";

// Step 1: Define the initial state
const initialState = {
  newUser: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  rememberUser: false,
  errors: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  isSubmitting: false,
};

// Step 2: Define the ways that state can be modified through a reducer function

/**
 * The reducer is really just a logic tree. Based on the provided action type, what
 * needs to be done to modify state? Perform that change, and return the new state.
 * @param {Object<string, any>} state - This is the actual complex state object
 * @param {Object<string, any>} action - Should have at least 1 property (type), with an optional second property (payload)
 */
const reducer = (state, action) => {
  const { type, payload } = action;

  const newState = { ...state };
  // Use a switch statement
  switch (type) {
    case "HANDLE_INPUT_CHANGE":
      newState.newUser[payload.name] = payload.value;
      return newState;
    case "TOGGLE_IS_SUBMITTING":
      newState.isSubmitting = !newState.isSubmitting;
      return newState;
    case "START_SUBMIT":
      newState.isSubmitting = true;
      return newState;
    case "STOP_SUBMIT":
      newState.isSubmitting = false;
      return newState;
    case "TOGGLE_REMEMBER_USER":
      newState.rememberUser = !newState.rememberUser;
      return newState;
    case "SET_ERRORS":
      newState.errors = payload;
      newState.isSubmitting = false;
      return newState;
    case "RESET_STATE":
      return {
        newUser: {
          email: "",
          password: "",
          confirmPassword: "",
        },
        rememberUser: false,
        errors: {
          email: "",
          password: "",
          confirmPassword: "",
        },
        isSubmitting: false,
      };
    default:
      return state;
  }
};

const useRegisterPage = () => {
  // Step 3: Initialize the reducer via the useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) =>
    dispatch({
      type: "HANDLE_INPUT_CHANGE",
      payload: e.target,
    });

  const handleRememberUserChange = (e) =>
    dispatch({ type: "TOGGLE_IS_SUBMITTING" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    startSubmit();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        state.newUser
      );
      console.log(response);
    } catch (error) {
      dispatch({ type: "SET_ERRORS", payload: error.response.data });
    }
  };

  const startSubmit = () => dispatch({ type: "START_SUBMIT" });
  const stopSubmit = () => dispatch({ type: "STOP_SUBMIT" });

  return {
    ...state,
    dispatch,
    handleInputChange,
    handleRememberUserChange,
    handleSubmit,
  };
};

export default useRegisterPage;
