import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";

import MobileToggle from "./MobileToggle/MobileToggle";
import HeaderCartButton from "./HeaderCartButton";
import AuthContext from "../../context-store/auth-context";
import SideBar from "./SideBar/SideBar";
import Modal from "../UI/Modal/Modal";
import AuthForm from "../auth/AuthForm";
import Wishlist from "./wishlist/wishlist";
import WishContext from "../../context-store/wishlist-context";
import WishlistItem from "./wishlist/wishlistItem";

import classes from "./Main.module.css";

const Main = (props) => {
  const [sidebar, showSidebar] = useState(false);
  const [loginForm, showLoginForm] = useState(false);
  const [registerForm, showRegisterForm] = useState(false);
  const [wishlist, showWishlist] = useState(false);
  const authCtx = useContext(AuthContext);
  const wishCtx = useContext(WishContext);
  //const navigate = useNavigate();

  const showSidebarHandler = () => showSidebar((prevState) => !prevState);

  const showWishlistHandler = () => showWishlist(true);
  const hideWishlistHandler = () => showWishlist(false);

  const hideSidebarHandler = (e) => {
    showSidebar(false);
  };

  const showLoginHandler = () => {
    showLoginForm(true);
    showRegisterForm(false);
    showSidebar(false);
  };

  const showRegisterHandler = () => {
    showRegisterForm(true);
    showLoginForm(false);
    showSidebar(false);
  };
  const hideLoginHandler = () => {
    showLoginForm(false);
    showSidebar(false);
  };

  const hideRegisterHandler = () => {
    showRegisterForm(false);
    showSidebar(false);
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes["logo-div"]}>
          <MobileToggle
            showSidebar={showSidebarHandler}
            onHide={hideSidebarHandler}
          />
          <div className={classes.logo}>
            <Link to="/">
              <h2 className={classes.h2}>Froshop </h2>
            </Link>
          </div>
        </div>
        <div className={classes["header-nav"]}>
          <Wishlist onShow={showWishlistHandler} />
          <HeaderCartButton />
        </div>
        {sidebar && (
          <SideBar
            showSidebar={showSidebarHandler}
            hideSidebar={hideSidebarHandler}
            showLogin={showLoginHandler}
            showRegister={showRegisterHandler}
          />
        )}
      </header>

      <div className={classes.main}>
        {props.children}
        {loginForm && (
          <Modal>
            <AuthForm
              hideLogin={hideLoginHandler}
              showLogin={showLoginHandler}
              showRegister={showRegisterHandler}
            />
          </Modal>
        )}
        {registerForm && (
          <Modal>
            <AuthForm
              register={true}
              hideRegister={hideRegisterHandler}
              showRegister={showRegisterHandler}
              showLogin={showLoginHandler}
            />
          </Modal>
        )}
      </div>
      {wishlist && (
        <Modal onClose={hideWishlistHandler}>
          <div className={classes["wish-container"]}>
            <div style={{ textAlign: "right" }}>
              <button
                style={{ backgroundColor: "white", border: "none" }}
                onClick={hideWishlistHandler}
              >
                X
              </button>
            </div>
            {wishCtx.items.length > 0 ? (
              <Fragment>
                <h3>Your Wishlist</h3>
                {wishCtx.items.map((i) => (
                  <WishlistItem
                    key={i.id}
                    name={i.name}
                    price={i.price}
                    id={i.id}
                    onClose={hideWishlistHandler}
                  />
                ))}
              </Fragment>
            ) : (
              <h3>Nothing here!</h3>
            )}
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default Main;
