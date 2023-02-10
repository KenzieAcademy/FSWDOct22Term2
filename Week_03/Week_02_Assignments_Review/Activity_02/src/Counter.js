import React, { useState } from "react";

const Counter = ({ count: initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  const [isModified, setIsModified] = useState(false);

  function handleIncrement(event) {
    if (count < 20) setCount(count + 1);
    setIsModified(true);
  }

  function handleDecrement(event) {
    if (count > 0) setCount(count - 1);
    setIsModified(true);
  }

  function resetCounter(event) {
    setCount(initialCount);
    setIsModified(false);
  }

  return (
    <div className="Counter">
      <button onClick={handleDecrement}>decrement (-)</button>
      <span className={count >= 10 ? "text-danger" : ""}>{count}</span>
      <button onClick={handleIncrement}>increment (+)</button>
      <br />
      {isModified ? <button onClick={resetCounter}>Reset</button> : ""}
    </div>
  );
};

export default Counter;
