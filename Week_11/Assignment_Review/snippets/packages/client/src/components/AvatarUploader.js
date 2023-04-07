import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "utils/axiosConfig";
import LoadingSpinner from "./LoadingSpinner";

const AvatarUploader = ({ custom, setCustom }) => {
  const [file, setFile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("imgUpload", file);

    axios
      .post("/files", formData)
      .then((res) => {
        console.log(res);
        setCustom(res.data.path);
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  console.log(custom);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  return (
    <>
      {custom ? (
        <Form.Text>
          <a className="dummy-link" onClick={() => setCustom()}>
            Choose a different file.
          </a>
        </Form.Text>
      ) : (
        <>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="file">Upload a File</Form.Label>
            <Form.Control
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Button
            variant="secondary"
            type="button"
            disabled={!file || isSubmitting}
            onClick={handleFileUpload}
          >
            {isSubmitting ? <LoadingSpinner /> : "Upload"}
          </Button>
        </>
      )}
    </>
  );
};

export default AvatarUploader;
