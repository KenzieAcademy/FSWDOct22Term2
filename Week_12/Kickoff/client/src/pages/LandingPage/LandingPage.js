import React from "react";
import { Container } from "react-bootstrap";
import useTheme from "../../hooks/useTheme";

const LandingPage = () => {
  const { theme } = useTheme();
  return <Container></Container>;
};

export default LandingPage;
