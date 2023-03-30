import React from "react";
import { Card } from "react-bootstrap";

const PostPreview = ({ post }) => {
  return (
    <Card>
      <Card.Body>
        <img
          src={`http://localhost:3001/${post.url}`}
          alt={`Post by ${post.poster}`}
        />
      </Card.Body>
      <Card.Text>by {post.poster}</Card.Text>
    </Card>
  );
};

export default PostPreview;
