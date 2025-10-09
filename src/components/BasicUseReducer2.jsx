import { useReducer, useState } from "react";

// rafce
const data = [
  { id: 1, name: "Roitai" },
  { id: 2, name: "Tam" },
];

const defaultState = {
  people: data,
  user: "TAM",
  login: true,
};

const reducer = (state, action) => {
  // fn body
  //   console.log(action.type, action.payload.id);
  if (action.type === "CLEAR") {
    return { ...state, people: [] };
  }
  if (action.type === "RESET") {
    return { ...state, people: data };
  }
  if (action.type === "REMOVE_ITEM") {
    let { id } = action.payload;
    let newData = state.people.filter((el) => el.id !== id);
    return { ...state, people: newData };
  }

  return state;
};

const BasicUseReducer2 = () => {
  // JS
  //   const [data, setData] = useState(people);
  const [kaika, dispatch] = useReducer(reducer, defaultState);

  const hdlRemove = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };
  const hdlReset = () => {
    dispatch({ type: "RESET" });
  };
  const hdlClear = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <div>
      {kaika.people.map((el) => {
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
export default BasicUseReducer2;
