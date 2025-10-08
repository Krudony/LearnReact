import { useEffect, useState } from "react";
// rafce
const UseEffectBasic = () => {
  // JS
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("Hello UseEffect");
  }, [value]);

  useEffect(() => {
    // fn
    console.log("Second effect");
  }, []);

  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => setValue(value + 1)}>Count</button>
      {console.log("Hello Render")}
    </div>
  );
};
export default UseEffectBasic;
