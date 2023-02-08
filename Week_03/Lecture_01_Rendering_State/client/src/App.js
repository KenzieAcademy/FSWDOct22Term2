import { useState } from "react";
import "./App.css";
import {
  ArraysInState,
  ConditionalRendering,
  ObjectsInState,
  RenderingArrays,
} from "./components";

function App() {
  const [pages, setPages] = useState([
    {
      id: 1,
      text: "Conditional Rendering",
      component: <ConditionalRendering />,
      isActive: false,
    },
    {
      id: 2,
      text: "Rendering Arrays",
      component: <RenderingArrays />,
      isActive: false,
    },
    {
      id: 3,
      text: "Arrays in State",
      component: <ArraysInState />,
      isActive: false,
    },
    {
      id: 4,
      text: "Objects in State",
      component: <ObjectsInState />,
      isActive: false,
    },
  ]);

  const handleSetActiveTab = (e) => {
    // 1. Make a copy
    const newPages = [...pages];
    // 2. Modify
    console.log(typeof e.target.value);
    newPages.forEach(
      (page) => (page.isActive = page.id === Number(e.target.value))
    );
    // 3. Pass into setState
    setPages(newPages);
  };

  const activePage = pages.find((page) => page.isActive);

  return (
    <div className="App">
      <div className="tabs">
        {pages.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${tab.isActive ? "active" : ""}`}
            value={tab.id}
            onClick={handleSetActiveTab}
          >
            {tab.text}
          </button>
        ))}
      </div>
      {activePage && activePage.component}
    </div>
  );
}

export default App;
