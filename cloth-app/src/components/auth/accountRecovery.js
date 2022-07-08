import { useState } from "react";

import classes from "./AuthForm.module.css";

const RecoverAccount = (props) => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const emailBlurHandler = () => {
    setEmailIsTouched(true);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const emailIsInvalid = emailIsTouched && email.length < 10;

  const formIsIncomplete = email.length < 10;

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className={classes.section}>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>Enter Your Email to recover Account</p>
        {message && <p>{message}</p>}
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

        <div className={classes.actions}>
          <button
            className={classes.button}
            disabled={formIsIncomplete}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default RecoverAccount;
