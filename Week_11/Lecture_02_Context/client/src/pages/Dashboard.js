import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
// Step 3A: Import the context:
import AuthContext from "../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  // Step 3B: Consume the context!
  const { isAuthenticated, user, promptSignIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) return promptSignIn();
  }, [isAuthenticated]);

  if (loading) return <Container></Container>;

  return (
    <Container>
      {!isAuthenticated && promptSignIn}
      <h2>Welcome, {user.firstName}</h2>
    </Container>
  );
};

export default Dashboard;
