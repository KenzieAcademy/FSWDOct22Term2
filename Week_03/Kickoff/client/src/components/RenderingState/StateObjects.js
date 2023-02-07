import React, { useState } from "react";
import CollapsableSection from "../CollapsableSection";

const StateObjects = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [age, setAge] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  // The long way
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   // Create a Copy
  //   const userCopy = {};
  //   userCopy.name = user.name;
  //   userCopy.email = user.email;
  //   userCopy.password = user.password;
  //   userCopy.age = user.age;
  //   // Change the Relevant Properties
  //   userCopy[name] = value;

  //   // Pass the copy into the setState function
  //   setUser(userCopy);
  // };

  // The not so long way
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   // Create a copy
  //   const userCopy = { ...user };
  //   userCopy[name] = value;
  //   setUser(userCopy);
  // };

  // What about an even shorter way?
  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <CollapsableSection title="State Objects">
      <p>
        Modifying primitive data types in state is relatively straightforward;
        pass the new version into the <code>setState</code> function provided by
        the useState hook. For example:
      </p>
      <p>
        Value of <code>user</code> in state: {JSON.stringify(user)}
        <br />
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" onChange={handleChange} />
        </label>
      </p>
    </CollapsableSection>
  );
};

export default StateObjects;
