import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home, User, Users, Navigation } from "./Components";
import users from "./users";
import "./App.css";

const App = () => {
  const [state, setState] = useState(users);

  return (
    <div className="App">
      <Navigation state={state} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users state={state} />}>
          <Route path=":id" element={<User state={state} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
