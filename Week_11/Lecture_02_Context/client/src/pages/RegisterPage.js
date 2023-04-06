import { Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// Step 3A: Import the context
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import SignUpForm from "../components/SignUpForm";

const RegisterPage = () => {
  // Step 3B: Consume the context
  const { signUp } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleResponse = (_) => {
    navigate("/dashboard");
  };

  return (
    <Container>
      <h1>Create an Account With Us!</h1>
      <SignUpForm signUp={signUp} onSuccess={handleResponse} />
      <Form.Text>
        Already have an account? <Link to="/signin">Sign in.</Link>
      </Form.Text>
    </Container>
  );
};

export default RegisterPage;
