import GrandChildComponent from "./GrandChildComponent";

const ChildComponentOne = ({ data, setData }) => {
  return (
    <div>
      <h5>This is Child Component One</h5>
      <GrandChildComponent data={data} setData={setData} />
    </div>
  );
};

export default ChildComponentOne;
