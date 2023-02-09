import React from "react";

const RosterRow = ({
  id,
  position,
  firstName,
  lastName,
  isInjured,
  selectPlayer,
}) => {
  const handleSelectPlayer = (e) => {
    selectPlayer(id);
  };
  return (
    <tr key={id}>
      <td>{position}</td>
      <td>
        <a onClick={handleSelectPlayer}>
          {firstName} {lastName}
        </a>
      </td>
      <td>{isInjured ? "INJURED" : "HEALTHY"}</td>
    </tr>
  );
};

export default RosterRow;
