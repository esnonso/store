import classes from "./loadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div className={classes.container}>
      <p>{props.children}</p>
      <div className={classes.loader}></div>
    </div>
  );
};

export default LoadingSpinner;
