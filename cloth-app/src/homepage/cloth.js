import { Link } from "react-router-dom";

import classes from "./clothes.module.css";

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes["outer-div"]}>
        <div className={classes["inner-div"]}>
          <Link to="products/male">Shop Male</Link>
          <Link to="products/female">Shop Female</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
