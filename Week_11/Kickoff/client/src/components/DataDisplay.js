import React from "react";
import { Container } from "react-bootstrap";
import DataCard from "./DataCard";

const DataDisplay = ({ data }) => {
  return (
    <Container>
      {data.map((info) => (
        <DataCard key={info._id} info={info} />
      ))}
    </Container>
  );
};

export default DataDisplay;
