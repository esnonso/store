import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "./AuthForm.module.css";

const ChangePassword = (props) => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const applyData = (data) => {
    setMessage(data.data.message);
  };

  const applyDataPassword = (data) => {
    setMessage(data.data.message);
  };
  useEffect(() => {}, []);

  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setRepeatPassword(event.target.value);
  };

  const passwordIsInvalid = passwordIsTouched && password.trim().length < 6;

  const passwordIsConfirmed = password === repeatPassword;

  const formIsIncomplete = !passwordIsConfirmed || password.length < 6;

  const submitHandler = (event) => {
    event.preventDefault();
    setMessage("");
  };
  return (
    <div className={classes.section}>
      <form className={classes.form} onSubmit={submitHandler}>
        {message && <p>{message}</p>}

        <div className={passwordIsInvalid ? classes.invalid : classes.control}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
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

        <div
          className={!passwordIsConfirmed ? classes.invalid : classes.control}
        >
          <label htmlFor="password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            value={repeatPassword}
            onChange={confirmPasswordChangeHandler}
          />
          {!passwordIsConfirmed && (
            <small className={classes.invalid}>
              Your passwords do not match
            </small>
          )}
        </div>
        <div className={classes.actions}>
          <button
            disabled={formIsIncomplete}
            className={classes.button}
            type="submit"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
