import React, { useState } from "react";
import CollapsableSection from "../CollapsableSection";
import DrillingProps from "./DrillingProps";
import LiftingState from "./LiftingState";

const ReactApplicationStructure = () => {
  const [data, setData] = useState("");
  return (
    <div className="container">
      <CollapsableSection title="React Application Structure">
        <DrillingProps data={data} setData={setData} />
        <LiftingState data={data} />
      </CollapsableSection>
    </div>
  );
};

export default ReactApplicationStructure;
