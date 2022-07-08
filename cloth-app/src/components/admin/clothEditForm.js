import { useState, useEffect } from "react";
import { useParams } from "react-router";
//import { useNavigate } from "react-router-dom";

import classes from "../admin/clothForm.module.css";

const ClothEditForm = (props) => {
  const params = useParams();

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [size, setSize] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  //const navigate = useNavigate();

  /** **************************************USE EFFECT FUNCTION ********************************** */
  useEffect(() => {}, []);
  /** ***************************FORM VALIDATE AND SUBMIT FUNCTIONS************************** */
  const brandChangeHandler = (event) => {
    setBrand(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const descChangeHandler = (event) => {
    setDesc(event.target.value);
  };
  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    let data = { brand, title, price, desc, imgUrl, category, gender, size };
  };
  //navigate("/", { replace: true })
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h1>Add New Cloth</h1>
      {message && <p>{message}</p>}

      <div className={classes.control}>
        <label htmlFor="category">Brand Name</label>
        <input
          type="text"
          id="category"
          value={brand}
          onChange={brandChangeHandler}
          className={classes.input}
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="category">
          Category <small>(e.g shirt, trouser)</small>
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={categoryChangeHandler}
          className={classes.input}
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          value={gender}
          onChange={genderChangeHandler}
          className={classes.input}
        >
          <option value="">select--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={titleChangeHandler}
          className={classes.input}
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={priceChangeHandler}
          className={classes.input}
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="description">Description</label>
        <textarea
          value={desc}
          rows="4"
          id="desc"
          onChange={descChangeHandler}
          className={classes.input}
        />
      </div>

      <div className={classes.actions}>
        <button type="submit" className={classes.button}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ClothEditForm;
