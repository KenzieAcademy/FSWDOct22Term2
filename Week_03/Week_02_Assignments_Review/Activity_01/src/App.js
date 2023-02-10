// Import your component here
import "./App.css";
import ReusableComponent from "./ReusableComponent";

function App() {
  return (
    <div>
      <h1>React Coasters</h1>
      <ReusableComponent
        name="The Incredible Hulk"
        height={112}
        topSpeed={67}
        imgUrl="https://www.coaster101.com/wp-content/uploads/2015/08/Hulk1.jpg"
      />
      <ReusableComponent
        name="Velocicoaster"
        height={155}
        topSpeed={70}
        imgUrl="https://www.tripsavvy.com/thmb/9X5xlI-zgeiIRUGbaP2Qk7WnHQs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/JurassicWorldVelociCoasterUniversalOrlando-b495a4606df54b60898fea75b293af34.jpeg"
      />
      <ReusableComponent
        name="Dueling Dragons (Dragon Challenge)"
        height={125}
        topSpeed={60}
        imgUrl="https://i.ytimg.com/vi/0A1dNiNOjPE/hqdefault.jpg"
      />
    </div>
  );
}

export default App;
