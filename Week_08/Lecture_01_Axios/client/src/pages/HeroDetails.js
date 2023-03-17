import heroApi from "../utils/heroApi.config";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

const HeroDetails = () => {
  const [hero, setHero] = useState({});
  const { id } = useParams();
  useEffect(() => {
    heroApi.get(`/heroes/${id}`).then((data) => setHero(data));
  }, [id]);

  return (
    <Container>
      <h2>{hero.name}</h2>
      <p>a.k.a. {hero.alias}</p>
      <Link to={`/heroes/${id}/edit`}>Edit</Link>
      <Outlet />
    </Container>
  );
};

export default HeroDetails;
