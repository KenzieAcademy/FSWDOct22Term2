import React from "react";

const PlayerDetail = ({ player }) => {
  if (!player) return <></>;

  return (
    <div>
      <h4>
        #{player.jerseyNum} {player.firstName} {player.lastName}
      </h4>
      <p>DOB: {player.birthday}</p>
      <p>Pos: {player.position}</p>
      <p>Status: {player.isInjured ? "INJURED" : "HEALTHY"}</p>
    </div>
  );
};

export default PlayerDetail;
