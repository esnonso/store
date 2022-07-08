import { Fragment } from "react";

const CartItem = (props) => {
  return (
    <Fragment>
      <p>
        {props.name}{" "}
        <span style={{ color: "#0084d0", fontWeight: "bold" }}>
          x{props.amount}
        </span>
      </p>
    </Fragment>
  );
};

export default CartItem;
