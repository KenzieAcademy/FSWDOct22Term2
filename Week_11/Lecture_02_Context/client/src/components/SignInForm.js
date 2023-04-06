import React from "react";
import { Form, Button } from "react-bootstrap";
import useForms from "../hooks/useForms";

const SignInForm = ({
  signIn,
  onSuccess = () => {},
  onError = (err) => {},
}) => {
  const {
    data,
    errors,
    handleInputChange,
    disableSubmitButton,
    enableSubmitButton,
    displayErrors,
    isSubmitting,
  } = useForms({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    disableSubmitButton();
    signIn(data.email, data.password)
      .then((response) => {
        enableSubmitButton();
        onSuccess(response);
      })
      .catch((error) => {
        enableSubmitButton();
        displayErrors(error);
        onError(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="text"
          id="email"
          name="email"
          value={data.email}
          isInvalid={errors.email}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          autoComplete="off"
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-2">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Sign In
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SignInForm;
