import "./PlayerCard.css";
import { useState } from "react";

const PlayerCard = ({ name, imgUrl, age, isInSuperbowl }) => {
  // The useState hook accepts an initial value (a.k.a. what you wish to initialize the value of state as)
  // and returns 2 items in an array:
  //  1. The first is the variable that the state value is stored in
  //  2. The second is the functio that is used to change that value.
  const [about, setAbout] = useState("");
  const [superBowlBound, setSuperBowlBound] = useState(isInSuperbowl);

  const sendThemToTheSuperBowl = (e) => {
    let newValue = !superBowlBound;

    setSuperBowlBound(newValue);
  };

  // ternary operators are like inline if else statements
  const textToShow = superBowlBound ? "YES" : "NO";

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    // set the value taken from the form textbox, and store it as the new
    // value of about in state

    // The setState function provided by useState should accept the new value
    // that you wish to assign to the state variable in essence
    setAbout(form.about.value);
  };

  return (
    <div className="player-card">
      <h3>{name}</h3>
      <img className="player-pic" src={imgUrl} alt={name} />
      <ul className="player-info">
        <li>
          <strong>Age:</strong> {age}
        </li>
        <li>
          <button onClick={sendThemToTheSuperBowl}>{textToShow}</button>
        </li>
        <li></li>
      </ul>
      <div className="about-section">
        <p>{about}</p>
        <form onSubmit={handleSubmit}>
          <textarea name="about" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default PlayerCard;
