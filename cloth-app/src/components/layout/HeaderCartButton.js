import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartIcon } from "../svg/allIcons";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../context-store/CartContext";

const HeaderCartButton = (props) => {
  const [buttonBounce, setButtonBounce] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((index, item) => {
    return index + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonBounce(true);

    const timer = setTimeout(() => {
      setButtonBounce(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <Link to="/cart">
      <button
        className={`${classes.button} ${buttonBounce ? classes.bump : ""}`}
      >
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </Link>
  );
};

export default HeaderCartButton;
