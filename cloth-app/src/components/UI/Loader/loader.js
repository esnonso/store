import classes from "./loader.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default LoadingSpinner;
