import { useState } from "react";
import "./App.css";
import AddPlayerForm from "./components/AddPlayerForm";
import Team from "./components/Team";

const initialNewPlayerData = {
  firstName: "",
  lastName: "",
  jerseyNum: 0,
  birthday: "",
  position: "QB",
  isInjured: false,
};

function App() {
  const [newPlayerData, setNewPlayerData] = useState(initialNewPlayerData);
  const [players, setPlayers] = useState([]);

  const addPlayerToRoster = (player) => {
    // 1. Make a copy
    const playersCopy = [...players];
    // 2. Modify the copy
    const id = players.length === 0 ? 1 : players[players.length - 1].id + 1;
    const newPlayer = {
      id,
      ...player,
    };
    playersCopy.push(newPlayer);
    // 3. Pass the copy into setState
    setPlayers(playersCopy);
    resetForm();
  };

  const submitNewPlayerForm = (e) => {
    e.preventDefault();

    addPlayerToRoster(newPlayerData);
  };

  const resetForm = () => {
    setNewPlayerData(initialNewPlayerData);
  };

  return (
    <div className="container row" style={{ paddingTop: "100px" }}>
      <Team players={players} />
      <AddPlayerForm
        data={newPlayerData}
        setData={setNewPlayerData}
        resetForm={resetForm}
        handleSubmit={submitNewPlayerForm}
      />
    </div>
  );
}

export default App;
