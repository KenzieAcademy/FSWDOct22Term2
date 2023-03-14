import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

const User = ({ state }) => {
  const [user, setUser] = useState({});

  const params = useParams();

  useEffect(() => {
    setUser(state.find((user) => user.id === Number(params.id)));
  }, [params.id]);

  return (
    <Card className="user">
      <Card.Header>{user.username}</Card.Header>
      <Card.Body>
        Favorites:
        <ul>
          <li>Color: {user.favoriteColor}</li>
          <li>Food: {user.favoriteFood} </li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default User;
