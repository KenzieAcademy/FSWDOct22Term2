import React, { useState } from "react";

const CollapsableSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      <div className="row">
        <button onClick={toggleCollapse}>{open ? "Close" : "Open"}</button>
        <h3>{title}</h3>
      </div>
      <div className={`container flex-col ${!open ? "closed" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default CollapsableSection;
