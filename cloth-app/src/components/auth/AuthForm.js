import { Fragment, useState, useContext } from "react";

import RecoverAccount from "./accountRecovery";
import { SucessModal, FailAlert } from "../Alerts/Alert";
import AuthContext from "../../context-store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [over16, setOver16] = useState(false);
  const [accountRecovery, showAccountRecoveryForm] = useState(false);

  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [firstnameIsTouched, setFirstnameIsTouched] = useState(false);
  const [lastnameIsTouched, setLastnameIsTouched] = useState(false);

  const authCtx = useContext(AuthContext);

  const accountRecoveryHandler = () => {
    showAccountRecoveryForm(true);
  };

  const emailBlurHandler = () => {
    setEmailIsTouched(true);
  };

  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
  };

  const firstnameBlurHandler = () => {
    setFirstnameIsTouched(true);
  };

  const lastnameBlurHandler = () => {
    setLastnameIsTouched(true);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setRepeatPassword(event.target.value);
  };

  const firstnameChangeHandler = (event) => {
    setFirstname(event.target.value);
  };

  const lastnameChangeHandler = (event) => {
    setLastname(event.target.value);
  };

  const over16ChangeHandler = (event) => {
    setOver16(event.target.checked);
  };

  const emailIsInvalid = emailIsTouched && !email.includes("@");

  const passwordIsInvalid = passwordIsTouched && password.trim().length < 6;

  const firstnameIsInvalid = firstnameIsTouched && firstname.trim().length < 3;

  const lastnameIsInvalid = lastnameIsTouched && lastname.trim().length < 3;

  const passwordIsConfirmed = password === repeatPassword;

  let formIsIncomplete;

  if (props.register) {
    formIsIncomplete =
      !passwordIsConfirmed ||
      email.length < 10 ||
      password.length < 6 ||
      firstname.length < 3 ||
      lastname.length < 3 ||
      over16 === false;
  } else {
    formIsIncomplete = email.length < 10 || password.length < 6;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");

    if (props.register) {
      console.log(over16);
      const graphqlQuery = {
        query: `
        mutation varaibles($email:String!, $password:String!, $firstname:String!, $lastname:String!, 
           $over16:Boolean!){
            createUser(userInput:{
              email:$email
              password:$password
              firstname:$firstname
              lastname:$lastname
              over16:$over16
            })
          }
  `,
        variables: {
          email: email,
          firstname: firstname,
          lastname: lastname,
          password: password,
          over16: over16,
        },
      };
      fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.errors && res.errors[0].status === 422) {
            throw new Error(res.errors[0].message);
          }
          if (res.errors) {
            throw new Error("User creation failed");
          }
          setSuccess(res.data.createUser);
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      event.preventDefault();
      const graphqlQuery = {
        query: `
          query variables($email:String!, $password:String!) {
            login(email:$email password:$password)
            {
              token,
              userId,
              status
            }
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      };

      fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.errors && response.errors[0].status === 401) {
            throw new Error(response.errors[0].message);
          }
          if (response.errors) {
            throw new Error(response.errors[0].message);
          }

          authCtx.login(
            response.data.login.token,
            response.data.login.userId,
            response.data.login.status
          );
          props.hideLogin();
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  if (accountRecovery) {
    return <RecoverAccount />;
  }

  return (
    <section className={classes.section}>
      <div className={classes.x}>
        <button onClick={props.register ? props.hideRegister : props.hideLogin}>
          x
        </button>
      </div>
      <form className={classes.form} onSubmit={submitHandler}>
        {props.register ? <h1>Create new account</h1> : <h1>Sign In</h1>}

        {error && (
          <FailAlert>
            <small>{error}</small>
          </FailAlert>
        )}

        {success && (
          <SucessModal>
            <p>{success}</p>
            <button className="close-success-modal" onClick={props.showLogin}>
              Close
            </button>
          </SucessModal>
        )}

        <div className={emailIsInvalid ? classes.invalid : classes.control}>
          <input
            type="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailIsInvalid && (
            <small className={classes.invalid}>
              Please enter a vaild email
            </small>
          )}
        </div>

        <div className={passwordIsInvalid ? classes.invalid : classes.control}>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordIsInvalid && (
            <small className={classes.invalid}>
              Please enter a vaild password(at least 6 characters)
            </small>
          )}
        </div>

        {props.register && (
          <Fragment>
            <div
              className={
                !passwordIsConfirmed ? classes.invalid : classes.control
              }
            >
              <input
                type="password"
                id="repeatpassword"
                placeholder="confirm password"
                value={repeatPassword}
                onChange={confirmPasswordChangeHandler}
              />
              {!passwordIsConfirmed && (
                <small className={classes.invalid}>
                  Your passwords do not match
                </small>
              )}
            </div>

            <div
              className={firstnameIsInvalid ? classes.invalid : classes.control}
            >
              <input
                type="text"
                placeholder="First name"
                id="firstname"
                value={firstname}
                onChange={firstnameChangeHandler}
                onBlur={firstnameBlurHandler}
              />
            </div>
            {firstnameIsInvalid && (
              <small className={classes.invalid}>
                First name should be up to 3 characters
              </small>
            )}

            <div
              className={lastnameIsInvalid ? classes.invalid : classes.control}
            >
              <input
                type="text"
                id="lastname"
                placeholder="Last name"
                value={lastname}
                onChange={lastnameChangeHandler}
                onBlur={lastnameBlurHandler}
              />
            </div>
            {lastnameIsInvalid && (
              <small className={classes.invalid}>
                Last name should be up to 3 characters
              </small>
            )}

            <div className={classes.checkbox}>
              <p>
                <input
                  type="checkbox"
                  id="over16"
                  value={over16}
                  onChange={over16ChangeHandler}
                />
              </p>
              <p className={classes.agree}>Agree to all terms and condition</p>
            </div>
          </Fragment>
        )}
        <div className={classes.actions}>
          <button
            disabled={formIsIncomplete}
            className={classes.button}
            type="submit"
          >
            {props.register ? "Register" : "Login"}
          </button>
        </div>
        {!props.register && (
          <p onClick={accountRecoveryHandler} className={classes.link}>
            <small>Forgot password? Click here to reset password</small>
          </p>
        )}

        {props.register ? (
          <p onClick={props.showLogin} className={classes.link}>
            <small>Already registered? Click here to login</small>
          </p>
        ) : (
          <p onClick={props.showRegister} className={classes.link}>
            <small>Not registered? Click here to sign up</small>
          </p>
        )}
      </form>
    </section>
  );
};

export default AuthForm;
