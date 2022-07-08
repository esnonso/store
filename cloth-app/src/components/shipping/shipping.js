import { Select } from "react-select-states-and-lga-in-nigeria";
import "react-select-states-and-lga-in-nigeria/dist/index.css";

import classes from "../auth/AuthForm.module.css";

const ShippingForm = (props) => {
  return (
    <div>
      <div className={classes.control}>
        <label htmlFor="street">Street Address</label>
        <input
          type="text"
          id="street-address"
          value={props.address}
          onChange={props.addressChangeHandler}
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="street">City</label>
        <input
          type="text"
          id="city"
          value={props.city}
          onChange={props.cityChangeHandler}
        />
      </div>

      <div className={classes.control}>
        <Select
          state={props.state}
          lga={props.lga}
          changeState={props.stateChangeHandler}
          changeLga={props.lgaChangeHandler}
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="phone">Phone Number</label>

        <input
          id="phone"
          name="phone"
          value={props.phone}
          onChange={props.phoneChangeHandler}
        />
      </div>
    </div>
  );
};

export default ShippingForm;
