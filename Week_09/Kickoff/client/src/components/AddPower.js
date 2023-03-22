import React, { useState } from "react";
import heroApi from "../utils/heroApi.config";

const AddPower = ({ heroId }) => {
  const [power, setPower] = useState("");

  const handleAdd = async (e) => {
    const updatedHero = await heroApi.put(`/${heroId}/powers`, { power });
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <label>
          New Power:
          <input
            type="text"
            name="power"
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </label>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddPower;
