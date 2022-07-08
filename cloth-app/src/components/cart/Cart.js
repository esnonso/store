import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthForm from "../auth/AuthForm";
import CartItem from "./CartItem";
import AuthContext from "../../context-store/auth-context";
import CartContext from "../../context-store/CartContext";
import Modal from "../UI/Modal/Modal";
import { separator } from "../../Functions/seperator";

import classes from "./Cart.module.css";
import styles from "./CartItem.module.css";

const Cart = (props) => {
  const [loginForm, showLoginForm] = useState(false);
  const [registerForm, showRegisterForm] = useState(false);
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const addHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeHandler = (id, size) => {
    cartCtx.removeItem(id, size);
  };

  const showLoginHandler = () => {
    showLoginForm(true);
    showRegisterForm(false);
  };

  const showRegisterHandler = () => {
    showRegisterForm(true);
    showLoginForm(false);
  };
  const hideLoginHandler = () => {
    showLoginForm(false);
  };

  const hideRegisterHandler = () => {
    showRegisterForm(false);
  };

  const totalAmount = `₦ ${cartCtx.totalAmount.toFixed(2)}`;

  const cartItems = cartCtx.items.map((item, index) => (
    <CartItem
      key={item.id + index}
      name={item.name}
      amount={item.amount}
      size={item.size}
      price={+item.price}
      color={item.color}
      onRemove={removeHandler.bind(null, item.id, item.size, item.color)}
      onAdd={addHandler.bind(null, item)}
    />
  ));

  const cartHasItems = cartCtx.items.length > 0;

  if (!cartHasItems) {
    return (
      <div className={classes["cart-empty"]}>
        <p>
          Your Cart is Empty Click <Link to="/">Here</Link> to Start Shopping!
        </p>
      </div>
    );
  }

  return (
    <div className={classes.cart}>
      <h2>Cart</h2>
      <ul className={classes["cart-items"]}>
        <li className={styles["cart-item-header"]}>
          <h3 className={styles.name}>Name</h3>

          <h3 className={styles.price}>Unit Price ₦</h3>

          <h3 className={styles.price}>Sub Total ₦</h3>

          <h3 className={styles.qty}>Qty</h3>

          <h3 className={styles.actions}>Act</h3>
        </li>
        {cartItems}
      </ul>
      <div className={classes.total}>Total: {separator(totalAmount)}</div>

      <div className={classes.actions}>
        {cartHasItems && (
          <button
            onClick={
              authCtx.isLoggedIn ? () => navigate("/checkout") : showLoginForm
            }
          >
            Checkout
          </button>
        )}
      </div>

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
  );
};

export default Cart;
