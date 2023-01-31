import "./App.css";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

function App() {
  let title = "Some title";
  return (
    <div className="App">
      <Section borderColor="red">
        <SectionHeader>{title}</SectionHeader>
        <p>Lebron is a whiny baby</p>
        <p>Go Eagles!</p>
      </Section>
      <Section borderColor="blue"></Section>
    </div>
  );
}

export default App;
