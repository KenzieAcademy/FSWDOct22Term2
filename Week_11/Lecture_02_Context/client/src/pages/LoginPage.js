import { Button, Container, Form } from "react-bootstrap";
import { setAuthHeader } from "../config/api.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useForms from "../hooks/useForms";
// Step 3A: Import the Context
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

const LoginPage = () => {
  const {
    data,
    isSubmitting,
    errors,
    dispatchSubmit,
    dispatchSubmitSuccess,
    dispatchSubmitError,
    dispatchInputChange,
  } = useForms({
    email: "",
    password: "",
  });
  // Step 3B: Consume the context
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchSubmit();

    signIn(data.email, data.password)
      .then((_) => {
        dispatchSubmitSuccess();
        navigate("/dashboard");
      })
      .catch((error) => {
        dispatchSubmitError(error);
        toast.error(
          "Something went wrong. Check the error messages and try again."
        );
      });
  };

  const handleChange = (e) => dispatchInputChange(e.target);

  return (
    <Container>
      <h1>Sign In!</h1>
      <Form onSubmit={handleSubmit}>
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
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Sign In
          </Button>
        </Form.Group>
        <Form.Text>
          Don't have an account? <Link to="/signup">Create an account.</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default LoginPage;
