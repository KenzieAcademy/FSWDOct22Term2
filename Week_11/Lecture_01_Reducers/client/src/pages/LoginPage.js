import { Button, Container, Form } from "react-bootstrap";
import { setAuthHeader } from "../config/api.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useForms from "../hooks/useForms";

const LoginPage = () => {
  const { data, isSubmitting, errors, dispatchSubmit, dispatchInputChange } =
    useForms({
      email: "",
      password: "",
    });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatchSubmit("/auth/signin", data);

      toast.success("Welcome, " + response.user.firstName);
      setAuthHeader(response.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => dispatchInputChange(e.target);

  return (
    <Container>
      <h1>Create an Account With Us!</h1>
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
