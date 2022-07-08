import { useContext, Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  maleCategoryItems,
  femaleCategoryItems,
} from "../../category-list/category-list";
import AuthContext from "../../../context-store/auth-context";

import classes from "./SideBar.module.css";

const SideBar = (props) => {
  const authCtx = useContext(AuthContext);
  const [auth, showAuth] = useState(false);
  const [maleCat, showMaleCat] = useState(false);
  const [femaleCat, showFemaleCat] = useState(false);

  const showAuthHandler = () => showAuth((prevState) => !prevState);
  const showMaleCatHandler = () => showMaleCat((prevState) => !prevState);
  const showFemaleCatHandler = () => showFemaleCat((prevState) => !prevState);

  const logoutHandler = () => {
    authCtx.logout();
    props.hideSidebar();
  };

  return (
    <div className={classes.backdrop}>
      <nav className={classes.sideNav}>
        <div className={classes["close-div"]}>
          <button
            className={classes["close-button"]}
            onClick={props.hideSidebar}
          >
            X
          </button>
        </div>

        <Fragment>
          <div className={classes["sidebar-profile"]} onClick={showAuthHandler}>
            <p className={classes.main}>Account</p>

            {auth && (
              <div className={classes.profile}>
                {authCtx.isLoggedIn ? (
                  <Fragment>
                    <p onClick={props.hideSidebar}>
                      <NavLink to={`/user/${authCtx.userId}`}>Profile</NavLink>
                    </p>

                    <button onClick={logoutHandler} className={classes.nav}>
                      Logout
                    </button>

                    {authCtx.admin && (
                      <p onClick={props.hideSidebar}>
                        <NavLink to="/products/new">Add new cloth</NavLink>
                      </p>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    <p>
                      <button
                        onClick={props.showRegister}
                        className={classes.nav}
                      >
                        Register
                      </button>
                    </p>

                    <p>
                      <button
                        to="/login"
                        onClick={props.showLogin}
                        className={classes.nav}
                      >
                        Login
                      </button>
                    </p>
                  </Fragment>
                )}
              </div>
            )}
          </div>
        </Fragment>

        <div className={classes.category}>
          <p onClick={showMaleCatHandler} className={classes.main}>
            Male Category
          </p>
          {maleCat &&
            maleCategoryItems.map((c, i) => (
              <p onClick={props.hideSidebar} className={classes.items} key={i}>
                <NavLink to={`/products/male/${c.toLowerCase()}`}>{c}</NavLink>
              </p>
            ))}
          <p onClick={showFemaleCatHandler} className={classes.main}>
            Female Category
          </p>
          {femaleCat &&
            femaleCategoryItems.map((c, i) => (
              <p onClick={props.hideSidebar} className={classes.items} key={i}>
                <NavLink to={`/products/female/${c.toLowerCase()}`}>
                  {c}
                </NavLink>
              </p>
            ))}
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
