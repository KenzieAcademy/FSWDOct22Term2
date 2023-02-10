const ReusableComponent = ({ name, height, topSpeed, imgUrl }) => {
  return (
    <div className="coaster-card">
      <h3>{name}</h3>
      <div className="row">
        <div>
          <h4>Statistics</h4>
          <ul>
            <li>Height: {height} ft</li>
            <li>Top Speed: {topSpeed} mph</li>
          </ul>
        </div>
        <img className="coaster-img" src={imgUrl} alt={name} />
      </div>
    </div>
  );
};

export default ReusableComponent;
