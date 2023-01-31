import React from "react";

const Section = (props) => {
  return (
    <section style={{ borderColor: props.borderColor }}>
      {props.children}
    </section>
  );
};

export default Section;
