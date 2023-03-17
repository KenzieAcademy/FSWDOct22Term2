import { useEffect, useState } from "react";
import heroApi from "../utils/heroApi.config";
import { Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const HeroesDashboard = () => {
  const [heroes, setHeroes] = useState([]);
  useEffect(() => {
    // send an HTTP request to the server to retrieve all heroes
    heroApi.get("/heroes").then((data) => {
      // Because axios automatically converts the response to JSON,
      // we only need a single .then() when using promise syntax.
      // Additionally, the response data itself is set as the value of the
      // .data property of the response object.
      // console.log(response.data);

      setHeroes(data);
    });
  }, []);

  const deleteHero = async (e, id) => {
    e.preventDefault();
    // Send a DELETE request to delete the object from the "database"
    const response = await heroApi.delete(
      `/heroes/${id}` //,
      // { data: { thisWouldBe: "req.body.thisWouldBe in express" } }
    );

    console.log(response);
  };

  return (
    <Container>
      <h2>Hero Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {heroes.map((hero) => (
            <tr key={hero.id}>
              <td>{hero.name}</td>
              <td>
                <Link to={`/heroes/${hero.id}`}>Details</Link> |{" "}
                <a href="#" onClick={(e) => deleteHero(e, hero.id)}>
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default HeroesDashboard;
