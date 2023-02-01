import React from "react";

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;

    if (form.rememberMe.checked) {
      alert(
        `
        Thanks for giving us your personal information!
        First Name: ${firstName}
        Last Name: ${lastName}
        `
      );
    } else {
      alert("We respect your privacy and will not store your information.");
    }
    form.firstName.value = "";
    form.lastName.value = "";
    form.rememberMe.value = false;
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleCheck = (e) => {
    console.log(e.target.checked);
  };

  const isFirstNameValid = (e) => {
    if (e.target.value.length < 2) {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "black";
      e.target.style.borderWidth = "1px";
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(e.currentTarget);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onContextMenu={handleContextMenu}
      className="form-center"
    >
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          onBlur={isFirstNameValid}
        />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" onChange={handleChange} />
      </label>
      <label>
        <input type="checkbox" name="rememberMe" onChange={handleCheck} />
        Remember Me?
      </label>
      <div className="flex-between">
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
