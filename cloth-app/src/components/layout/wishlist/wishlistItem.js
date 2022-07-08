import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import WishContext from "../../../context-store/wishlist-context";
import Picture from "../../../images/default-profile-pic.png";
const WishlistItem = (props) => {
  const wishCtx = useContext(WishContext);
  const navigate = useNavigate();
  const style = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "3rem",
    padding: "0.2rem",
    borderBottom: "1px black solid",
  };

  const buttonStyle = {
    border: "1px black solid",
    color: "black",
    padding: "0.5rem",
    backgroundColor: "white",
    width: "10%",
    boxSizing: "border-box",
  };

  const removeWishHandler = () => {
    wishCtx.removeItem(props.id);
  };

  const redirect = () => {
    props.onClose();
    navigate(`/products/${props.name}/${props.id}`);
  };

  return (
    <div style={style} onClick={redirect}>
      <img
        src={Picture}
        alt="cloth"
        style={{ width: "10%", marginRight: "0.2rem" }}
      />
      <p style={{ width: "60%" }}>{props.name}</p>
      <p style={{ width: "20%" }}>₦{props.price}</p>
      <button style={buttonStyle} onClick={removeWishHandler}>
        x
      </button>
    </div>
  );
};

export default WishlistItem;
