import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import heroApi from "../utils/heroApi.config";

const initialState = {
  name: "",
  alias: "",
};

const CreateHero = () => {
  const [data, setData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await heroApi.post("/heroes", data);

    console.log(response);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <h2>Create a New Hero</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            name="alias"
            value={data.alias}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default CreateHero;
