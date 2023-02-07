import React from "react";
import GreatGrandChildComponent from "./GreatGrandChildComponent";

const GrandChildComponent = ({ data, setData }) => {
  return (
    <div>
      <h6>This is the Grandchild Component</h6>
      <GreatGrandChildComponent data={data} setData={setData} />
    </div>
  );
};

export default GrandChildComponent;
