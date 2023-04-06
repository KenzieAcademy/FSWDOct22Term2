import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
// Step 3A: Import the context you wish to consume
import AuthContext from "../contexts/AuthContext";

const Header = () => {
  // Step 3B: Consume the context
  const { isAuthenticated, user, signOut } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to={isAuthenticated ? "/dashboard" : "/"}>
          Reduce, Reuse, Recycle!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="reduce-nav" />
        <Navbar.Collapse id="reduce-nav">
          {isAuthenticated ? (
            <>
              <Nav>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
              </Nav>
              <Nav className="ms-auto">
                <NavDropdown title={`${user.firstName} ${user.lastName[0]}.`}>
                  <NavDropdown.Item as={Link} to="/preferences">
                    Preferences
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signOut}>Log Out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/signin">
                Sign In
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
