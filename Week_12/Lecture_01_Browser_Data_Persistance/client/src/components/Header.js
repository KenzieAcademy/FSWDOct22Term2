import { Navbar, Nav, Container, Form, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useThemeProvider from "../hooks/useThemeProvider";

const Header = () => {
  const { theme, toggleTheme, clearLocalStorage } = useTheme();
  useThemeProvider();

  return (
    <Navbar bg={theme} variant={theme} expand="md" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">
          I Will Survive: The Data Persistence Story
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header-nav" />
        <Navbar.Collapse id="header-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <div className="nav-link d-flex">
              <span>Light&nbsp;&nbsp;</span>
              <Form.Check
                type="switch"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <span>Dark</span>
            </div>
            <NavDropdown title="Options">
              <NavDropdown.Item>Placeholder</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={clearLocalStorage}>
                Clear Preferences
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
