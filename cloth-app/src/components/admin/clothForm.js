import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SucessModal, FailAlert } from "../Alerts/Alert";
import AuthContext from "../../context-store/auth-context";

import { DescListItems, ColorListItems } from "./listItems";
import classes from "./clothForm.module.css";

const ClothForm = (props) => {
  const params = useParams();
  const [descPointId, setDescPointId] = useState(0);
  const [colorId, setColorId] = useState(0);
  const authCtx = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [colorItem, setColorItem] = useState("");
  const [colors, setColors] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [desc, setDesc] = useState("");
  const [description, setDescription] = useState([]);
  const [smallSize, setSmallSize] = useState(false);
  const [largeSize, setLargeSize] = useState(false);
  const [XlSize, setXlSize] = useState(false);
  const [XXlSize, setXXlSize] = useState(false);
  const [mediumSize, setMediumSize] = useState(false);
  const [image, setImage] = useState(null);
  const [brandIsTouched, setBrandIsTouched] = useState(false);
  const [categoryIsTouched, setCategoryIsTouched] = useState(false);
  const [titleIsTouched, setTitleIsTouched] = useState(false);
  const [priceIsTouched, setPriceIsTouched] = useState(false);
  const [quantityIsTouched, setQuantityIsTouched] = useState(false);

  useEffect(() => {
    if (props.isEditing) {
      const graphqlQuery = {
        query: `
        query variables($id:ID!) {
          getSingleCloth(id:$id)
          {
           _id brand title desc price sizes colors gender category amountInStock
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
          const data = res.data.getSingleCloth;
          const descriptions = JSON.parse(data.desc);
          const colors = JSON.parse(data.colors);

          let idDesc = 0;
          let idCol = 0;
          descriptions.map((d) => {
            setDescription((prevState) => [
              ...prevState,
              { point: d.point, id: idDesc },
            ]);
            return idDesc++;
          });
          if (colors !== null) {
            colors.map((c) => {
              setColors((prevState) => [
                ...prevState,
                { color: c.color, id: idCol },
              ]);
              return idCol++;
            });
          }
          setGender(data.gender);
          setBrand(data.brand);
          setTitle(data.title);
          setQuantity(data.amountInStock);
          setPrice(data.price);
          setCategory(data.category);
        })
        .catch((e) => console.log(e));
    } else {
      return;
    }
  }, [params.productId, props.isEditing]);

  const handleFileChange = (e) => {
    setImage(e.target.files);
  };

  const brandBlurHandler = () => {
    setBrandIsTouched(true);
  };

  const categoryBlurHandler = () => {
    setCategoryIsTouched(true);
  };

  const titleBlurHandler = () => {
    setTitleIsTouched(true);
  };

  const priceBlurHandler = () => {
    setPriceIsTouched(true);
  };

  const quantityBlurHandler = () => {
    setQuantityIsTouched(true);
  };

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
  const quantityChangeHandler = (event) => {
    setQuantity(event.target.value);
  };
  const descChangeHandler = (event) => {
    setDesc(event.target.value);
  };
  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  };

  const smallChangeHandler = (e) => {
    setSmallSize(e.target.checked);
  };

  const mediumChangeHandler = (e) => {
    setMediumSize(e.target.checked);
  };
  const largeChangeHandler = (e) => {
    setLargeSize(e.target.checked);
  };
  const XLChangeHandler = (e) => {
    setXlSize(e.target.checked);
  };
  const XXLChangeHandler = (e) => {
    setXXlSize(e.target.checked);
  };

  const addColorItemChangeHandler = (event) => {
    setColorItem(event.target.value);
  };

  const brandIsInvalid = brandIsTouched && brand.length < 2;
  const categoryIsInvalid = categoryIsTouched && category.length < 3;
  const titleIsInvalid = titleIsTouched && title.length < 4;
  const priceIsInvalid = priceIsTouched && price.length < 2;
  const quantityIsInvalid = quantityIsTouched && quantity < 0;

  const formIsBlank =
    // category.length < 3 ||
    brand.length < 2 ||
    title.length < 5 ||
    price.length < 2 ||
    quantity < 0 ||
    gender.length < 3;

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");
    const sizes = [
      { name: "SM", value: smallSize },
      { name: "M", value: mediumSize },
      { name: "L", value: largeSize },
      { name: "XL", value: XlSize },
      { name: "XXL", value: XXlSize },
    ];

    const graphqlQuery = {
      query: !props.isEditing
        ? `
        mutation variables($category:String!, $brand:String!, $title:String!, $price:Int!, $desc:String!,
          $gender:String!, $sizes:String!, $quantity:Int!, $colors:String){
            createCloth(clothInput:{
              category:$category
              brand:$brand
              title:$title
              price:$price
              desc:$desc
              gender:$gender
              sizes:$sizes
              quantity:$quantity
              colors:$colors
            })
          }
      `
        : `
        mutation variables($id:ID! $category:String!, $brand:String!, $title:String!, $price:Int!, $desc:String!,
          $gender:String!, $sizes:String!, $quantity:Int!, $colors:String){
            editCloth(id:$id clothInput:{
              category:$category
              brand:$brand
              title:$title
              price:$price
              desc:$desc
              gender:$gender
              sizes:$sizes
              quantity:$quantity
              colors:$colors
            })
          }
      `,
      variables: {
        id: params.productId,
        brand: brand,
        category: category,
        title: title,
        price: +price,
        desc: JSON.stringify(description),
        gender: gender,
        sizes: JSON.stringify(sizes),
        quantity: +quantity,
        colors: colors && JSON.stringify(colors),
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
      .then((res) => {
        if (res.errors && res.errors[0].status === 401) {
          throw new Error(res.errors[0].message);
        }
        if (res.errors && res.errors[0].status === 422) {
          throw new Error(res.errors[0].message);
        }
        if (res.errors) {
          throw new Error("Cloth creation failed");
        }
        setMessage(
          !props.isEditing ? res.data.createCloth : res.data.editCloth
        );
      })
      .catch((error) => setError(error.message));
  };

  const closeSuccess = () => {
    window.location.reload(false);
  };

  const addColorHandler = () => {
    if (colorItem === "") {
      return;
    }
    setColors((prevState) => [...prevState, { color: colorItem, id: colorId }]);
    setColorItem("");
    setColorId((prevState) => prevState + 1);
  };
  const addDescriptionHandler = () => {
    if (desc === "") {
      return;
    }
    setDescription((prevState) => [
      ...prevState,
      { point: desc, id: descPointId },
    ]);
    setDesc("");
    setDescPointId((prevState) => prevState + 1);
  };

  const removeDescPointHandler = (id) => {
    setDescription((prevState) => prevState.filter((i) => i.id !== id));
  };

  const removeColorPointHandler = (id) => {
    setColors((prevState) => prevState.filter((i) => i.id !== id));
  };

  return (
    <form
      className={classes.form}
      onSubmit={submitHandler}
      encType="multipart/form-data"
    >
      {props.isEditing ? <h1>Edit Cloth</h1> : <h1>Add New Cloth</h1>}
      {error && (
        <FailAlert>
          <small>{error}</small>
        </FailAlert>
      )}
      {message && (
        <SucessModal>
          <p> {message}</p>
          <button className="close-success-modal" onClick={closeSuccess}>
            Close
          </button>
        </SucessModal>
      )}

      <div className={brandIsInvalid ? classes.invalid : classes.control}>
        <label htmlFor="category">Brand Name</label>
        <input
          type="text"
          id="category"
          value={brand}
          onBlur={brandBlurHandler}
          onChange={brandChangeHandler}
          className={classes.input}
        />
        {brandIsInvalid && (
          <p className={classes.error}>
            please enter a valid category (3 characters and above)
          </p>
        )}
      </div>
      <div className={categoryIsInvalid ? classes.invalid : classes.control}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={category}
          onBlur={categoryBlurHandler}
          onChange={categoryChangeHandler}
          className={classes.input}
        />
        {categoryIsInvalid && (
          <p className={classes.error}>
            please enter a valid category (5 characters and above)
          </p>
        )}
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

      <div className={titleIsInvalid ? classes.invalid : classes.control}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onBlur={titleBlurHandler}
          onChange={titleChangeHandler}
          className={classes.input}
        />
        <p className={classes.error}>
          {titleIsInvalid &&
            "please enter a valid title (5 characters and above)"}
        </p>
      </div>

      <div className={priceIsInvalid ? classes["invalid"] : classes.control}>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onBlur={priceBlurHandler}
          onChange={priceChangeHandler}
          className={classes.input}
        />
        <p className={classes.error}>
          {priceIsInvalid &&
            "please enter a valid price (2 characters and above)"}
        </p>
      </div>

      <div className={quantityIsInvalid ? classes["invalid"] : classes.control}>
        <label htmlFor="price">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onBlur={quantityBlurHandler}
          onChange={quantityChangeHandler}
          className={classes.input}
        />
        <p className={classes.error}>
          {quantityIsInvalid && "please enter a valid quantity"}
        </p>
      </div>

      <div className={classes.control}>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          onChange={handleFileChange}
          className={classes.input}
          name="image"
          multiple
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="description">Description</label>
        <ul>
          {description.map((d, i) => (
            <DescListItems
              key={i}
              id={d.id}
              item={d.point}
              onRemove={removeDescPointHandler}
            />
          ))}
        </ul>
        <input
          value={desc}
          id="desc"
          onChange={descChangeHandler}
          className={classes.input}
        />
        <button
          className={classes["add"]}
          onClick={addDescriptionHandler}
          type="button"
        >
          +
        </button>
      </div>

      <div className={classes.control}>
        <label htmlFor="colors">Colors</label>
        {colors &&
          colors.map((c, i) => (
            <ColorListItems
              key={i}
              id={c.id}
              color={c.color}
              onRemove={removeColorPointHandler}
            />
          ))}
        <input
          type="text"
          className={classes.input}
          onChange={addColorItemChangeHandler}
          value={colorItem}
        />

        <button
          className={classes["add"]}
          onClick={addColorHandler}
          type="button"
        >
          + color
        </button>
      </div>
      <div className={classes.sizes}>
        <label> Sizes : </label>

        <input type="checkbox" name="small" onChange={smallChangeHandler} />
        <label htmlFor="small size">SM</label>

        <input type="checkbox" name="medium" onChange={mediumChangeHandler} />
        <label htmlFor="medium size">M</label>

        <input type="checkbox" name="large" onChange={largeChangeHandler} />
        <label htmlFor="large sizes">L</label>

        <input type="checkbox" name="XL" onChange={XLChangeHandler} />
        <label htmlFor="XL sizes">XL</label>

        <input type="checkbox" name="XXL" onChange={XXLChangeHandler} />
        <label htmlFor="XXL sizes">XXL</label>
      </div>
      <div className={classes.actions}>
        <button disabled={formIsBlank} type="submit" className={classes.button}>
          Add Product
        </button>
      </div>
    </form>
  );
};

export default ClothForm;
