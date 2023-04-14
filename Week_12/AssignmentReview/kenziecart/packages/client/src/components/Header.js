import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Badge, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons/faShoppingBag";
import { useUI, useProvideCart } from "hooks";
import CartSidebar from "components/CartSidebar";
import { useCurrency } from "hooks/useCurrency";
export default function Header() {
  const { openSidebar } = useUI();
  const { state } = useProvideCart();
  const { symbol, toggleCurrency } = useCurrency();

  return (
    <>
      <CartSidebar />
      <Navbar expand="md" style={{ backgroundColor: "#1D3868" }}>
        <Navbar.Brand>
          <LinkContainer to={"/"}>
            <Nav.Link>
              <img src="/logo.png" alt="logo" width="142px" />
            </Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ml-auto mr-5 gap-2"
            style={{ justifyContent: "center" }}
          >
            <div className="d-flex align-items-center text-white mr-4">
              <span className="bold">$&nbsp;&nbsp;</span>
              <Form.Switch
                id="currency"
                checked={symbol === "€"}
                onChange={toggleCurrency}
              />
              <span className="bold">€</span>
            </div>
            <LinkContainer
              className="d-flex align-items-center"
              to={`/`}
              style={{ color: "white", marginRight: "20px" }}
            >
              <Nav.Link>Shop</Nav.Link>
            </LinkContainer>
            <div
              className="d-flex align-items-center ml-1"
              onClick={openSidebar}
              style={{ color: "white", cursor: "pointer", marginRight: "20px" }}
            >
              Cart
              <FontAwesomeIcon
                className="ml-2 mb-1"
                icon={faShoppingBag}
                style={{ color: "white" }}
              />
              {state.itemCount > 0 && (
                <Badge pill variant="primary" className="mb-4 mr-2">
                  <p className="mb-0">{state.itemCount}</p>
                </Badge>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
