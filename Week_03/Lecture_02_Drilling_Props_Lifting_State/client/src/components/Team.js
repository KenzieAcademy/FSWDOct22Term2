import Roster from "./Roster";
import PlayerDetail from "./PlayerDetail";
import { useState } from "react";

const Team = ({ players }) => {
  const [playerToShow, setPlayerToShow] = useState();

  const selectPlayer = (id) => {
    const player = players.find((p) => p.id === id);
    setPlayerToShow(player);
  };

  return (
    <div className="container flex-between team">
      <Roster players={players} selectPlayer={selectPlayer} />
      <PlayerDetail player={playerToShow} />
    </div>
  );
};

export default Team;
