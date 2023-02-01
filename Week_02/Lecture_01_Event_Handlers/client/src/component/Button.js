import React from "react";

const Button = (props) => {
  const alertMeNow = (e) => {
    console.log(e);
    alert(`Hello, ${props.name}!`);
  };

  return <button onClick={alertMeNow}>{props.children}</button>;
};

export default Button;
