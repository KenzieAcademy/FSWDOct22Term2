import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../utils/api.config";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    api.get(`/posts/${postId}`).then((response) => setPost(response.data));
  }, [postId]);

  return (
    <Container>
      <h2>Posted by {post.poster}</h2>
    </Container>
  );
};

export default PostDetails;
