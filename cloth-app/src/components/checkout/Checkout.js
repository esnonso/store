import { Fragment, useEffect, useState, useContext } from "react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";

import ShippingForm from "../shipping/shipping";
import CartItem from "./CartItem";
import CartContext from "../../context-store/CartContext";
import AuthContext from "../../context-store/auth-context";
import Modal from "../UI/Modal/Modal";
import { separator } from "../../Functions/seperator";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [data, setData] = useState("");
  const [address, setAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newLga, setNewLga] = useState("");
  const [newState, setNewState] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [editAddressForm, showEditAddressForm] = useState(false);
  const [paymentIsProcessing, setPaymentIsProcessing] = useState(false);
  const [orderSuccess, setOrderSucess] = useState(false);
  const total = +cartCtx.totalAmount + 3000;
  const navigate = useNavigate();

  useEffect(() => {
    const graphqlQuery = {
      query: `
        query {getUser {address, phone}}
      `,
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.errors) {
          throw new Error("An error occured! Could not fetch details");
        }
        setData(res.data.getUser);
        setAddress(res.data.getUser.address);
      })
      .catch((e) => console.log(e));
  }, [authCtx.token]);

  const editAddressFormHandler = () =>
    showEditAddressForm((prevState) => !prevState);

  const addressChangeHandler = (event) => {
    setNewAddress(event.target.value);
  };

  const cityChangeHandler = (event) => {
    setNewCity(event.target.value);
  };

  const lgaChangeHandler = (e) => {
    setNewLga(e.target.value);
  };

  const phoneChangeHandler = (e) => {
    setNewPhone(e.target.value);
  };

  const stateChangeHandler = (event) => {
    setNewState(event.target.value);
  };

  const addressSubmitHandler = (e) => {
    e.preventDefault();
    setAddress(`${newAddress}, ${newCity}, ${newLga}, ${newState}, Nigeria`);
    const graphqlQuery = {
      query: `
        mutation variables($address:String! $phone:String!){
          createUserAddress(address:{address: $address phone:$phone})
        }
      `,
      variables: {
        address: `${newAddress}, ${newCity}, ${newLga}, ${newState}, Nigeria`,
        phone: newPhone,
      },
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((response) => response.json())
      .then((res) => console.log(res));
    showEditAddressForm(false);
  };

  const cartItems = cartCtx.items.map((item, index) => (
    <CartItem key={item.id + index} name={item.name} amount={item.amount} />
  ));

  if (paymentIsProcessing && "error" === "") {
    return (
      <Modal>
        <div className={classes["loader-div"]}>
          <div className={classes.loader} />
          <p>Please Wait While We Process Your Payment</p>
        </div>
      </Modal>
    );
  }

  return (
    <Fragment>
      <div className={classes.container}>
        <h4>Checkout</h4>

        <div className={classes.address}>
          <div className={classes["address-head"]}>
            <h5 className={classes.bold}>Address</h5>
            <button
              onClick={editAddressFormHandler}
              className={classes.addressButton}
            >
              Change Address
            </button>
          </div>
          <hr />

          <div className={classes["address-details"]}>
            <p>
              <b>{data.name}</b>
            </p>
            <p>{address}</p>
            <p>{data.phone}</p>
          </div>
        </div>
        <div className={classes.shipment}>
          <h5>Shipment Details</h5>
          <hr />
          <div>{cartItems}</div>
        </div>

        <div className={classes.total}>
          <p>
            Subtotal:{" "}
            <span>
              <b className={classes.bold}>₦{separator(cartCtx.totalAmount)}</b>
            </span>
          </p>
          <p>
            Delivery Fee:{" "}
            <span>
              <b className={classes.bold}>₦{separator(3000)}</b>
            </span>
          </p>
          <hr />
          <p>
            Total:{" "}
            <span>
              <b className={classes.bold}>₦{separator(total)}</b>
            </span>
          </p>
        </div>

        {editAddressForm || !data.address ? (
          <Modal onClose={editAddressFormHandler}>
            <div className={classes.form}>
              <h4>Enter Your new Shipping Address</h4>
              <form onSubmit={addressSubmitHandler}>
                <ShippingForm
                  address={newAddress}
                  city={newCity}
                  state={newState}
                  lga={newLga}
                  phone={newPhone}
                  addressChangeHandler={addressChangeHandler}
                  cityChangeHandler={cityChangeHandler}
                  stateChangeHandler={stateChangeHandler}
                  phoneChangeHandler={phoneChangeHandler}
                  lgaChangeHandler={lgaChangeHandler}
                />

                <div className={classes.actions}>
                  <button
                    className={classes.button}
                    type="button"
                    onClick={editAddressFormHandler}
                  >
                    Close
                  </button>
                  <button type="submit" className={classes.button}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

export default Checkout;
