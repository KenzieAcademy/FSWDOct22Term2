import React from "react";
import ConditionalRendering from "./ConditionalRendering";
import RenderingArrays from "./RenderingArrays";
import StateObjects from "./StateObjects";
import CollapsableSection from "../CollapsableSection";

const RenderingState = () => {
  return (
    <div className="container">
      <CollapsableSection title="Rendering State">
        <ConditionalRendering />
        <RenderingArrays />
        <StateObjects />
      </CollapsableSection>
    </div>
  );
};

export default RenderingState;
