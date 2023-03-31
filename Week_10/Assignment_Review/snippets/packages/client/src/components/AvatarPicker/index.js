import "./AvatarPicker.css";
import { Form } from "react-bootstrap";

const AvatarPicker = ({ imgs, selected, setSelected }) => {
  return (
    <Form.Group>
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
      </div>
    </Form.Group>
  );
};

export default AvatarPicker;
