import React from "react";
import RosterRow from "./RosterRow";

const Roster = ({ players, selectPlayer }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Pos</th>
          <th>Name</th>
          <th>Injury Status</th>
        </tr>
      </thead>
      <tbody>
        {players.map(({ id, position, firstName, lastName, isInjured }) => (
          <RosterRow
            key={id}
            id={id}
            position={position}
            firstName={firstName}
            lastName={lastName}
            isInjured={isInjured}
            selectPlayer={selectPlayer}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Roster;
