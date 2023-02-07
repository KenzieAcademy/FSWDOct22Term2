import { useState } from "react";
import CollapsableSection from "../CollapsableSection";

const initialData = [
  {
    id: 22,
    name: "Cody",
    likesReact: true,
  },
  {
    id: 97,
    name: "Jon",
    likesReact: true,
  },
  {
    id: 124,
    name: "Navya",
    likesReact: false,
  },
];

const RenderingArrays = () => {
  const [data, setData] = useState(initialData);
  let message = "Hello";
  let num = 10;
  let bool = true;
  let obj = {
    name: "Cody",
    likesReact: true,
  };

  let stringArr = ["Hello", "darkness", "my", "old", "friend"];

  return (
    <CollapsableSection title="Rendering Arrays">
      <p>This is a string variable: {message}</p>
      <p>This is a number: {num}</p>
      <p>This is a boolean: {bool}</p>
      <p>
        You can render <em>almost</em> anything in JSX, but not{" "}
        <strong>everything</strong>. So what can you render, and what can you
        not?
      </p>
      <h4>Things you can render inline</h4>
      <ul>
        <li>Strings</li>
        <li>Numbers</li>
        <li>HTML/JSX elements</li>
        <li>An array that contains any of the above</li>
      </ul>
      <h4>Things you cannot render inline</h4>
      <ul>
        <li>Booleans</li>
        <li>Objects</li>
      </ul>
      <p>Objects won't render either.</p>
      <p>
        But arrays will (as long as the elements inside are strings, numbers, or
        HTML/JSX elements)
      </p>
      <p>String Array: {stringArr}</p>
      <p>Number Array: {[1, 2, 3, 4, 5]}</p>
      <p>
        HTML/JSX Array: {[<span>Hello</span>, <p>Darkness</p>, <h5>My</h5>]}
      </p>
      <ul>
        {data.map((obj) => (
          <li key={`user_${obj.id}`}>
            <p>Name: {obj.name}</p>
            <p>Likes React: {obj.likesReact ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </CollapsableSection>
  );
};

export default RenderingArrays;
