import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Notstagram</Navbar.Brand>
        <Navbar.Toggle aria-controls="notsta-header" />
        <Navbar.Collapse id="notsta-header">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Feed
            </Nav.Link>
            <Nav.Link as={Link} to="/upload">
              Post
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
