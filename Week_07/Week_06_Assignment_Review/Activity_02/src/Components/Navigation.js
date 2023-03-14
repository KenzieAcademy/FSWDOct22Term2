import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = ({ state }) => {
  return (
    <Navbar>
      <Navbar.Brand>React Router Practice</Navbar.Brand>
      <Nav>
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <NavDropdown title="Users">
            {state.map((user) => (
              <NavDropdown.Item key={user.id}>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
