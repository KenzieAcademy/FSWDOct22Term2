import React from "react";

const LiftingState = ({ data }) => {
  return (
    <div>
      <h2>Lifting State</h2>
      <p>
        By defining state in a shared parent component, and drilling the value
        and/or the setState function, calling the setState function in that
        other grandchild component will modify the state everywhere
      </p>
      <p>
        Don't believe me? Check out the value in state from the parent
        component: {data}
      </p>
    </div>
  );
};

export default LiftingState;
