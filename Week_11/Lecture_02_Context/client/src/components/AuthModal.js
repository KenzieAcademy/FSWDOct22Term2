import { Modal } from "react-bootstrap";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
import useAuthModal from "../hooks/useAuthModal";

const AuthModal = ({ isAuthenticated, show, hide, signUp, signIn }) => {
  const { action, handleClose, handleSuccess } = useAuthModal(
    isAuthenticated,
    hide
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {action === "signup" ? "Create an Account" : "Sign In"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {action === "signin" && (
          <SignInForm signIn={signIn} onSuccess={handleSuccess} />
        )}
        {action === "signup" ? (
          <SignUpForm signUp={signUp} onSuccess={handleSuccess} />
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        {action === "signin" ? (
          <>
            Don't have an account? <Link to="#signup">Sign up.</Link>
          </>
        ) : (
          <>
            Already have an account? <Link to="#signin">Sign in.</Link>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
