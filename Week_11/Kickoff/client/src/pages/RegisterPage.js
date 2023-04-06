import { Button, Container, Form } from "react-bootstrap";
import useRegisterPage from "../hooks/useRegisterPage";

const RegisterPage = () => {
  const {
    newUser,
    rememberMe,
    isSubmitting,
    errors,
    handleSubmit,
    handleInputChange,
    handleRememberUserChange,
  } = useRegisterPage();

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid" className="text-danger">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid" className="text-danger">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={newUser.confirmPassword}
            onChange={handleInputChange}
            isInvalid={errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid" className="text-danger">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="d-flex justify-content-between">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "wait.." : "Submit"}
          </Button>
          <Form.Check
            label="Remember Me"
            checked={rememberMe}
            onChange={handleRememberUserChange}
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default RegisterPage;
