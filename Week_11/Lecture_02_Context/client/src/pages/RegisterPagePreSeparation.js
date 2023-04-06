import { useReducer } from "react";
import { Button, Container, Form } from "react-bootstrap";
import api, { setAuthHeader } from "../config/api.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialState = {
  data: { ...initialFields },
  isSubmitting: false,
  errors: { ...initialFields },
};

/**
 * State type for react forms
 * @typedef FormState
 * @property {object} data - Form data
 * @property {boolean} isSubmitting - Submission status
 * @property {object} errors - Error data regarding the form data
 */

/**
 * Reducer to manage form-based state. Uses a logic tree
 * to determine how to change state. The conditional logic compares
 * the action type to a set of named actions (strings)
 * @param {FormState} state - All data needed for a basic form
 * @param {object} action - The type of action being dispatched and any needed data
 */
const formReducer = (state, action) => {
  // Make a copy of state (this is technically optional)
  const stateCopy = { ...state };
  // Let's define the logic tree for how state should be modified
  switch (action.type) {
    case "SUBMISSION_START": {
      // Make the changes to state
      stateCopy.isSubmitting = true;
      stateCopy.errors = { ...initialFields };
      // And return them
      return stateCopy;
    }
    case "INPUT_CHANGE": {
      stateCopy.data[action.property] = action.value;
      return stateCopy;
    }
    case "RESPONSE_SUCCESS": {
      stateCopy.data = { ...initialFields };
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

const RegisterPage = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();

  const { data, isSubmitting, errors } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Let's replace the setState calls with an action to dispatch
    // setIsSubmitting(true);
    // setErrors(initialState);
    dispatch({
      type: "SUBMISSION_START",
      // In this case, because the same changes will happen 100% of the time,
      // there's no need for any additional information
    });

    try {
      const response = await api.post("/auth/signup", data);
      setAuthHeader(response.token); // This is for authentication and doesn't affect state
      toast.success(`Welcome, ${response.user.firstName}`);
      // Let's migrate the state functionality to a dispatch action
      // setIsSubmitting(false);
      // setNewUser(initialState);
      dispatch({
        type: "RESPONSE_SUCCESS",
        // Again, the only changes in state needed are consistent 100% of the time
      });

      navigate("/");
    } catch (error) {
      // And let's migrate our errors
      // setErrors(error.errors);
      // setIsSubmitting(false);
      // What kind of action might this be? It happens when the submission fails, so...
      dispatch({
        type: "RESPONSE_ERROR",
        // We'll set isSubmitting to false, so no need for anything there
        // But we do want to set the errors that we receive
        errors: error,
      });
    }
  };

  const handleChange = (e) => {
    // setNewUser({
    //   ...newUser,
    //   [e.target.name]: e.target.value,
    // });
    // Let's think reducers! How could we define this action?
    dispatch({
      type: "INPUT_CHANGE",
      // What information is needed for this action?
      property: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <Container>
      <h1>Create an Account With Us!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            type="text"
            id="firstName"
            name="firstName"
            value={data.firstName}
            isInvalid={errors.firstName}
            onChange={handleChange}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName}
            isInvalid={errors.lastName}
            onChange={handleChange}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            id="email"
            name="email"
            value={data.email}
            isInvalid={errors.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={data.password}
            isInvalid={errors.password}
            onChange={handleChange}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={data.confirmPassword}
            isInvalid={errors.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Sign Up
          </Button>
        </Form.Group>
        <Form.Text>
          Already have an account? <Link to="/signin">Sign in.</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default RegisterPage;
