import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostPreview from "../components/PostPreview";
import api from "../utils/api.config";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then((response) => setPosts(response.data));
  }, []);

  return (
    <Container>
      {posts.map((post) => (
        <PostPreview key={post._id} post={post} />
      ))}
    </Container>
  );
};

export default Feed;
