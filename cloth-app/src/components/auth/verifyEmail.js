import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FailModal, SucessModal } from "../Alerts/Alert";
import classes from "./verifyEmail.module.css";

const VerifyEmail = (props) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const confirmEmail = () => {
    const graphqlQuery = {
      query: `
        query variables($code: String!){
          verifyUser(code:$code)
        }
      `,
      variables: {
        code: params.confirmationCode,
      },
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.errors && res.errors[0].status === 404) {
          throw new Error(res.errors[0].message);
        }
        if (res.errors) {
          throw new Error("User creation failed");
        }
        setMessage("Account confirmed, proceed to login");
      })
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    confirmEmail();
  });

  const redirect = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className={classes.container}>
      {message && (
        <SucessModal>
          <p>{message}</p>
          <button className="close-success-modal" onClick={redirect}>
            Close
          </button>
        </SucessModal>
      )}
      {error && (
        <FailModal>
          <p>{error}</p>
          <button className="close-fail-modal" onClick={redirect}>
            Close
          </button>
        </FailModal>
      )}
    </div>
  );
};

export default VerifyEmail;
