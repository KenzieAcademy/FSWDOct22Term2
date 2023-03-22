import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import heroApi from "../utils/heroApi.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  alias: "",
};

const CreateHero = () => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors((errors) => ({ ...initialState }));

    let isValid = true;
    if (!data.name) {
      isValid = false;
      setErrors((errors) => ({
        ...errors,
        name: "Name is required.",
      }));
    }

    if (!data.alias) {
      isValid = false;
      setErrors((errors) => ({
        ...errors,
        alias: "Alias is required.",
      }));
    }

    if (!isValid) return;

    await heroApi.post("/heroes", data);

    navigate("/heroes");
    toast.success(`Success! ${data.name} has been added.`);
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
          <Form.Text className="text-danger">{errors.name}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Alias</Form.Label>
          <Form.Control
            type="text"
            name="alias"
            value={data.alias}
            onChange={handleChange}
          />
          <Form.Text className="text-danger">{errors.alias}</Form.Text>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default CreateHero;
