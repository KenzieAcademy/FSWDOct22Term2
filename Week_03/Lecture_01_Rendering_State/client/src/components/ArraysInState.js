import React, { useState } from "react";

const ArraysInState = () => {
  const [arr, setArr] = useState([1, 2, 3]);
  const [objArr, setObjArr] = useState([
    {
      id: 1,
      name: "Jalen Hurts",
      hasSuperbowlRing: false,
    },
    {
      id: 87,
      name: "Travis Kelce",
      hasSuperbowlRing: true,
    },
    {
      id: 62,
      name: "Jason Kelce",
      hasSuperbowlRing: true,
    },
  ]);
  const [numToRemove, setNumToRemove] = useState(0);

  const handleAddNum = () => {
    // Option 1: Verbose
    const newArr = [...arr];
    newArr.push(4);
    setArr(newArr);

    // Option 2: Spread
    // Want it to be more lean?
    // setArr([...arr, 4]);
    // Option 3: .concat()
    // or, using .concat()
    // setArr(arr.concat(4));
  };

  const handleRemoveNum = (num) => {
    // Option 1: Verbose
    // const newArr = [];
    // for (let i = 0; i < arr.length; i++) {
    //   if (arr[i] !== num) {
    //     newArr.push(arr[i]);
    //   }
    // }
    // setArr(newArr);

    // Option 2: Splice (not a good idea when you don't outright know the index, so we'll skip this for now)

    // Option 3: .filter()
    const newArr = arr.filter((n) => n !== num);
    setArr(newArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRemoveNum(numToRemove);
  };

  const toggleSuperbowlRing = (id) => {
    // Option 1: Verbose
    // const newObjArr = [...objArr];
    // newObjArr.forEach((player) => {
    //   if (player.id === id) {
    //     player.hasSuperbowlRing = !player.hasSuperbowlRing;
    //   }
    // });
    // setObjArr(newObjArr);

    // Option 2: .map
    // const newObjArr = objArr.map((player) => {
    //   if (player.id === id) player.hasSuperbowlRing = !player.hasSuperbowlRing;
    //   return player;
    // });
    // setObjArr(newObjArr);

    // For all of these, you can even modify the original, then make a copy of the modified original, and then pass that new copy into setState
    const objToChange = objArr.find((player) => player.id === id);

    objToChange.hasSuperbowlRing = !objToChange.hasSuperbowlRing;

    setObjArr([...objArr]);
  };

  return (
    <div>
      <p>
        While all state technically works exactly the same, things get
        complicated once we move into the territory of complex data types such
        as arrays and objects.
      </p>
      <p>
        For example, if we have a number in state, and we want to add 5 to that
        number in state, we simply need to call <code>setState(state + 5)</code>
        .
      </p>
      <p>
        This works easily because primitive data types, when "updated" to have a
        new value, technically does not involve modifying the original. Adding
        to a number variable (i.e. <code>x += 5</code>) is, in actuality,
        creating a totally new number and assigning that new number to be the
        value of x. Likewise, concatenating <code>let str1 = "Hello "</code> and{" "}
        <code>let str2 = "World"</code> via <code>str1 += str2</code> is not
        actually modifying the characters at the individual indices of{" "}
        <code>str1</code>, but rather, a new string is created with the value of{" "}
        <code>str1</code> combined with the value of <code>str2</code>, and that
        new string is re-assigned as the value of <code>str1</code>.
      </p>
      <p>
        Arrays and Objects in state aren't playing by different rules; their
        data types are simply handled differently by JavaScript itself.
      </p>
      <p>
        In the most basic terms, to update a value in state, you must provide
        the new value to the setState function. If the new value is different
        from the old, React will update the component. However, if the value is
        NOT different, React will not update the component.
      </p>
      <div>
        <h4>Example: No Push</h4>
        <p>
          <code>arr</code> in State: {JSON.stringify(arr)}
        </p>
        <p>
          Clicking the following button will add <code>4</code> to{" "}
          <code>arr</code>
        </p>
        <button onClick={handleAddNum}>Add 4</button>
        <p>
          To add a new value to an array in state, you must take the following
          steps:
        </p>
        <ol>
          <li>Create a copy of the array (can be done with spread)</li>
          <li>
            Add the new value to the <strong>copy</strong> of the array in state
          </li>
          <li>
            Pass the <strong>copy</strong> of the array into the{" "}
            <code>setState</code> function
          </li>
        </ol>
      </div>
      <div>
        <h4>Example: Removing from an array in state</h4>
        <p>
          Technically, nothing is changing. You still need to follow those same
          3 steps:
        </p>
        <ol>
          <li>Make a copy</li>
          <li>Modify the copy</li>
          <li>Pass the copy into the setState function</li>
        </ol>
        <p>
          Below is an input and a button. If you click the button, it will
          delete the number with the provided value from the array:
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Remove:
            <input
              type="number"
              onChange={(e) => setNumToRemove(Number(e.target.value))}
            />
          </label>
          <br />
          <input type="submit" value="DELETE" />
        </form>
      </div>
      <div>
        <h4>Example: Give Jalen a Ring</h4>
        <ul>
          {objArr.map((player) => (
            <li key={player.id}>
              <h5>{player.name}</h5>
              <label>
                Has Superbowl Ring:{" "}
                <input
                  type="checkbox"
                  checked={player.hasSuperbowlRing}
                  onChange={() => toggleSuperbowlRing(player.id)}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArraysInState;
