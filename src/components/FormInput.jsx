import { useState } from "react";

// rafce
const FormInput = () => {
  // JS
  const [value, setValue] = useState({
    title: "",
    address: "",
  });

  const hdlOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const hdlSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    console.log("Hello Submit");
  };
  // JSX (HTML+JS)
  return (
    <div>

        
      <button onClick={() => alert("Hello")}>
        Hello
        </button>




      <h1>{value.title}</h1>
      <form onSubmit={hdlSubmit}>
        <label>Title:</label>
        <input name="title" onChange={(e) => hdlOnChange(e)} />

        <label>address:</label>
        <input name="address" onChange={(e) => hdlOnChange(e)} />

        <button>Submit</button>
      </form>
    </div>
  );
};
export default FormInput;
