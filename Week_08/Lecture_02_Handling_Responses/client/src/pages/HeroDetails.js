import heroApi from "../utils/heroApi.config";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import UpdateHero from "./UpdateHero";

const HeroDetails = () => {
  const [hero, setHero] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    heroApi
      .get(`/heroes/${id}`)
      .then((data) => setHero(data))
      .catch((err) => navigate("/heroes"));
  }, [id]);

  const openEditHero = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };
  const closeEditHero = () => {
    setIsEditing(false);
  };

  return (
    <Container>
      <h2>{hero.name}</h2>
      <p>a.k.a. {hero.alias}</p>
      {hero.powers && (
        <>
          <h4>Powers</h4>
          <ul>
            {hero.powers.map((power, i) => (
              <li key={i}>{power}</li>
            ))}
          </ul>
        </>
      )}
      <a href="#" onClick={openEditHero}>
        Edit
      </a>
      {isEditing ? (
        <UpdateHero hero={hero} setHero={setHero} cancelEdit={closeEditHero} />
      ) : (
        ""
      )}
    </Container>
  );
};

export default HeroDetails;
