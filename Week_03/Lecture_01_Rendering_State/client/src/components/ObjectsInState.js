import React, { useState } from "react";

const initialData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  jerseyNumber: null,
  hasSuperbowlRing: false,
};

const ObjectsInState = () => {
  const [data, setData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Option 1: Verbose
    // Step 1: Make a copy
    // const newData = { ...data };
    // // Step 2: Change the copy
    // newData[name] = value;
    // // Step 3: Pass the copy to setState
    // setData(newData);

    // Option 2: Streamlined with Spread
    setData({ ...data, [name]: value });

    // Option 3: Streamlined with Object.assign
    // const newData = Object.assign({ ...data }, { [name]: value });
    // setData(newData);
  };

  const handleCheck = (e) => {
    // Step 1: Make a copy
    const newData = { ...data };
    // Step 2: Change the copy
    newData.hasSuperbowlRing = e.target.checked;
    // Step 3: Pass the copy to setState
    setData(newData);
  };

  return (
    <div>
      <p>
        For this section, remember one thing: an Array is an Object. All the
        rules of the arrays apply here with objects in state.
      </p>
      <p>
        Typically, you want each value in state to be "stand-alone;" its value
        does not rely on the value of other data. As such, it's not best
        practice to store each field in a form, for example, as its own piece of
        state. Instead, you would store all of the form field data as one
        collective object.
      </p>
      <div>
        <h4>Example: Form data as an object</h4>
        <p>
          The form below is filled with fields that each refer to a different
          property in an object in state. The current value in state is:{" "}
          {JSON.stringify(data)}
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" onChange={handleChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lastName" onChange={handleChange} />
          </label>
          <br />
          <label>
            Birthday:
            <input type="date" name="dateOfBirth" onChange={handleChange} />
          </label>
          <br />
          <label>
            Jersey #:
            <input type="number" name="jerseyNumber" onChange={handleChange} />
          </label>
          <br />
          <label>
            Has Superbowl Ring:
            <input
              type="checkbox"
              name="hasSuperbowlRing"
              onChange={handleCheck}
            />
          </label>
          <br />
        </form>
      </div>
    </div>
  );
};

export default ObjectsInState;
