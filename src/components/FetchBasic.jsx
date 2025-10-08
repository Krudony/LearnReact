// rafce

import { useEffect, useState } from "react";

const url = "https://api.github.com/users";

const FetchBasic = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    hdlFetch();
  }, []);

  const hdlFetch = async () => {
    // fs body
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setUsers(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Hello Fetch</h1>
      {users.map((item) => {
        console.log(item);
        return (
          <div>
            <img src={item.avatar_url} />
            <p>{item.login}</p>
          </div>
        );
      })}
    </div>
  );
};
export default FetchBasic;
