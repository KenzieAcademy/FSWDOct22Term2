import { useReducer } from "react";
import api from "../config/api.config";

const formReducer = (state, action) => {
  // Make a copy of state (this is technically optional)
  const stateCopy = { ...state };
  // Let's define the logic tree for how state should be modified
  switch (action.type) {
    case "SUBMISSION_START": {
      // Make the changes to state
      stateCopy.isSubmitting = true;
      stateCopy.errors = action.initialFields;
      // And return them
      return stateCopy;
    }
    case "INPUT_CHANGE": {
      stateCopy.data = { ...stateCopy.data, [action.property]: action.value };
      return stateCopy;
    }
    case "RESPONSE_SUCCESS": {
      stateCopy.data = action.initialFields;
      stateCopy.isSubmitting = false;
      return stateCopy;
    }
    case "RESPONSE_ERROR": {
      stateCopy.errors = { ...stateCopy.errors, ...action.errors };
      stateCopy.isSubmitting = false;
      return stateCopy;
    }
    case "RESET_FORM": {
      return action.initialState;
    }
    default:
      throw Error("Unknown action:" + action.type);
  }

  // See switchDescription.md for information about switch cases
};

const useForms = (initialFields) => {
  const initialState = {
    data: { ...initialFields },
    isSubmitting: false,
    errors: { ...initialFields },
  };
  const [state, dispatch] = useReducer(formReducer, initialState);

  const disableSubmitButton = () =>
    dispatch({
      type: "SUBMISSION_START",
      initialFields,
    });
  const enableSubmitButton = () =>
    dispatch({
      type: "RESPONSE_SUCCESS",
      initialFields,
    });
  const displayErrors = (error) =>
    dispatch({
      type: "RESPONSE_ERROR",
      errors: error,
    });

  const handleInputChange = (e) => {
    dispatch({
      type: "INPUT_CHANGE",
      property: e.target.name,
      value: e.target.value,
    });
  };

  const resetForm = () =>
    dispatch({
      type: "RESET_FORM",
      initialState,
    });

  return {
    data: state.data,
    isSubmitting: state.isSubmitting,
    errors: state.errors,
    disableSubmitButton,
    handleInputChange,
    displayErrors,
    enableSubmitButton,
    resetForm,
  };
};

export default useForms;
