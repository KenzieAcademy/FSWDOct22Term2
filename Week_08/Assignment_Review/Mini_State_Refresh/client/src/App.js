import { useState } from "react";
import "./App.css";

const initialData = ["Hello", "Darkness", "My", "Old", "Friend"];

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const [x, setX] = useState(10);
  const [y, setY] = useState(0);

  const handleChange = (e) => {
    let newSearch = e.target.value;

    setSearch(newSearch); // setState functions are asynchronous

    setData(
      initialData.filter((str) =>
        str.toLowerCase().includes(newSearch.toLowerCase())
      )
    );
  };

  const addInASec = () => {
    setTimeout(() => {
      setX((x) => x + 5);
    }, 1000);
  };

  const addToYXTimes = () => {
    for (let i = 0; i < x; i++) {
      setY((y) => y + 5);
    }
    console.log(y);
  };

  return (
    <div className="App">
      <div>
        <p>x: {x}</p>
        <button onClick={addInASec}>Add 5 in 1 Second</button>
      </div>
      <div>
        <p>y: {y}</p>
        <button onClick={addToYXTimes}>Add 5 to y {x} times</button>
      </div>
      <div>
        <span>Search: </span>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
        />
      </div>
      <ul>
        {data.map((str, i) => (
          <li key={i}>{str}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
