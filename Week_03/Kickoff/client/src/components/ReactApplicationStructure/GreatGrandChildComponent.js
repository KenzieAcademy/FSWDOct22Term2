import React from "react";

const GreatGrandChildComponent = ({ data, setData }) => {
  const handleChange = (e) => {
    setData(e.target.value);
  };

  return (
    <div>
      <strong> This is the great grandchild component</strong>
      <p>Data from props: {data}</p>
      <label>
        Input for the Data in State:
        <input type="text" name="data" onChange={handleChange} />
      </label>
    </div>
  );
};

export default GreatGrandChildComponent;
