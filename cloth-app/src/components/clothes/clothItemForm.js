import { useRef, useState } from "react";
import Input from "../UI/Input/Input";
import classes from "./clothItemForm.module.css";

const ClothItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
    setAmountIsValid(true);
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          ref={amountInputRef}
          label="Quantity:"
          input={{
            id: "amount_" + props.id,
            type: "number",
            min: 1,
            max: 5,
            step: 1,
            defaultValue: 1,
          }}
        />

        <button
          className={classes.wishlist}
          type="button"
          onClick={props.onAddToWishlist}
        >
          +Add to Wishlist <span style={{ color: "#881C59" }}>&#10084;</span>
        </button>
        <button className={classes.cart}>+Add to Cart</button>

        {!amountIsValid && (
          <p className={classes.invalid}>Please enter a valid amount (1- 5)</p>
        )}
      </form>
    </div>
  );
};

export default ClothItemForm;
