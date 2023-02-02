import { PlayerCard } from "./components";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>State and Props!</h1>
      <div className="card-tray">
        <PlayerCard
          name="Jalen Hurts"
          imgUrl="https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4040715.png"
          age={25}
          isInSuperbowl={true}
        />
        <PlayerCard
          name="Patrick Mahomes"
          imgUrl="https://a.espncdn.com/i/headshots/nfl/players/full/3139477.png"
          age={27}
          isInSuperbowl={false}
        />
        <PlayerCard
          name="Travis Kelce"
          imgUrl="https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/15847.png"
          age={33}
          isInSuperbowl={false}
        />
        <PlayerCard
          name="Jason Kelce"
          imgUrl="https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/14124.png"
          age={35}
          isInSuperbowl={true}
        />
      </div>
    </div>
  );
}

export default App;
