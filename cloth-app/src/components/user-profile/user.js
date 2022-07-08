import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import Orders from "./order";
import Modal from "../UI/Modal/Modal";

import classes from "./user.module.css";

const UserProfile = () => {
  const [message, setMessage] = useState("");
  const [modal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);

  const hideModal = () => {
    setShowModal(false);
  };
  const changePassword = () => {};

  let activeStyle = {
    color: "#004e7c",
    borderBottom: "none",
  };
  return (
    <div className={classes.profile}>
      <div className={classes.inner}>
        <div className={classes.nav}>
          <NavLink
            to="profile"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className={classes["nav-one"]}
          >
            <h4>Account Overview</h4>
          </NavLink>
          <NavLink
            to="orders"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className={classes["nav-two"]}
          >
            <h4>Orders</h4>
          </NavLink>
        </div>

        <Outlet />
      </div>

      {modal && (
        <Modal onClose={hideModal}>
          <p>{message}</p>

          <button onClick={hideModal} className={classes.button}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;
