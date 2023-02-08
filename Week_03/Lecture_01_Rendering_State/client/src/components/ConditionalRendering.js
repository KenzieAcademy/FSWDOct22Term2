import { useState } from "react";

const ConditionalRendering = () => {
  const [isValid, setIsValid] = useState(true);
  const [inputValue, setInputValue] = useState("");

  // If I want to store a value in a variable, but its value
  // will start as something different based on a condition,
  // this can be clunky using if/else statements
  const myNum = "hello".length > 3 ? "hello".length : 0;

  return (
    <div>
      <p>
        <strong>Conditional Rendering</strong> is when you do or do not render
        some element based on a logical condition. Alternatively, you can
        conditionally render one element instead of another based on a logical
        condition.
      </p>
      <h2>Ternary Operators</h2>
      <p>
        Generally, conditional rendering is handled in the form of{" "}
        <code>ternary operators</code>. A <code>ternary operator</code> is
        similar to an if/else statement. It differs in that the ternary operator
        is an expression.
      </p>
      <p>
        A <code>ternary expression</code> <strong>MUST</strong> include three
        (thus ternary) operands:
      </p>
      <ol>
        <li>
          The condition: the first operand of the ternary operator should be a
          conditional statement. This condition is followed by a <code>?</code>
        </li>
        <li>
          The truthy resolution: the second operand of the ternary operator
          should be an expression to execute upon a truthy resolution of the
          condition (the condition would be something like <code>true</code>,{" "}
          <code>1</code>, or the existence of some value). The second operand is
          followed by a <code>:</code>
        </li>
        <li>
          The falsey resolution: the third operand of the ternary operator
          should be an expression to execute upon a falsey resolution of the
          condition (the condition would resolve to something like{" "}
          <code>false</code>, 0, null, undefined, or <code>""</code>).
        </li>
      </ol>
      <p>
        So within the confines of a rendered component, we'll use a ternary
        operator to determine which thing should be rendered based on the
        condition.
      </p>
      <div>
        <h4>Example: Input validation</h4>
        <p>
          The following input can be modified. As you modify the input, it will
          be validated. The validation constraint is that the value must be a
          number.
        </p>
        <input
          type="text"
          name="num"
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue !== "" && isNaN(inputValue) ? (
          <span className="text-danger">The input value must be a number.</span>
        ) : (
          <></>
        )}
      </div>
      <div>
        <h2>Logical Operators</h2>
        <p>
          A <code>Logical Operator</code> is like a ternary operator, but it's
          just 2 conditions. The Logical operators in JavaScript that can be
          used to conditionally render are:
        </p>
        <ul>
          <li>
            <strong>Logical AND (&&)</strong> - Within React, using a &&
            operator will only render the 2nd "condition" if the first is true.
            <br />
            <strong>Example:</strong> {"hello".length > 10 && "Hello!"}.
            <br />
            The reason this works is not so much because it's designed to, but
            because React will <strong>NOT</strong> render a boolean, and
            logical operators resolve to true or false.
          </li>
          <li>
            <strong>Logical OR (||)</strong> - Similar to the && operator. If
            the first condition is <strong>NOT</strong> true, the expression
            after the || operand will be rendered.
            <br />
            <strong>Example:</strong> {"hello".length > 3 || "Nope"}
          </li>
        </ul>
        <p>
          Note that you can effectively use these logical operators
          interchangeably by just using a NOT (!) operator.
        </p>
        <p>
          <strong>Example:</strong> {"hello".length === 3 || "Hello"} is the
          same as {"hello".length !== 3 && "Hello"}
        </p>
      </div>
    </div>
  );
};

export default ConditionalRendering;
