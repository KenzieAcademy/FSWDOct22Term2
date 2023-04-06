import React from "react";
import { Form, Button } from "react-bootstrap";
import useForms from "../hooks/useForms";

const SignUpForm = ({
  signUp,
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    disableSubmitButton();
    signUp(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.confirmPassword
    )
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
        <Form.Label htmlFor="firstName">First Name</Form.Label>
        <Form.Control
          type="text"
          id="firstName"
          name="firstName"
          value={data.firstName}
          isInvalid={errors.firstName}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
        <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
        <Form.Control
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={data.confirmPassword}
          isInvalid={errors.confirmPassword}
          onChange={handleInputChange}
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
    </Form>
  );
};

export default SignUpForm;
