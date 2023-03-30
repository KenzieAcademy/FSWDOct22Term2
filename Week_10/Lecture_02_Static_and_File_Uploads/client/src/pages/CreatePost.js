import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import api from "../utils/api.config";
import { useNavigate } from "react-router-dom";

const initialData = {
  poster: "",
  url: "",
  caption: "",
};

const CreatePost = () => {
  const [file, setFile] = useState();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [data, setData] = useState(initialData);

  const navigate = useNavigate();

  /**
   * This function is for submitting the whole post; it should
   * not work if there is not image uploaded   *
   * @param {*} e - The submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post("/posts", data);

    navigate("/");
  };
  /**
   * This will handle the actual upload of the image selected.
   *
   * @param {*} e - The click event (??)
   */
  const handleUpload = async (e) => {
    e.preventDefault();
    // File submissions don't quite work as json. We need to create
    // actual FormData:
    const formData = new FormData();

    // Attach the file to the form data:
    formData.append("postImage", file);

    // Finally, submit the formData as the body of a POST request
    const response = await api.post("/files", formData);
    console.log(response);

    // Because we want to use this url to create a new post, let's set its path
    // as the url of the data in state:
    setData({
      ...data,
      url: response.data.path,
    });

    setFileUploaded(true);
  };

  /**
   * This will handle the changing of the file itself when a user selects the file.
   * @param {*} e - The change event
   */
  const handleFileChange = (e) => {
    // The e.target of a file input is not a simple string/number/boolean/etc.
    // We want to access e.target.files, but just the first one
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {/* Let's create the actual file upload portion first. */}
        <Form.Group className="mb-2">
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control
            type="file"
            name="postImage"
            onChange={handleFileChange}
          />
          <Button type="button" variant="secondary" onClick={handleUpload}>
            Upload Selected Image
          </Button>
          {/* make sure this button is NOT of type submit */}
        </Form.Group>
        {fileUploaded ? (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Poster Name:</Form.Label>
              <Form.Control
                type="text"
                name="poster"
                value={data.poster}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Caption:</Form.Label>
              <Form.Control
                type="textarea"
                name="caption"
                value={data.caption}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        ) : (
          "Upload image to continue."
        )}
        <Form.Group className="mb-2">
          <Button type="submit" disabled={!fileUploaded} variant="primary">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default CreatePost;
