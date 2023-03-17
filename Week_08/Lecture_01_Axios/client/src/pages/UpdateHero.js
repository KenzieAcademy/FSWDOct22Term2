import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import heroApi from "../utils/heroApi.config";

const initialState = {
  name: "",
  alias: "",
};

const UpdateHero = () => {
  const [heroName, setHeroName] = useState("");
  const [data, setData] = useState(initialState);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(data);
    const response = await heroApi.put(`/heroes/${id}`, data);

    console.log(response);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    heroApi.get(`/heroes/${id}`).then((data) => {
      setData(data);
      setHeroName(data.name);
    });
  }, [id]);

  return (
    <Container>
      <h2>Update {heroName}</h2>
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

export default UpdateHero;
