import { Fragment, useEffect, useContext, useState } from "react";
import AuthContext from "../../context-store/auth-context";
const Profile = (props) => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    const graphqlQuery = {
      query: `
        query {getUser {address, phone, firstname, lastname, email}}
      `,
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.errors) {
          throw new Error("An error occured! Could not fetch details");
        }
        setUser(res.data.getUser);
      })
      .catch((e) => console.log(e));
  }, [authCtx.token]);
  return (
    <Fragment>
      <h4>Account Details</h4>
      <p>
        {user.firstname} {user.lastname}
      </p>
      <p>{user.email}</p>
      <button>CHANGE PASSWORD</button>

      <hr />
      <h4>Address Details</h4>
      <p>{user.address}</p>
      <p>{user.phone}</p>
    </Fragment>
  );
};

export default Profile;
