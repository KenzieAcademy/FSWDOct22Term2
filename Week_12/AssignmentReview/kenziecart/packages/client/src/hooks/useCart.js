import React, { useReducer, useContext, useEffect, createContext } from "react";

const initialState = {
  cart: [],
  itemCount: 0,
  cartTotal: 0,
};

export const calculateCartTotal = (cartItems) => {
  let total = 0;

  cartItems.map((item) => (total += item.price * item.quantity));

  return parseFloat(total.toFixed(2));
};

const reducer = (state, action) => {
  let nextCart = [...state.cart];
  switch (action.type) {
    case "ADD_ITEM":
      const existingIndex = nextCart.findIndex(
        (item) => item._id === action.payload._id
      );

      const numItemsToAdd = action.payload.quantity;

      if (existingIndex >= 0) {
        const newQuantity = parseInt(
          nextCart[existingIndex].quantity + numItemsToAdd
        );

        nextCart[existingIndex] = {
          ...action.payload,
          quantity: newQuantity,
        };
      } else {
        nextCart.push(action.payload);
      }

      return {
        ...state,
        cart: nextCart,
        itemCount: state.itemCount + numItemsToAdd,
        cartTotal: calculateCartTotal(nextCart),
      };
    case "REMOVE_ITEM":
      nextCart = nextCart
        .map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        cart: nextCart,
        itemCount: state.itemCount > 0 ? state.itemCount - 1 : 0,
        cartTotal: calculateCartTotal(nextCart),
      };
    case "REMOVE_ALL_ITEMS":
      let quantity = state.cart.find((i) => i._id === action.payload).quantity;
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
        itemCount: state.itemCount > 0 ? state.itemCount - quantity : 0,
      };
    case "RESET_CART":
      return { ...initialState };
    case "INIT_SAVED_CART": {
      return action.payload;
    }
    case "UPDATE_SAVED_CART": {
      localStorage.setItem("KenzieCart", JSON.stringify(state));
      return { ...state };
    }
    case "DELETE_SAVED_CART": {
      localStorage.removeItem("KenzieCart");
      return { ...state };
    }
    case "APPLY_COUPON": {
      return { ...state, code: action.code, discount: action.discount };
    }
    default:
      return state;
  }
};

const cartContext = createContext();

// Provider component that wraps your app and makes cart object ...
// ... available to any child component that calls useCart().
export function ProvideCart({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  //  Check for saved local cart on load and dispatch to set initial state
  // useEffect(() => {
  //   const savedCart = JSON.parse(localStorage.getItem("KenzieCart")) || false;
  //   if (savedCart) {
  //     dispatch({
  //       type: "INIT_SAVED_CART",
  //       payload: savedCart,
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("KenzieCart", JSON.stringify(state));
  // }, [state]);

  return (
    <cartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

// Hook for child components to get the cart object ...
// ... and re-render when it changes.
export const useCart = () => {
  return useContext(cartContext);
};

// Provider hook that creates cart object and handles state
const useProvideCart = () => {
  const { state, dispatch } = useCart();

  const addItem = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
    dispatch({
      type: "UPDATE_SAVED_CART",
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
    dispatch({
      type: "UPDATE_SAVED_CART",
    });
  };

  const removeAllItems = (id) => {
    dispatch({
      type: "REMOVE_ALL_ITEMS",
      payload: id,
    });
    dispatch({
      type: "UPDATE_SAVED_CART",
    });
  };

  const resetCart = () => {
    dispatch({
      type: "RESET_CART",
    });
    dispatch({
      type: "DELETE_SAVED_CART",
    });
  };

  const isItemInCart = (id) => {
    return !!state.cart.find((item) => item._id === id);
  };

  const applyCoupon = (code, discount) => {
    dispatch({
      type: "APPLY_COUPON",
      code,
      discount,
    });
  };

  // useEffect(() => {
  //   localStorage.setItem("KenzieCart", JSON.stringify(state));
  // }, [state]);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("KenzieCart")) || false;
    if (JSON.stringify(state) === JSON.stringify(initialState))
      if (savedCart) {
        dispatch({
          type: "INIT_SAVED_CART",
          payload: savedCart,
        });
      }
  }, [dispatch]);

  return {
    state,
    addItem,
    removeItem,
    removeAllItems,
    resetCart,
    isItemInCart,
    applyCoupon,
  };
};

export default useProvideCart;
