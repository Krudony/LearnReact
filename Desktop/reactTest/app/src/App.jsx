import React from "react";
import Title from "./components/Title";
import Book from "./components/Book";
import Sellbook from "./Sellbook";


const App = () => {
const user = [

  {id:1, name:"Don"},
  {id:2, name:"Roy"}

]

const suname =[

  {id:1, name:"Tk",suname:"Gtd"},
  {id:2, name:"sd",suname:"Gto"}
]

  return (
    <div>
      <Title txt="Easy React " price={500} />

      <Book data1={user}>
        <p>
          <span> Price........ </span>
        </p>
        <button>Submit</button>
      </Book>

      <Sellbook data={suname}>


      <p>
          <span> Price........ </span>
      </p>
        <button>Submit</button>

      </Sellbook>


    </div>
  );
};



export default App;
