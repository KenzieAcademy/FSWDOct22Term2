import { useEffect, useState } from "react";
import heroApi from "../utils/heroApi.config";
import { Button, Container, Modal } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const HeroesDashboard = () => {
  const [heroes, setHeroes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [heroToDelete, setHeroToDelete] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const openDeleteModal = (e, hero) => {
    e.preventDefault();
    setShowModal(true);
    setHeroToDelete(hero);
  };
  const closeDeleteModal = () => {
    setShowModal(false);
    setHeroToDelete();
  };

  const deleteHero = async (id) => {
    setIsSubmitting(true);

    try {
      // Send a DELETE request to delete the object from the "database"
      const response = await heroApi.delete(
        `/heroes/${id}` //,
        // { data: { thisWouldBe: "req.body.thisWouldBe in express" } }
      );

      // Handle the modal
      closeDeleteModal();
      // Notify the user of a successful deletion
      toast.success(`Successfully deleted ${heroToDelete.name}`);
      // Update the DOM to reflect this deletion
      setHeroes(heroes.filter((hero) => hero.id !== id));
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      closeDeleteModal();
    }
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
                <a href="#" onClick={(e) => openDeleteModal(e, hero)}>
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete{" "}
            {heroToDelete ? heroToDelete.name : ""}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteHero(heroToDelete.id)}>
            {isSubmitting ? <LoadingSpinner /> : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HeroesDashboard;
