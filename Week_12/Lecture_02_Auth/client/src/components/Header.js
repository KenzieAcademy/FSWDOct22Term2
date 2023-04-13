import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar expand="md" variant="dark" bg="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">
          End of an Era: Term 2 Final Lecture
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header-nav" />
        <Navbar.Collapse id="header-nav">
          <Nav className="ms-auto"></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
