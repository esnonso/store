import { Fragment } from "react";
import classes from "./CartItem.module.css";
import { separator } from "../../Functions/seperator";

const CartItem = (props) => {
  const price = separator(props.price);

  return (
    <Fragment>
      <li className={classes["cart-item"]}>
        <div className={classes.name}>
          <p>{props.name}</p>
          <span className={classes.size}>
            Size: {props.size} <br />
            {props.color && <>Color: {props.color}</>}
          </span>
        </div>

        <span className={classes.price}>{price}</span>

        <span className={classes.price}>
          <span className={classes.gray}></span>
          {separator(+props.price * +props.amount)}
        </span>

        <span className={classes.qty}> {props.amount}</span>

        <div className={classes.actions}>
          <button onClick={props.onRemove}>−</button>
          <button onClick={props.onAdd}>+</button>
        </div>
      </li>
    </Fragment>
  );
};

export default CartItem;
