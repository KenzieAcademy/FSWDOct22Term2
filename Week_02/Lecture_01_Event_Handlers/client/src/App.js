import "./App.css";
import Button from "./component/Button";
import Form from "./component/Form";

function App() {
  return (
    <div
      className="container"
      onWheel={() => alert("Nothing more to see, stop scrolling")}
    >
      <Button name="Cody">Click Me!</Button>
      <Form />
    </div>
  );
}

export default App;
