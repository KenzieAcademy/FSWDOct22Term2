import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Media,
  Figure,
  ListGroup,
  Modal,
  OverlayTrigger,
  Tooltip,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProvideAuth } from "hooks/useAuth";
import axios from "utils/axiosConfig.js";
import { timeSince } from "utils/timeSince";
import {
  LoadingSpinner,
  LikeIcon,
  LikeIconFill,
  ReplyIcon,
  TrashIcon,
} from "components";
import "./Post.scss";
import { toast } from "react-toastify";

const initialState = {
  commentText: "",
  isSubmitting: false,
  errorMessage: null,
};

const Post = ({
  post: { _id, author, profile_image, text, comments, created, likes },
  detail,
  userDetail,
}) => {
  const [data, setData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const [stateComments, setStateComments] = useState(comments);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  let navigate = useNavigate();
  const [likesMod, setLikesMod] = useState(likes);
  const {
    state: { user },
  } = useProvideAuth();
  const [likedState, setLiked] = useState(
    likes.some((u) => u._id === user.uid)
  );
  const [likesState, setLikes] = useState(likes.length);
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleToggleLike = async () => {
    if (!likedState) {
      setLiked(true);
      setLikes(likesState + 1);
      setLikesMod([
        {
          _id: user.uid,
          username: user.username,
        },
        ...likes,
      ]);
      try {
        await axios.post(`posts/like/${_id}`);
      } catch (error) {
        console.log(error);
        return error;
      }
    } else {
      setLiked(false);
      setLikes(likesState - 1);
      const [me, ...rest] = likes;
      setLikesMod(rest);
      try {
        await axios.post(`posts/like/${_id}`);
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  // Complete function to call server endpoint /posts/:id
  // with delete request
  const handleDeletePost = async () => {
    setData({
      ...data,
      isSubmitting: true,
    });
    axios
      .delete(`posts/${_id}`, { data: { userId: user.uid } })
      .then(() => {
        setIsDeleted(true);
        closeDeleteModal();
        toast.success("Successfully deleted the post!");
        setData({
          ...data,
          isSubmitting: false,
        });
      })
      .catch((err) => {
        toast.error("Something went wrong, try again later :(");
        setData({
          ...data,
          isSubmitting: false,
        });
      });
  };

  const handleCommentSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      toast.error("Comment text is required");
      setValidated(true);
      return;
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    axios
      .put("/posts/comments", {
        text: data.commentText,
        userId: user.uid,
        postId: _id,
      })
      .then(
        ({ data }) => {
          setData(initialState);
          setStateComments(data.comments);
          setValidated(false);
        },
        (error) => {
          console.log("axios error", error);
        }
      );
  };

  useEffect(() => {
    setStateComments(comments);
  }, [comments]);

  const renderToolTip = (props) => {
    let tooltipMessage =
      likesMod.length > 0
        ? likesMod.length > 3
          ? likesMod
              .sort((a, b) => {
                if (a._id === user.uid) {
                  return -1;
                } else {
                  return 1;
                }
              })
              .filter((_, i) => i < 3)
              .map((u) => (u._id === user.uid ? "You" : u.username))
              .join(", ") + ` and ${likesMod.length - 3} more...`
          : likesMod
              .map((u) => (u._id === user.uid ? "You" : u.username))
              .join(", ")
        : "Nobody has liked this post yet.";

    return <Tooltip {...props}>{tooltipMessage}</Tooltip>;
  };

  return (
    <>
      {isDeleted ? (
        <></>
      ) : (
        <>
          <ListGroup.Item
            className="bg-white text-danger px-3 rounded-edge"
            as={"div"}
            key={_id}
          >
            <Media className="w-100 d-flex gap-3">
              <Figure
                className="mr-4 bg-border-color rounded-circle overflow-hidden ml-2 p-1"
                style={{ height: "60px", width: "60px", marginTop: "0px" }}
              >
                <Link to={`/u/${author.username}`}>
                  <Figure.Image
                    src={author.profile_image}
                    className="w-100 h-100 mr-4"
                  />
                </Link>
              </Figure>
              <Media.Body className="w-100">
                <div className="d-flex align-items-center">
                  <Link
                    to={`/u/${author.username}`}
                    className="text-muted mr-1 username"
                  >
                    @{author.username}
                  </Link>
                  <pre className="m-0 text-muted">{" - "}</pre>
                  <span className="text-muted">{timeSince(created)} ago</span>
                </div>
                <div className="mb-n1 mt-1 position-relative">
                  <blockquote className="mb-1 mw-100">
                    <div className="mw-100 overflow-hidden">{text}</div>
                  </blockquote>
                </div>

                <div className="d-flex justify-content-end align-items-bottom">
                  <div className="d-flex align-items-center">
                    {user.username === author.username && (
                      <Container className="close">
                        <TrashIcon onClick={openDeleteModal} />
                      </Container>
                    )}
                  </div>

                  <div className="d-flex align-items-center mr-2">
                    <Button
                      variant="link"
                      size="md"
                      onClick={() => navigate(`/p/${_id}`)}
                    >
                      <ReplyIcon />
                    </Button>
                    <span>{comments.length > 0 ? comments.length : 0}</span>
                  </div>
                  <div
                    className={`d-flex align-items-center mr-3 ${
                      likedState ? "isLiked" : ""
                    }`}
                  >
                    <Button variant="link" size="md" onClick={handleToggleLike}>
                      {likedState ? <LikeIconFill /> : <LikeIcon />}
                    </Button>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 200 }}
                      overlay={renderToolTip}
                    >
                      <span>{likesState}</span>
                    </OverlayTrigger>
                  </div>
                </div>
              </Media.Body>
            </Media>
            <Modal show={showDeleteModal} onHide={closeDeleteModal}>
              <Modal.Header>
                <Modal.Title>Delete Post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you wish to delete the post by {author.username}?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeDeleteModal}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleDeletePost}>
                  {data.isSubmitting ? <LoadingSpinner /> : "Delete"}
                </Button>
              </Modal.Footer>
            </Modal>
          </ListGroup.Item>
          {detail && (
            <div>
              <br />
              <Form
                noValidate
                validated={validated}
                onSubmit={handleCommentSubmit}
                className="clearfix"
              >
                <Form.Control
                  type="text"
                  size="md"
                  name="commentText"
                  maxLength="120"
                  placeholder="Reply"
                  aria-describedby="comment-input"
                  required
                  value={data.commentText}
                  onChange={handleInputChange}
                />
                <Button className="float-right mt-3" type="submit">
                  Comment
                </Button>
                <Form.Control.Feedback type="invalid" className="text-warning">
                  Comment text is required
                </Form.Control.Feedback>

                {data.errorMessage && (
                  <span className="form-error">{data.errorMessage}</span>
                )}
              </Form>
              {!stateComments.length > 0 ? (
                <div>no comments</div>
              ) : (
                <Container>
                  {stateComments.map((c, index) => (
                    <Row
                      className="row my-3 align-items-center"
                      key={index}
                      style={{ flexWrap: "nowrap" }}
                    >
                      <Col xs={1}>
                        <Figure
                          className="mr-4 bg-white rounded-circle overflow-hidden my-auto ml-2"
                          style={{
                            height: "40px",
                            flexBasis: "40px",
                            minWidth: "40px",
                          }}
                        >
                          <Link to={`/u/${c.author?.username}`}>
                            <Figure.Image
                              src={c.author?.profile_image}
                              style={{ height: "40px", width: "40px" }}
                            />
                          </Link>
                        </Figure>
                      </Col>
                      <Col xs={11} className="d-flex ">
                        <Container>
                          {/* <Row>
                            <Link to={`/u/${c.author.username}`}>
                              @{c.author.username}
                            </Link>
                            - {timeSince(c.created)} ago
                          </Row> */}
                          <div className="d-flex align-items-center">
                            <Link
                              to={`/u/${c.author.username}`}
                              className="text-muted mr-1 username"
                            >
                              @{c.author.username}
                            </Link>
                            <pre className="m-0 text-muted">{" - "}</pre>
                            <span className="text-muted">
                              {timeSince(c.created)} ago
                            </span>
                          </div>
                          <Row>
                            <span>{c.text}</span>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  ))}
                </Container>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Post;
