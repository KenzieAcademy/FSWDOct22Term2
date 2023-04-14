const { createContext, useReducer, useContext, useEffect } = require("react");

const currencyContext = createContext();

const currencyStateOptions = {
  $: {
    symbol: "€",
    multiplier: 0.8,
  },
  "€": {
    symbol: "$",
    multiplier: 1,
  },
};

const initialState = {
  symbol: "$",
  multiplier: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENCY": {
      return {
        symbol: action.symbol,
        multiplier: action.multiplier,
      };
    }
    case "TOGGLE_CURRENCY": {
      return currencyStateOptions[state.symbol];
    }
    default: {
      return state;
    }
  }
};
const ProvideCurrency = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedCurrency =
      JSON.parse(localStorage.getItem("KenzieCurrency")) || false;

    if (savedCurrency) {
      dispatch({
        type: "SET_CURRENCY",
        symbol: savedCurrency.symbol,
        multiplier: savedCurrency.multiplier,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("KenzieCurrency", JSON.stringify(state));
  }, [state]);

  return (
    <currencyContext.Provider value={{ state, dispatch }}>
      {children}
    </currencyContext.Provider>
  );
};

export const useCurrency = () => {
  const { state, dispatch } = useContext(currencyContext);

  const toggleCurrency = () => dispatch({ type: "TOGGLE_CURRENCY" });

  // const setDollar = () => {
  //   dispatch({
  //     type: "SET_CURRENCY",
  //     symbol: "$",
  //     multiplier: 1,
  //   });
  // };

  // const setEuro = () => {
  //   dispatch({
  //     type: "SET_CURRENCY",
  //     symbol: "€",
  //     multiplier: 0.8,
  //   });
  // };

  const getPrice = (price) => {
    return `${state.symbol}${(price * state.multiplier).toFixed(2)}`;
  };

  return {
    ...state,
    toggleCurrency,
    getPrice,
  };
};

export default ProvideCurrency;
