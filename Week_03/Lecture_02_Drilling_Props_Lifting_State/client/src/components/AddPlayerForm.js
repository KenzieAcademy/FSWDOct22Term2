const AddPlayerForm = ({ data, setData, handleSubmit, resetForm }) => {
  const positions = [
    "QB",
    "RB",
    "WR",
    "OT",
    "OG",
    "C",
    "TE",
    "CB",
    "S",
    "LB",
    "DE",
    "K",
    "P",
    "LS",
  ];

  const handleChange = (e) => {
    // console.log(e.target.name + " now has a value of " + e.target.value);
    const { name, value } = e.target;
    // 3 steps:
    // 1. Make a copy of the state you wish to change
    const dataCopy = { ...data };
    // 2. Change the copy however you need to
    dataCopy[name] = value;
    // 3. Pass the copy into the setState function
    setData(dataCopy);
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    const dataCopy = { ...data };
    dataCopy[name] = checked;
    setData(dataCopy);
  };

  return (
    <div className="container add-player">
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
          Jersey Number:
          <input type="number" name="jerseyNum" onChange={handleChange} />
        </label>
        <br />
        <label>
          DOB:
          <input type="date" name="birthday" onChange={handleChange} />
        </label>
        <br />
        <label>
          Position:
          <select name="position" onChange={handleChange}>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Injury Status:
          <input type="checkbox" name="isInjured" onChange={handleCheck} />
        </label>
        <br />
        <input type="reset" value="Cancel" onClick={resetForm} />
        <input type="submit" value="Add to Roster" />
      </form>
    </div>
  );
};

export default AddPlayerForm;
