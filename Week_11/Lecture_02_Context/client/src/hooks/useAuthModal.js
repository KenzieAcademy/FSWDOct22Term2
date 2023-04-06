import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getCurrentUrl from "../utils/getCurrentUrl";

const SIGNIN = "signin";
const SIGNUP = "signup";
const TOGGLE = "toggle";
const SET_SIGNIN = "SET_SIGNIN";
const SET_SIGNUP = "SET_SIGNUP";

const reducer = (state, action) => {
  switch (action) {
    case TOGGLE:
      return state === SIGNUP ? SIGNIN : SIGNUP;
    case SET_SIGNIN:
      return SIGNIN;
    case SET_SIGNUP:
      return SIGNUP;
    default:
      return state;
  }
};

const useAuthModal = (isAuthenticated, hide) => {
  const [action, dispatch] = useReducer(reducer, SIGNIN);

  const navigate = useNavigate();

  const toggleAction = () => dispatch(TOGGLE);

  const showSignIn = () => dispatch(SET_SIGNIN);

  const showSignUp = () => dispatch(SET_SIGNUP);

  const handleClose = () => {
    hide();
    if (!isAuthenticated) navigate("/");
  };

  const handleSuccess = (response) => {
    toast.success("Welcome, " + response.user.firstName + "!");
    hide();
    navigate(getCurrentUrl());
  };

  useEffect(() => {
    switch (window.location.hash) {
      case "#signin":
        showSignIn();
        break;
      case "#signup":
        showSignUp();
        break;
      default:
        break;
    }
  }, [window.location.hash]);

  return {
    action,
    toggleAction,
    handleClose,
    handleSuccess,
  };
};

export default useAuthModal;
