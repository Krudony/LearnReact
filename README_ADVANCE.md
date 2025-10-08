#### useState Basics

- useState hook
- returns an array with two elements: the current state value, and a function that we can use to update the state
- state update triggers re-render

```js
import { useState } from "react";

const UseStateBasics = () => {
  // console.log(useState());
  // console.log(useState('jo koy'));
  // const value = useState()[0];
  // const handler = useState()[1];
  // console.log(value, handler);

  const [count, setCount] = useState(0);
  const handleClick = () => {
    // console.log(count)
    setCount(count + 1);
    // setCount('pants');
  };
  return (
    <div>
      <h4>You clicked {count} times</h4>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default UseStateBasics;
```

#### Initial Render and Re-Renders

In a React application, the initial render is the first time that the component tree is rendered to the DOM. It happens when the application first loads, or when the root component is first rendered. This is also known as "mounting" the components.

Re-renders, on the other hand, happen when the component's state or props change, and the component needs to be updated in the DOM to reflect these changes. React uses a virtual DOM to optimize the process of updating the actual DOM, so that only the necessary changes are made.

There are a few ways that you can trigger a re-render in a React component:

- By changing the component's state or props. When the component's state or props change, React will re-render the component to reflect these changes.

- When the parent element re-renders, even if the component's state or props have not changed.

#### General Rules of Hooks

- starts with "use" (both -react and custom hooks)
- component must be uppercase
- invoke inside function/component body

#### useState with Array

Setup Challenge :

- create data
- import data
- setup a state value
  - people - default value equal to data
- display list(people) in the browser
- create two functions
  - one that removes single item from the list
  - one that clears entire list

1. render the list

```js
import React from "react";
import { data } from "../../../data";
const UseStateArray = () => {
  const [people, setPeople] = React.useState(data);

  return (
    <div>
      {people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default UseStateArray;
```

2. remove items

```js
import React from "react";
import { data } from "../../../data";
const UseStateArray = () => {
  const [people, setPeople] = React.useState(data);

  const removeItem = (id) => {
    let newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  };
  return (
    <div>
      {people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button onClick={() => removeItem(id)}>remove</button>
          </div>
        );
      })}
      <button onClick={() => setPeople([])}>clear items</button>
    </div>
  );
};

export default UseStateArray;
```

#### useState with Object

Setup Challenge :

- setup three state values
  - name(string)
  - age(number)
  - hobby(string)
- render in the browser

- create a button
  - setup a function
    - update all three state values
- as a result once the user clicks the button,
  new person is displayed in the browser

```js
import { useState } from "react";

const UseStateObject = () => {
  const [name, setName] = useState("peter");
  const [age, setAge] = useState(24);
  const [hobby, setHobby] = useState("read books");

  const displayPerson = () => {
    setName("john");
    setAge(28);
    setHobby("scream at the computer");
  };
  return (
    <>
      <h3>{name}</h3>
      <h3>{age}</h3>
      <h4>Enjoys To: {hobby}</h4>
      <button onClick={displayPerson}>show john</button>
    </>
  );
};

export default UseStateObject;
```

#### State is Object

```js
import { useState } from "react";

const UseStateObject = () => {
  const [person, setPerson] = useState({
    name: "peter",
    age: 24,
    hobby: "read books",
  });

  const displayPerson = () => {
    setPerson({ name: "Roitai", age: 33, hobby: "DEV" });
    // be careful, don't overwrite
    // setPerson('shakeAndBake');
    // setPerson({ name: 'susan' });
    // setPerson({ ...person, name: 'susan' });
  };
  return (
    <>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h4>Enjoys To: {person.hobby}</h4>
      <button onClick={displayPerson}>show</button>
    </>
  );
};

export default UseStateObject;
```

#### Set Function "Gotcha"

```js
import Starter from "./tutorial/01-useState/starter/05-useState-gotcha.jsx";
```

Setup Challenge :

- setup a state value and the button
- add functionality to increase value by 1
- log a state value, right after setFunction

```js
import { useState } from "react";

const UseStateGotcha = () => {
  const [value, setValue] = useState(0);

  const handleClick = () => {
    setValue(value + 1);
    //  be careful it's the old value
    console.log(value);
    //  so if you have any functionality
    // that relies on the latest value
    // it will be wrong !!!
  };
  return (
    <div>
      <h1>{value}</h1>
      <button className="btn" onClick={handleClick}>
        increase
      </button>
    </div>
  );
};

export default UseStateGotcha;
```

If you want to update the state immediately and synchronously, you can pass a function to setState that receives the previous state as an argument and returns the new state. For example:

```js
setState((prevState) => {
  return { ...prevState, value: newValue };
});
```

This can be useful if you need to update the state based on the previous state, or if you need to update the state synchronously.

```js
const handleClick = () => {
  setValue((currentState) => {
    // must return otherwise undefined
    // below is the latest/current state value
    const newState = currentState + 1;
    return newState;
  });
};
```

#### useEffect Basics

useEffect is a hook in React that allows you to perform side effects in function components.There is no need for urban dictionary - basically any work outside of the component. Some examples of side effects are: subscriptions, fetching data, directly updating the DOM, event listeners, timers, etc.

- useEffect hook
- accepts two arguments (second optional)
- first argument - cb function
- second argument - dependency array
- by default runs on each render (initial and re-render)
- if dependency array empty [] runs only on initial render

```js
import { useState, useEffect } from "react";

const UseEffectBasics = () => {
  const [value, setValue] = useState(0);
  const sayHello = () => {
    console.log("hello there");
  };

  sayHello();

  // useEffect(() => {
  //   console.log('hello from useEffect');
  // });

  useEffect(() => {
    console.log("hello from useEffect");
  }, []);
  return (
    <div>
      <h1>value : {value}</h1>
      <button onClick={() => setValue(value + 1)}>click me</button>
    </div>
  );
};
export default UseEffectBasics;
```

#### Multiple Effects

```js
import { useState, useEffect } from "react";

const MultipleEffects = () => {
  const [value, setValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  useEffect(() => {
    console.log("hello from first useEffect");
  }, [value]);

  useEffect(() => {
    console.log("hello from second useEffect");
  }, [secondValue]);
  return (
    <div>
      <h1>value : {value}</h1>
      <button onClick={() => setValue(value + 1)}>value</button>
      <h1>second value : {secondValue}</h1>
      <button className="btn" onClick={() => setSecondValue(secondValue + 1)}>
        second value
      </button>
    </div>
  );
};
export default MultipleEffects;
```

#### Fetch Data

- we will use axios

Setup Challenge :

- import useState and useEffect
- setup state value
  - users - default value []
- setup useEffect

- MAKE SURE IT RUNS ONLY ON INITIAL RENDER
- in the cb, create a function which performs fetch functionality
  - use url I provided in the starter file
  - you can use .then or async
  - set users equal to result
  - iterate over the list and display image, user name and link

```js
import { useState, useEffect } from "react";

const url = "https://api.github.com/users";

const FetchData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // you can also setup function outside
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <section>
      <h3>github users</h3>
      <ul>
        {users.map((user) => {
          const { id, login, avatar_url, html_url } = user;
          return (
            <li key={id}>
              <img src={avatar_url} alt={login} />
              <div>
                <h5>{login}</h5>
                <a href={html_url}>profile</a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default FetchData;
```

#### You Might Not Need an Effect

- will still utilize useEffect
- there is still plenty of code using useEffect

- fetching data
  replaced by libraries - react query, rtk query, swr or next.js

Data Fetching :

- usually three options
  - loading - waiting for data to arrive (display loading state)
  - error - there was an error (display error message)
  - success - received data (display data)

```js
import { useEffect, useState } from "react";
const url = "https://api.github.com/users/QuincyLarson";

const MultipleReturnsFetchData = () => {
  // convention to setup booleans with isSomething
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch(url);
        const user = await resp.json();
        // console.log(user);
        setUser(user);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>There was an error...</h2>;
  }
  return (
    <div>
      <img src={user.avatar_url} />
      <h2>{user.name}</h2>
      <h4>works {user.company}</h4>
      <p>{user.bio}</p>
    </div>
  );
};
export default MultipleReturnsFetchData;
```

#### Truthy and Falsy Values (optional)

JS

In JavaScript, a value is considered "truthy" if it is evaluated to true when used in a boolean context. A value is considered "falsy" if it is evaluated to false when used in a boolean context.

Here is a list of values that are considered falsy in JavaScript:

false
0 (zero)
"" (empty string)
null
undefined
NaN (Not a Number)
All other values, including objects and arrays, are considered truthy.

For example:

```js
const x = "Hello";
const y = "";
const z = 0;

if (x) {
  console.log("x is truthy");
}

if (y) {
  console.log("y is truthy");
} else {
  console.log("y is falsy");
}

if (z) {
  console.log("z is truthy");
} else {
  console.log("z is falsy");
}

// Output:
// "x is truthy"
// "y is falsy"
// "z is falsy"
```

The || operator (logical OR) returns the first operand if it is "truthy", or the second operand if the first operand is "falsy".

For example:

```js
const x = 0;
const y = 1;

console.log(x || y); // Output: 1 (the first operand is falsy, so the second operand is returned)
console.log(y || x); // Output: 1 (the first operand is truthy, so it is returned)
```

Short-circuit evaluation can be useful in cases where you want to perform a certain action only if a certain condition is met, or you want to return a default value if a certain condition is not met.

For example:

```js
function displayName(name) {
  return name || "Anonymous";
}

console.log(displayName("Pizza")); // Output: "Pizza"
console.log(displayName()); // Output: "Anonymous"
```

#### Short Circuit Evaluation in React - Common Approaches

JS (Optional)
The ! operator is a logical operator in JavaScript that negates a boolean value. It is equivalent to the not operator in other programming languages.

For example:

```js
let isTrue = true;
let isFalse = false;

console.log(!isTrue); // outputs: false
console.log(!isFalse); // outputs: true
```

You can use the ! operator to test if a value is not truthy or falsy:

```js
let val = 0;
if (!val) {
  console.log("val is falsy");
}
```

You can also use the ! operator to convert a value to a boolean and negate it:

```js
let val = "hello";
let bool = !val; // bool is now false

val = "";
bool = !val; // bool is now true
```

```js
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState("Roitai");

  return (
    <div>
      {user || "Annonymous!!"}
      {user && (
        <div>
          <h1>Please Logout</h1>
        </div>
      )}
    </div>
  );
};
export default App;
```

#### Ternary Operator

Vanilla JS

In JavaScript, the ternary operator is a way to concisely express a simple conditional statement. It is often called the "conditional operator" or the "ternary conditional operator".

Here is the basic syntax for using the ternary operator:

```js
condition ? expression1 : expression2;
```

#### Toggle Challenge

- create state value (boolean)
- return a button and a component/element
- when user clicks the button
  - toggle state value
  - conditionally render component/element

Initial Setup

```js
import { useState } from "react";

const ToggleChallenge = () => {
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = () => {
    if (showAlert) {
      setShowAlert(false);
      return;
    }
    setShowAlert(true);
  };

  return (
    <div>
      <button onClick={toggleAlert}>toggle alert</button>
      {showAlert && <Alert />}
    </div>
  );
};

const Alert = () => {
  return <div>hello world</div>;
};
export default ToggleChallenge;
```

Improvements

```js
<button onClick={() => setShowAlert(!showAlert)}>
```

#### User Challenge

- create state value
  - user - default value null
- create two functions
  - login - set's user equal to object with name property
  - logout - set's user equal to null
- in jsx use ? to display two different setups

- h4 with "hello there, user name" and logout button
- h4 with "please login " and login button

```js
import { useState } from "react";

const UserChallenge = () => {
  const [user, setUser] = useState(null);

  const login = () => {
    // normally connect to db or api
    setUser({ name: "Roitai DEV" });
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h4>hello there, {user.name}</h4>
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        <div>
          <h4>Please Login</h4>
          <button onClick={login}>login</button>
        </div>
      )}
    </div>
  );
};

export default UserChallenge;
```

#### Default Values - Vanilla JS (Optional)

In JavaScript, when defining a function, you can specify default values for its parameters. This means that if a caller of the function does not provide a value for a particular parameter, the default value will be used instead. Default parameters are defined by assigning a value to the parameter in the function definition.

For example, consider the following function, which takes two parameters, x and y, and returns their sum:

```js
function add(x, y) {
  return x + y;
}
```

If we call this function with only one argument, it will return NaN because y is undefined.

We can set default values for x,y as:

```js
function add(x = 0, y = 0) {
  return x + y;
}
```

Now, if we call add(3), the function will return 3, because the default value of 0 is used for the y parameter.

#### Optional Chaining - Vanilla JS (Optional)

n JavaScript, the optional chaining operator (?.) is a new feature that allows you to access properties of an object without worrying about whether the object or the property is null or undefined. It's a shorthand for a common pattern of checking for null or undefined before accessing an object's property.

For example, consider the following code, which accesses the firstName property of an object:

```js
const person = { name: { first: "John", last: "Doe" } };
console.log(person.name.first);
```

If the name property is null or undefined, this code will throw an error. To prevent this, we can use the optional chaining operator:

```js
console.log(person?.name?.first);
```

Now, if the person.name is null or undefined, this code will simply return undefined instead of throwing an error. This make the code more robust and readable.

#### Controlled Inputs - Complete

- setup state values
- add value and onChange to each input
- setup onSubmit

```js
import { useState } from "react";
const ControlledInputs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // const handleChange = (e) => {
  //   // for now we won't use it
  //   const name = e.target.name;
  //   const value = e.target.value;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // do something
    console.log(name, email);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>inputs</h4>
      <div>
        <label>name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};
export default ControlledInputs;
```

#### User Challenge

```js
import Starter from "./tutorial/06-forms/starter/02-user-challenge.jsx";
```

- setup controlled input (name input)
- setup onSubmit (for now just placeholder)
- import data array (first array) from data
- create another state value (data as default)
- iterate over and display right after form (h4)
- when user submits the form add new person to the list

- Extra Challenge
  - add button and setup functionality to remove user

```js
import { useState } from "react";
const UserChallenge = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // do something
    console.log(name);
    // if no value, do nothing
    if (!name) return;
    // if value, setup new user and add to current users
    const fakeId = Date.now();
    console.log(fakeId);
    // const newUser = { id: fakeId, name: name };
    const newUser = { id: fakeId, name };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    // set back to empty
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Add User</h4>
        <div>
          <label>name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit">submit</button>
      </form>
      {/* render users */}
      <h2>users</h2>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h4>{user.name}</h4>
          </div>
        );
      })}
    </div>
  );
};
export default UserChallenge;
```

#### Multiple Inputs

```js
import { useState } from "react";
const MultipleInputs = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Multiple Inputs</h4>
        {/* name */}
        <div>
          <label>name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        {/* email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        {/* password */}
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default MultipleInputs;
```

#### Other Inputs

```js
import { useState } from "react";
const frameworks = ["react", "angular", "vue", "svelte"];
const OtherInputs = () => {
  const [shipping, setShipping] = useState(false);
  const [framework, setFramework] = useState("react");

  const handleShipping = (e) => {
    console.log(e.target.checked);
    setShipping(e.target.checked);
  };
  const handleFramework = (e) => {
    setFramework(e.target.value);
  };
  return (
    <div>
      <form>
        <h4>Other Inputs</h4>
        {/* name */}
        <div>
          <input
            type="checkbox"
            checked={shipping}
            name="shipping"
            onChange={handleShipping}
          />
          <label> Free Shipping </label>
        </div>
        <div>
          <label>Framework</label>
          <select name="framework" value={framework} onChange={handleFramework}>
            {frameworks.map((framework) => {
              return <option key={framework}>{framework}</option>;
            })}
          </select>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default OtherInputs;
```

#### useRef

#### Custom Hooks

- same rules as regular hooks
- simplify component (less code)
- re-use functionality

useToggle.js

```js
import { useState } from "react";

const useToggle = (defaultValue) => {
  const [show, setShow] = useState(defaultValue);
  const toggle = () => {
    setShow(!show);
  };
  return { show, toggle };
};

export default useToggle;
```

- Challenge

- in App.jsx import 02-fetch-data
- take a look at the component
- and try to setup custom fetch hook
- hint :
  hook should return isLoading,isError,user
  and take url as parameter

useFetchPerson.js

```js
import { useState, useEffect } from "react";

const useFetchPerson = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch(url);
        // console.log(resp);
        if (!resp.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }

        const user = await resp.json();
        setUser(user);
      } catch (error) {
        setIsError(true);
        // console.log(error);
      }
      // hide loading
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return { isLoading, isError, user };
};

export default useFetchPerson;
```

Generic Fetch

useFetch.js

```js
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  // change state value
  const [data, setData] = useState(null);

  useEffect(() => {
    // change name
    const fetchData = async () => {
      try {
        const resp = await fetch(url);

        if (!resp.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        // change to response
        const response = await resp.json();
        setData(response);
      } catch (error) {
        setIsError(true);
        // console.log(error);
      }
      // hide loading
      setIsLoading(false);
    };
    // invoke fetch data
    fetchData();
  }, []);

  return { isLoading, isError, data };
};

export default useFetch;
```

#### Context API

#### Setup Global Context

final code in the repo under w-assets

- create new VITE project

```sh
npm create vite@latest global-context -- --template react
```

- install and start the project

```sh
npm install && npm run dev
```

- in src create context.jsx
- setup a global context - GlobalContext
- setup a component (AppContext) with one state value
- return GlobalContext.Provider from AppContext
- wrap then entire application (main.jsx) - children prop "gotcha"
- setup a custom hook
- access in App.jsx
- log result

#### useReducer

- it's the complete file from 03-useState-array

Challenge

- let's add reset functionality
- create function that set's people back to data array
- create another button, similar to clear just for reset
- use conditional rendering to toggle between the buttons,
  depending on people value

```js
const resetList = () => {
  setPeople(data);
};

// JSX
{
  people.length < 1 ? (
    <button className="btn" style={{ marginTop: "2rem" }} onClick={resetList}>
      reset
    </button>
  ) : (
    <button className="btn" style={{ marginTop: "2rem" }} onClick={clearList}>
      clear
    </button>
  );
}
```

```js
import { useState } from "react";
import { data } from "./utils/mock";

const App = () => {
  const [people, setPeople] = useState(data);

  const removeItem = (id) => {
    let newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  };

  const resetList = () => {
    setPeople(data);
  };
  const clearList = () => {
    setPeople([]);
  };

  return (
    <div>
      {people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button onClick={() => removeItem(id)}>remove</button>
          </div>
        );
      })}
      {people.length < 1 ? (
        <button onClick={resetList}>reset</button>
      ) : (
        <button onClick={clearList}>clear</button>
      )}
    </div>
  );
};
export default App;
```

#### Remove useState

```js
import { useReducer, useState } from "react";
import { data } from "./utils/mock";

// default/initial state
const defaultState = {
  people: data,
};
// reducer function
// whatever state is returned from the function is the new state

const reducer = (state, action) => {
  return state;
};

// dispatch({type:'SOME_ACTION'}) an action
// handle it in reducer, return new state

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const removeItem = (id) => {
    // let newPeople = people.filter((person) => person.id !== id);
    // setPeople(newPeople);
  };

  const resetList = () => {
    // setPeople(data);
  };
  const clearList = () => {
    // setPeople([]);
  };

  return (
    <div>
      {state.people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button onClick={() => removeItem(id)}>remove</button>
          </div>
        );
      })}
      {state.people.length < 1 ? (
        <button onClick={resetList}>reset</button>
      ) : (
        <button onClick={clearList}>clear</button>
      )}
    </div>
  );
};
export default App;
```

#### First Dispatch

```js
import { useReducer, useState } from "react";
import { data } from "./utils/mock";

// default/initial state
const defaultState = {
  people: data,
  isLoading: false,
};
// reducer function
// whatever state is returned from the function is the new state

const reducer = (state, action) => {
  if (action.type === "CLEAR_LIST") {
    return { ...state, people: [] };
  }

  return state;
};

// dispatch({type:'SOME_ACTION'}) an action
// handle it in reducer, return new state

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const removeItem = (id) => {
    // let newPeople = people.filter((person) => person.id !== id);
    // setPeople(newPeople);
  };

  const resetList = () => {
    // setPeople(data);
  };
  const clearList = () => {
    // setPeople([]);
    dispatch({ type: "CLEAR_LIST" });
  };

  return (
    <div>
      {state.people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button onClick={() => removeItem(id)}>remove</button>
          </div>
        );
      })}
      {state.people.length < 1 ? (
        <button onClick={resetList}>reset</button>
      ) : (
        <button onClick={clearList}>clear</button>
      )}
    </div>
  );
};
export default App;
```

#### Actions and Default State

```js
import { useReducer } from "react";
import { data } from "../../../data";

const CLEAR_LIST = "CLEAR_LIST";
const RESET_LIST = "RESET_LIST";
const REMOVE_ITEM = "REMOVE_ITEM";

const defaultState = {
  people: data,
};

const reducer = (state, action) => {
  console.log(action);
  if (action.type === CLEAR_LIST) {
    return { ...state, people: [] };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

const ReducerBasics = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const removeItem = (id) => {};

  const clearList = () => {
    dispatch({ type: CLEAR_LIST });
  };

  const resetList = () => {};
  return (
    <div>
      {/* switch to state */}
      {state.people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button onClick={() => removeItem(id)}>remove</button>
          </div>
        );
      })}
      {/* switch to state */}

      {state.people.length < 1 ? (
        <button
          className="btn"
          style={{ marginTop: "2rem" }}
          onClick={resetList}
        >
          reset
        </button>
      ) : (
        <button
          className="btn"
          style={{ marginTop: "2rem" }}
          onClick={clearList}
        >
          clear
        </button>
      )}
    </div>
  );
};

export default ReducerBasics;
```

#### Reset List Challenge

- setup a dispatch and handle action in the reducer

```js
import { useReducer, useState } from "react";
import { data } from "./utils/mock";

// default/initial state
const defaultState = {
  people: data,
  isLoading: false,
};
// reducer function
// whatever state is returned from the function is the new state
const CLEAR_LIST = "CLEAR_LIST";
const RESET_LIST = "RESET_LIST";
const REMOVE_ITEM = "REMOVE_ITEM";

const reducer = (state, action) => {
  if (action.type === CLEAR_LIST) {
    return { ...state, people: [] };
  }
  if (action.type === RESET_LIST) {
    return { ...state, people: data };
  }

  throw new Error(`No Matching ${action.type}`);
};

// dispatch({type:'SOME_ACTION'}) an action
// handle it in reducer, return new state

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const removeItem = (id) => {
    // let newPeople = people.filter((person) => person.id !== id);
    // setPeople(newPeople);
  };

  const resetList = () => {
    // setPeople(data);
    dispatch({ type: "RESET_LIST" });
  };
  const clearList = () => {
    // setPeople([]);
    dispatch({ type: "CLEAR_LIST" });
  };

  return (
    <div>
      {state.people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button onClick={() => removeItem(id)}>remove</button>
          </div>
        );
      })}
      {state.people.length < 1 ? (
        <button onClick={resetList}>reset</button>
      ) : (
        <button onClick={clearList}>clear</button>
      )}
    </div>
  );
};
export default App;
```

#### Remove Person Challenge

- remove single person
- hint extra property in the object

```js
import { useReducer, useState } from "react";
import { data } from "./utils/mock";

// default/initial state
const defaultState = {
  people: data,
  isLoading: false,
};
// reducer function
// whatever state is returned from the function is the new state
const CLEAR_LIST = "CLEAR_LIST";
const RESET_LIST = "RESET_LIST";
const REMOVE_ITEM = "REMOVE_ITEM";

const reducer = (state, action) => {
  if (action.type === CLEAR_LIST) {
    return { ...state, people: [] };
  }
  if (action.type === RESET_LIST) {
    return { ...state, people: data };
  }
  if (action.type === REMOVE_ITEM) {
    console.log(action.payload.id);
    let newPeople = state.people.filter(
      (person) => person.id !== action.payload.id
    );
    return { ...state, people: newPeople };
  }

  throw new Error(`No Matching ${action.type}`);
};

// dispatch({type:'SOME_ACTION'}) an action
// handle it in reducer, return new state

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const removeItem = (id) => {
    // let newPeople = people.filter((person) => person.id !== id);
    // setPeople(newPeople);
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const resetList = () => {
    // setPeople(data);
    dispatch({ type: "RESET_LIST" });
  };
  const clearList = () => {
    // setPeople([]);
    dispatch({ type: "CLEAR_LIST" });
  };

  return (
    <div>
      {state.people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button onClick={() => removeItem(id)}>remove</button>
          </div>
        );
      })}
      {state.people.length < 1 ? (
        <button onClick={resetList}>reset</button>
      ) : (
        <button onClick={clearList}>clear</button>
      )}
    </div>
  );
};
export default App;
```

#### useTransition

- useTransition is a React Hook that lets you update the state without blocking the UI.
- คือการบอก React ว่า “อันนี้งานไม่รีบ ทำไปเบื้องหลังได้”
- ป้องกัน input กระตุกเวลา filter list ใหญ่ ๆ

```js
import { useState, useTransition } from "react";
const App = () => {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setText(e.target.value);

    startTransition(() => {
      const newItems = Array.from({ length: 500 }, (_, index) => {
        return (
          <div key={index}>
            <img src="/vite.svg" />
            {text}
          </div>
        );
      });
      setItems(newItems);
    });
  };
  // console.log(items);
  return (
    <section>
      <form>
        <input type="text" value={text} onChange={handleChange} />
      </form>
      <h4>Items</h4>
      {isPending ? "Loading..." : <div>{items}</div>}
    </section>
  );
};
export default App;
```

#### Suspense API

The Suspense API is a feature in React that allows you to manage the loading state of your components. It provides a way to "suspend" rendering of a component until some data has been fetched, and display a fallback UI in the meantime. This makes it easier to handle asynchronous data loading and provide a smooth user experience in your React application.

Here is an example of how you might use the Suspense API:

ex SlowComponent

```jsx
import { useState } from "react";

const newItems = Array.from({ length: 5000 }, (_, index) => {
  return (
    <div key={index}>
      <img src="/vite.svg" alt="" />
    </div>
  );
});

const SlowComponent = () => {
  const [items, setItems] = useState(newItems);
  return <div>{items}</div>;
};
export default SlowComponent;
```

```js
// import SlowComponent from "./SlowComponent";
import { lazy, Suspense } from "react";
const SlowSure = lazy(() => import("./SlowComponent"));

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <SlowSure />
    </Suspense>
  );
};
export default App;
```
