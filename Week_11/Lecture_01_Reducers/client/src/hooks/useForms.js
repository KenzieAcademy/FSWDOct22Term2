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
      stateCopy.data[action.property] = action.value;
      return stateCopy;
    }
    case "RESPONSE_SUCCESS": {
      stateCopy.data = action.initialFields;
      stateCopy.isSubmitting = false;
      return stateCopy;
    }
    case "RESPONSE_ERROR": {
      stateCopy.errors = action.errors;
      stateCopy.isSubmitting = false;
      return stateCopy;
    }
    default:
      throw Error("Unknown action:" + action.type);
  }

  // See switchDescription.md for information about switch cases
};

const useForms = (initialFields) => {
  const initialState = {
    data: initialFields,
    isSubmitting: false,
    errors: initialFields,
  };
  const [state, dispatch] = useReducer(formReducer, initialState);

  const dispatchSubmit = (url, data) =>
    new Promise(async (resolve, reject) => {
      dispatch({
        type: "SUBMISSION_START",
        initialFields,
      });

      return api
        .post(url, data)
        .then((response) => {
          dispatch({
            type: "RESPONSE_SUCCESS",
            initialFields,
          });
          resolve(response);
        })
        .catch((error) => {
          dispatch({
            type: "RESPONSE_ERROR",
            errors: error,
          });
          reject(error);
        });
    });

  const dispatchInputChange = ({ name, value }) => {
    dispatch({
      type: "INPUT_CHANGE",
      property: name,
      value: value,
    });
  };

  return {
    data: state.data,
    isSubmitting: state.isSubmitting,
    errors: state.errors,
    dispatchSubmit,
    dispatchInputChange,
  };
};

export default useForms;
