import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useForms from "../hooks/useForms";
import { setAuthHeader } from "../config/api.config";

const RegisterPage = () => {
  const { data, isSubmitting, errors, dispatchSubmit, dispatchInputChange } =
    useForms({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatchSubmit("/auth/signup", data);
      toast.success("Welcome, " + response.user.firstName);
      setAuthHeader(response.token);
      navigate("/");
    } catch (error) {
      toast.error(
        "Something went wrong. Check the error messages and try again."
      );
    }
  };

  const handleChange = (e) => dispatchInputChange(e.target);

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
