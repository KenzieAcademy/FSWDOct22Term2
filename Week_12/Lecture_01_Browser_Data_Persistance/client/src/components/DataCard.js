import React from "react";
import { Card } from "react-bootstrap";
import useTheme from "../hooks/useTheme";

const DataCard = ({ theme }) => {
  return (
    <Card bg={theme}>
      <Card.Header>
        <Card.Title>test</Card.Title>
      </Card.Header>
    </Card>
  );
};

export default DataCard;
