import React from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useUI } from "hooks";
import { useProvideCart, useRouter } from "hooks";
import { CartCoupon, CartList, CartSummary, CheckoutBox } from "components";
import "./CartSidebarView.scss";

const CartSidebarView = () => {
  const { closeSidebar, displaySidebar } = useUI();
  const { state, applyCoupon } = useProvideCart();
  console.log(state);
  const { push } = useRouter();

  const handleClose = () => closeSidebar();
  const handleCheckout = () => {
    closeSidebar();
    push("/checkout");
  };

  return (
    <div className="cart">
      <header className="cart-header">
        {displaySidebar && (
          <Button
            onClick={handleClose}
            aria-label="Close panel"
            className="hover:text-gray-500 transition ease-in-out duration-150"
          >
            <FontAwesomeIcon size="xs" icon={faTimes} />
          </Button>
        )}
      </header>

      {state.cart.length > 0 ? (
        <div className="cart-body">
          <CartList cartItems={state.cart} />
        </div>
      ) : (
        <div className="empty-cart">
          <FontAwesomeIcon size="xs" icon={faShoppingBag} />
          <p>Your shopping cart is empty</p>
        </div>
      )}
      <div className="cart-coupon">
        <CartCoupon applyCoupon={applyCoupon} />
      </div>

      {state.cart.length > 0 && (
        <div className="cart-checkout">
          <CartSummary
            cartTotal={state.cartTotal * (1 - (state.discount || 0))}
          />
          <CheckoutBox
            handleShopping={handleClose}
            handleCheckout={handleCheckout}
          />
        </div>
      )}
    </div>
  );
};

export default CartSidebarView;
