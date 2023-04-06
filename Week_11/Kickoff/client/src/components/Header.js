import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import { useContext } from "react";
import { themeContext } from "../providers/ThemeProvider";

const Header = () => {
  // Step 3: Consume the context wherever needed
  const { theme, toggleTheme } = useContext(themeContext);

  return (
    <Navbar variant={theme} bg={theme} expand="md" collapseOnSelect>
      <Container>
        <Navbar.Brand>Week 11 Kickoff</Navbar.Brand>
        <Navbar.Toggle aria-controls="kickoff-header-nav" />
        <Navbar.Collapse id="kickoff-header-nav">
          <Nav className="me-auto">
            <Nav.Item className="d-flex justify-content-between nav-link">
              Light&nbsp;&nbsp;
              <Form.Switch onChange={toggleTheme} />
              Dark
            </Nav.Item>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/signin">
              Sign In
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Create Account
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
