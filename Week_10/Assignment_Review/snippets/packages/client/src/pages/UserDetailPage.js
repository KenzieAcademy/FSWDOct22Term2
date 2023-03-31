import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Figure } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner, Post } from "components";
import { useProvideAuth } from "hooks/useAuth";
import { useRequireAuth } from "hooks/useRequireAuth";
import axios from "utils/axiosConfig.js";
import { toast } from "react-toastify";
import AvatarPicker from "components/AvatarPicker";

const initialData = {
  password: "",
  confirm_password: "",
  current_password: "",
  isSubmitting: false,
  errorMessage: null,
};

let imgs = [
  "bird.svg",
  "dog.svg",
  "fox.svg",
  "frog.svg",
  "lion.svg",
  "owl.svg",
  "tiger.svg",
  "whale.svg",
];

const UserDetailPage = () => {
  const { state } = useProvideAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAvatarChange, setOpenAvatarChange] = useState(false);
  const [profileImage, setProfileImage] = useState(state.user.profile_image);
  const [data, setData] = useState(initialData);

  let navigate = useNavigate();
  let params = useParams();
  const {
    state: { isAuthenticated },
  } = useRequireAuth();

  console.log(profileImage);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await axios.get(`users/${params.uid}`);
        setUser(userResponse.data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    isAuthenticated && getUser();
  }, [params.uid, isAuthenticated]);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    // handle invalid or empty form
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    try {
      // write code to call edit user endpoint 'users/:id'
      const {
        user: { uid, username },
      } = state;
      console.log(uid);

      const response = await axios.put(`/users/${uid}`, {
        password: data.password,
        current_password: data.current_password,
      });
      console.log(response);
      setValidated(false);
      toast.success("Password updated!");
      // don't forget to update loading state and alert success
      setData(initialData);
      setOpen(false);
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      });
      console.log(error);
      // toast.error(error.message);
    }
  };

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
    });
    try {
      const {
        user: { uid, username },
      } = state;
      const response = await axios.put(`/users/${uid}/avatar`, {
        profileImage: profileImage,
      });

      console.log(response);

      setData({
        ...data,
        isSubmitting: false,
      });
      toast.success("Avatar successfully updated.");
      setOpenAvatarChange(false);
    } catch (error) {
      toast.error(error);
    }
  };

  if (!isAuthenticated) {
    return <LoadingSpinner full />;
  }

  if (loading) {
    return <LoadingSpinner full />;
  }

  return (
    <>
      <Container className="clearfix">
        <Button
          variant="outline-info"
          onClick={() => {
            navigate(-1);
          }}
          style={{ border: "none", color: "#E5E1DF" }}
          className="mt-3 mb-3"
        >
          Go Back
        </Button>
        <Card bg="header" className="text-center">
          <Card.Body>
            <Figure
              className="bg-border-color rounded-circle overflow-hidden my-auto ml-2 p-1"
              style={{
                height: "50px",
                width: "50px",
                backgroundColor: "white",
              }}
            >
              <Figure.Image src={user.profile_image} className="w-100 h-100" />
            </Figure>
            <Card.Title>{params.uid}</Card.Title>
            <Card.Text>
              {user.email ? user.email : "No Email Provided"}
            </Card.Text>
            {state.user.username === params.uid && (
              <>
                <div
                  onClick={() => setOpenAvatarChange(!openAvatarChange)}
                  style={{ cursor: "pointer", color: "#BFBFBF" }}
                >
                  Edit Profile Image
                </div>
                <div
                  onClick={() => setOpen(!open)}
                  style={{ cursor: "pointer", color: "#BFBFBF" }}
                >
                  Edit Password
                </div>
              </>
            )}
            {openAvatarChange && (
              <Container animation="false">
                <div className="row justify-content-center p-4">
                  <div className="col text-center">
                    <Form onSubmit={handleUpdateAvatar}>
                      <AvatarPicker
                        imgs={imgs}
                        selected={profileImage}
                        setSelected={setProfileImage}
                      />
                      <Button type="submit" variant="primary" className="mt-5">
                        Update
                      </Button>
                    </Form>
                  </div>
                </div>
              </Container>
            )}
            {open && (
              <Container animation="false">
                <div className="row justify-content-center p-4">
                  <div className="col text-center">
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleUpdatePassword}
                    >
                      <Form.Group>
                        <Form.Label htmlFor="password">New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          required
                          minLength={8}
                          maxLength={20}
                          value={data.password}
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          New Password is required and must be between 8 and 20
                          characters
                        </Form.Control.Feedback>
                        <Form.Text id="passwordHelpBlock" muted>
                          Must be 8-20 characters long.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="confirm_password">
                          Confirm New Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="confirm_password"
                          required
                          value={data.confirm_password}
                          onChange={handleInputChange}
                          pattern={data.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          Passwords must match
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="current_password"
                          required
                          value={data.current_password}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      {data.errorMessage && (
                        <span className="form-error">{data.errorMessage}</span>
                      )}
                      <Button type="submit" disabled={data.isSubmitting}>
                        {data.isSubmitting ? <LoadingSpinner /> : "Update"}
                      </Button>
                    </Form>
                  </div>
                </div>
              </Container>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Container className="pt-3 pb-3">
        {user.posts.length !== 0 ? (
          user.posts.map((post) => (
            <Post key={post._id} post={post} userDetail />
          ))
        ) : (
          <div
            style={{
              marginTop: "75px",
              textAlign: "center",
            }}
          >
            No User Posts
          </div>
        )}
      </Container>
    </>
  );
};

export default UserDetailPage;
