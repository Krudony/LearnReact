import { useState } from "react";

// rafce
const people = [
  { id: 1, name: "Roitai" },
  { id: 2, name: "Tam" },
];

const BasicUseReducer = () => {
  // JS
  const [data, setData] = useState(people);

  const hdlRemove = (id) => {
    let newData = data.filter((el) => el.id !== id);
    setData(newData);
  };
  const hdlReset = () => {
    setData(people);
  };
  const hdlClear = () => {
    setData([]);
  };

  return (
    <div>
      {data.map((el) => {
        return (
          <div key={el.id}>
            <h1>{el.name}</h1>
            <button onClick={() => hdlRemove(el.id)}>Remove User</button>
          </div>
        );
      })}
      <hr />
      <button onClick={hdlReset}>Reset</button>
      <button onClick={hdlClear}>Clear</button>
    </div>
  );
};
export default BasicUseReducer;
