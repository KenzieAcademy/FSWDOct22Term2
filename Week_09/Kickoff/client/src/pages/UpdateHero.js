import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import heroApi from "../utils/heroApi.config";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const UpdateHero = ({ hero, setHero, cancelEdit }) => {
  const [data, setData] = useState(hero);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await heroApi.put(`/heroes/${id}`, data);
      setHero(response);
      cancelEdit();
      toast.success(`Success! ${data.name} has been updated!`);
    } catch (error) {
      toast.error("Something went wrong, refresh the page and try again.");
    }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   heroApi.get(`/heroes/${id}`).then((data) => {
  //     setData(data);
  //     setHeroName(data.name);
  //   });
  // }, [id]);

  return (
    <Container>
      <h2>Update {hero.name}</h2>
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
        <Form.Group>
          <Button type="button" variant="secondary" onClick={cancelEdit}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner /> : "Submit"}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default UpdateHero;
