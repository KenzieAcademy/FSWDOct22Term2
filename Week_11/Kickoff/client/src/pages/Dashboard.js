import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DataDisplay from "../components/DataDisplay";

const Dashboard = () => {
  const allData = [
    {
      _id: "98hsdifjhlkjfasdf",
      name: "Lime Guy",
      text: "He can't hold all those limes!",
    },
    {
      _id: "ashdfj823asljdf",
      name: "Bunnicula",
      text: "He vants to drink your V8 vegetable juice!",
    },
  ];
  return (
    <Container>
      <DataDisplay data={allData} />
    </Container>
  );
};

export default Dashboard;
