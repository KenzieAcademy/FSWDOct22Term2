import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ auth, logout }) => {
  const { isAuthenticated, user } = auth;
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Reduce, Reuse, Recycle!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="reduce-nav" />
        <Navbar.Collapse id="reduce-nav">
          {isAuthenticated ? (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Dashboard
                </Nav.Link>
              </Nav>
              <Nav className="ms-auto">
                <NavDropdown
                  title={user.firstName + " " + user.lastName[0] + "."}
                  id="nav-drop-down"
                >
                  <NavDropdown.Item as={Link} to={`/u/${user._id}`}>
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item variant="info" onClick={logout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/signup">
                Create Account
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
