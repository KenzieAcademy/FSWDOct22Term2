import { useState } from "react";
import CollapsableSection from "../CollapsableSection";
import ChildComponentOne from "./ChildComponentOne";

const DrillingProps = ({ data, setData }) => {
  return (
    <CollapsableSection title="Drilling Props">
      <ChildComponentOne data={data} setData={setData} />
    </CollapsableSection>
  );
};

export default DrillingProps;
