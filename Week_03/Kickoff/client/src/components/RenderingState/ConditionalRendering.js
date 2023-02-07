import { useState } from "react";
import CollapsableSection from "../CollapsableSection";

const ConditionalRendering = () => {
  const [paragraphHideMessage, setParagraphHideMessage] =
    useState("Hide the Paragraph");

  const breakTheButtonFeature = () =>
    setParagraphHideMessage("Oh no! Our button! It's broken!");

  const conditionalMethodOneDemo = (
    <p>This is defined before the previous paragraph was rendered.</p>
  );

  const showOneOrOther = () => {
    const now = new Date();
    if (now.getMinutes() % 2 === 0) {
      return conditionalMethodOneDemo;
    } else {
      return <p>That other paragraph only shows up during even minutes.</p>;
    }
  };

  return (
    <CollapsableSection title="Conditional Rendering">
      <p>
        One of the major benefits of a front-end framework like React is that we
        have the ability to dynamically render data "on the fly."
      </p>
      <p>
        We're also able to conditionally render anything. There are several
        different options to conditionally change what's on the page:
      </p>
      <ul>
        <li>
          You can pre-determine what's going to appear by adding logic to the
          component prior to the return
        </li>
        <li>
          You can use a <code>ternary operator</code> within the body of the JSX
        </li>
        <li>
          You can use other logical statements, such as <code>&&</code> (and),
          or <code>||</code> (or)
        </li>
      </ul>
      <div className="flex-col">
        <button onClick={breakTheButtonFeature}>{paragraphHideMessage}</button>
        {paragraphHideMessage === "Hide the Paragraph" ? (
          <p>
            For example, this paragraph will ONLY appear if the button above
            reads "Hide the Paragraph"
          </p>
        ) : (
          <p>The button must not read "Hide the Paragraph"</p>
        )}
      </div>
      <br />
      <p className={5 === 5 && "yes"}>
        Alternatively, you can pre-define a chunk of JSX before the return
        statement. The paragraph below is rendered using this method.
      </p>
      {showOneOrOther()}
      <p>
        The next word will change based on whether 5 + 5 = 10:
        {5 + 5 === 10 && <span> Yes</span>}
      </p>{" "}
      <p>The next word will change based on whether 5 - 5 is not 10:</p>
      <p>{5 - 5 === 10 || <span>&nbsp;No</span>}</p>
      <p>
        Ternary with a render on true but nothing on false:
        {5 % 2 === 0 ? "Yes" : ""}
      </p>
    </CollapsableSection>
  );
};

export default ConditionalRendering;
