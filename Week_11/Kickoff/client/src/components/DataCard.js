import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { themeContext } from "../providers/ThemeProvider";

const DataCard = ({ info }) => {
  const { theme } = useContext(themeContext);
  return (
    <Card variant={theme} bg={theme}>
      <Card.Header>
        <Card.Title>{info.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{info.text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </Card.Footer>
    </Card>
  );
};

export default DataCard;
