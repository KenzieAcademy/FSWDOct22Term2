import AvatarUploader from "components/AvatarUploader";
import "./AvatarPicker.css";
import { Form } from "react-bootstrap";
import { useState } from "react";

const AvatarPicker = ({ imgs, selected, setSelected }) => {
  const [customAvatar, setCustomAvatar] = useState();

  return (
    <>
      <Form.Group className="mb-2">
        <Form.Label>Choose Your Avatar</Form.Label>
        <div className="d-flex justify-content-evenly avatar-options">
          {imgs.map((avatar) => (
            <img
              className={`selectable-avatar ${
                `/${avatar}` === selected ? "selected" : ""
              }`}
              key={avatar}
              src={`/${avatar}`}
              alt={avatar}
              onClick={() => setSelected(`/${avatar}`)}
            />
          ))}
          {customAvatar && (
            <img
              className={`selectable-avatar ${
                customAvatar === selected ? "selected" : ""
              }`}
              src={customAvatar}
              alt={customAvatar}
              onClick={() => setSelected(customAvatar)}
            />
          )}
        </div>
        <Form.Text>-- OR --</Form.Text>
      </Form.Group>
      <AvatarUploader custom={customAvatar} setCustom={setCustomAvatar} />
    </>
  );
};

export default AvatarPicker;
