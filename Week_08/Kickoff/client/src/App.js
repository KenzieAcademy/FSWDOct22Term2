import { useEffect, useState } from "react";
import "./App.css";
import pokeApi from "./utils/pokeApi.config";

function App() {
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    // fetch("https://pokeapi.co/api/v2/pokemon/pikachu", { method: "GET" })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("***** FETCH RESPONSE DATA *****");
    //     console.log(data);
    //     console.log("*******************************");
    //   });

    // First key difference between axios and fetch: you must know what type of
    // HTTP request to send as the different request types have an associated method
    pokeApi
      .get("/pokemon")
      // Second major difference: axios automatically converts the response body to json,
      // and sets it as the data property of the response object
      .then((data) => {
        // console.log("***** AXIOS RESPONSE DATA *****");
        // console.log(response.data);
        // console.log("*******************************");
        setPokemon(data);
      });
  }, []);

  console.log(pokemon);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.results &&
            pokemon.results.map((data, i) => (
              <tr key={i}>
                <td>{data.url.split("/")[data.url.split("/").length - 2]}</td>
                <td>{data.name[0].toUpperCase() + data.name.slice(1)}</td>
                <td>
                  <button>Show Entry</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
