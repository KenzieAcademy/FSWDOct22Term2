import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
const initialCouponState = {
  code: "",
  discount: 0,
};

const CartCoupon = ({ applyCoupon }) => {
  const [state, setState] = useState(initialCouponState);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get("/coupons/verify", { params: { code: state.code } })
      .then((response) => {
        console.log(response.data);
        setState({
          ...state,
          discount: response.data.discount,
        });
        applyCoupon(state.code, response.data.discount);
      })
      .catch((err) => toast.error("Invalid coupon."));
  };

  const resetCoupon = () => {
    setState(initialCouponState);
    setDisabled(true);

    setTimeout(() => setDisabled(false), 100);
  };

  return (
    <Container>
      <Row as={Form} onSubmit={handleSubmit}>
        <Col xs={8} md={6} as={Form.Group}>
          <Form.Label htmlFor="coupon">Coupon</Form.Label>
          {state.discount ? (
            <Form.Text>{state.code.toUpperCase()}</Form.Text>
          ) : (
            <Form.Control
              type="text"
              placeholder="Coupon Code"
              name="code"
              value={state.code}
              onChange={(e) => setState({ ...state, code: e.target.value })}
            />
          )}
        </Col>
        <Col
          as={Form.Group}
          xs={{ offset: 1, span: 3 }}
          md={{ offset: 2, span: 4 }}
          className="d-flex justify-content-end flex-column"
        >
          {state.discount ? (
            <Button type="button" variant="secondary" onClick={resetCoupon}>
              Cancel
            </Button>
          ) : (
            <Button type="submit" variant="info" disabled={disabled}>
              Apply
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartCoupon;
