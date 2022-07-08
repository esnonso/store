import { useEffect, useState, useContext, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import ClothItemForm from "./clothItemForm";

import CartContext from "../../context-store/CartContext";
import AuthContext from "../../context-store/auth-context";
import WishContext from "../../context-store/wishlist-context";
import { separator } from "../../Functions/seperator";
import Picture from "../../images/default-profile-pic.png";

import classes from "./viewCloth.module.css";

const ViewCloth = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const wishCtx = useContext(WishContext);
  const cartCtx = useContext(CartContext);
  const [error, setError] = useState("");

  const [cloth, setCloth] = useState("");
  const [image, setImage] = useState([]);
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const [desc, setDesc] = useState([]);

  const addToCartHandler = (amount) => {
    if (size === "") {
      setError("Select a valid size!");
      return;
    }
    if (color !== "" && color === "") {
      setError("Select a valid color!");
      return;
    }
    cartCtx.addItem({
      id: cloth._id,
      name: cloth.title,
      amount: amount,
      price: cloth.price,
      size: size,
      color: color,
    });
  };

  const addToWishlistHandler = () => {
    wishCtx.addItem({
      id: cloth._id,
      name: cloth.title,
      price: cloth.price,
    });
  };

  useEffect(() => {
    const graphqlQuery = {
      query: `
        query variables($id:ID!) {
          getSingleCloth(id:$id)
          {
           _id brand title desc price sizes colors category
          }
        }
      `,
      variables: {
        id: params.productId,
      },
    };
    fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.errors) {
          throw new Error("An error occured!");
        }
        setCloth(res.data.getSingleCloth);
        const sizes = JSON.parse(res.data.getSingleCloth.sizes);
        const description = JSON.parse(res.data.getSingleCloth.desc);
        const colors = JSON.parse(res.data.getSingleCloth.colors);
        setSizes(sizes);
        setDesc(description);
        setColors(colors);
      })
      .catch((e) => console.log(e));
  }, [params.productId]);

  const sizeChangeHandler = (e) => {
    setError("");
    setSize(e.target.value);
  };

  const colorChangeHandler = (e) => {
    setError("");
    setColor(e.target.value);
  };
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes["img-container"]}>
          <img src={Picture} alt="cloth" />

          <button>{"<"}</button>
          <button>{">"}</button>
        </div>
        <div className={classes.detail}>
          <h3>{cloth.title}</h3>
          <h4 className={classes.price}>₦ {separator(+cloth.price)}</h4>

          {colors && (
            <div className={classes.size}>
              <select value={color} onChange={colorChangeHandler}>
                <option value="">select color</option>
                {colors.map((c, i) => (
                  <option value={c.color} key={i}>
                    {c.color}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className={classes.size}>
            <select value={size} onChange={sizeChangeHandler}>
              <option value="">select size</option>
              {sizes.map((s, i) => {
                const shoeSizes = [41, 42, 43, 44, 45];
                if (s.value) {
                  if (
                    cloth.category === "Shoe" ||
                    cloth.category === "Sneakers" ||
                    cloth.category === "Footwears"
                  ) {
                    return (
                      <option key={i} value={shoeSizes[i]}>
                        {shoeSizes[i]}
                      </option>
                    );
                  } else {
                    return (
                      <option key={i} value={s.name}>
                        {s.name}
                      </option>
                    );
                  }
                }
              })}
            </select>
          </div>

          <ClothItemForm
            onAddToCart={addToCartHandler}
            onAddToWishlist={addToWishlistHandler}
          />

          <p className={classes.error}>
            <small>{error}</small>
          </p>
          <hr />
          <h5>Product Description</h5>
          <ul>
            {desc.map((d, i) => (
              <li key={i}>
                <small>{d.point}</small>
              </li>
            ))}
          </ul>
          <hr />
          <h5>Brand Details</h5>
          {cloth.brand === "Nike" && (
            <small>
              Nike has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </small>
          )}
          {cloth.brand === "BYC" && (
            <small>
              BYC has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </small>
          )}

          {cloth.brand === "Addidas" && (
            <small>
              Addidas has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </small>
          )}

          {cloth.brand !== "Nike" &&
            cloth.brand !== "BYC" &&
            cloth.brand !== "Addidas" && (
              <small>
                {cloth.brand} has survived not only five centuries, but also the
                leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </small>
            )}

          {authCtx.admin && (
            <div className={classes.actions}>
              <button className={classes.edit}>
                <Link to={`/${params.productId}/edit`}>Edit</Link>
              </button>
              <button className={classes.delete}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ViewCloth;

/**
 *  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
     unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
 */
