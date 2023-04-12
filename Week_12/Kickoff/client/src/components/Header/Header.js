import { useEffect, useState } from "react";
import { Navbar, Nav, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  /**
   * Honestly, don't ask me why this was needed, I couldn't tell you. React
   * Bootstrap just wasn't cooperating with the switch showing the correct
   * position
   */
  const [switchToggleState, setSwitchToggleState] = useState(theme === "dark");
  useEffect(() => {
    setSwitchToggleState(theme === "dark");
  }, [theme]);

  return (
    <Navbar bg={theme} variant={theme} expand="md" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Week 12 Kickoff
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="ko-nav" />
        <Navbar.Collapse id="ko-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="ms-auto">
            <Nav.Link className="d-flex">
              <Form.Label htmlFor="switchToggleState">
                Light&nbsp;&nbsp;
              </Form.Label>
              <Form.Switch
                id="switchToggleState"
                checked={switchToggleState}
                onChange={toggleTheme}
              />
              <span>Dark</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
