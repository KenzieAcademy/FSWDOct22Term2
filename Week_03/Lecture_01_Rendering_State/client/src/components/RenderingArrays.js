import React from "react";

const RenderingArrays = () => {
  const stringToRender = "Hello, world!";
  const numberToRender = 200;

  const spanTagToRender = (
    <span>
      This is a pre-defined <code>span</code> tag that was initialized before
      the return
    </span>
  );

  const objToRender = {
    name: "Jalen Hurts",
    goingToBe: "Super Bowl Champion",
  };

  const stringsToRender = ["Please", "Excuse", "My", "Dear", "Aunt", "Sally"];

  const liTagsToRender = [
    <li key={`statically_rendered_please`}>Please</li>,
    <li key={`statically_rendered_excuse`}>Excuse</li>,
    <li key={`statically_rendered_my`}>My</li>,
    <li key={`statically_rendered_dear`}>Dear</li>,
    <li key={`statically_rendered_aunt`}>Aunt</li>,
    <li key={`statically_rendered_sally`}>Sally</li>,
  ];

  return (
    <div>
      <div>
        <h2>What CAN be rendered?</h2>
        <p>
          Rendering in React is limited to a combination of the following data
          types:
        </p>
        <ul>
          <li>Strings</li>
          <li>Numbers</li>
          <li>HTML or JSX elements</li>
          <li>Arrays (of any of the previous 3 data types)</li>
        </ul>
        <p>
          For example, if I want to display the value of the{" "}
          <code>stringToRender</code> variable in this component, I'll simply
          wrap the variable name in curly braces like so:
          <br />
          {`{ stringToRender }`}
          <br />
          {stringToRender}
        </p>
        <p>This goes for strings AND numbers: {numberToRender}</p>
        <p>
          HTML and JSX elements (aka other Components) can also be rendered this
          way: {spanTagToRender}
        </p>
        <p>
          You can also render an array of strings or numbers:
          <br />
          Strings: {stringsToRender}
          <br />
          Numbers: {[4, 8, 15, 16, 23, 42, 4]}
        </p>
        <p>
          Rendering arrays is most useful when using an array of HTML and/or JSX
          elements:
        </p>
        <ul>{liTagsToRender}</ul>
        <p>
          We can use higher order functions like <code>.map()</code>,{" "}
          <code>.filter()</code>, etc., to convert data of any type into HTML
          representations of that data. The following list looks the same as the
          previous one, but the array being used is the array of strings:
        </p>
        <ul>
          {stringsToRender.map((str) => (
            <li key={`map_rendered_${str}`}>{str}</li>
          ))}
        </ul>
        <p>
          Below is rendered using the same array as above, but filtered to only
          include strings longer than 3 characters:
        </p>
        <ul>
          {stringsToRender
            .filter((str) => str.length > 3)
            .map((str) => (
              <li key={`filtered_${str}`}>{str}</li>
            ))}
        </ul>
        <p>
          <strong>NOTE:</strong> When using .map() (or evan a pre-defined array)
          to render an array of elements, each element MUST have its own{" "}
          <strong>UNIQUE</strong>
          <code>key</code> attribute. The <code>key</code> attribute is used by
          React to track the DOM element.
        </p>
      </div>
      <div>
        <h2>We CANNOT render</h2>
        <p>
          The following data types cannot be rendered by React. Either it will
          show nothing, or an error will occur and the application will crash:
        </p>
        <ul>
          <li>
            Booleans - the app won't crash, but nothing will show up. This is
            why we can use logical operators like && and || to conditionally
            render.
          </li>
          <li>
            Objects - the app WILL crash if you try to render an object as-is.
            If you wish to display an object, you must either display the
            property values separately, or convert the object to a string
            (JSON.stringify()): {JSON.stringify(objToRender)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RenderingArrays;
