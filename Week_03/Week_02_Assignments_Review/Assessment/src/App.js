import ListItem from "./Components/ListItem";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Shopping List:</h1>
      <ol>
        <ListItem name="Buffalo wings" amount={24} />
        <ListItem name="Mozzarella Sticks" amount={10} />
        <ListItem name="Beer" amount={6} />
      </ol>
    </div>
  );
}

export default App;
