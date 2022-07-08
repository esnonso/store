import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ClothItem from "./clothItem";

import classes from "./style.module.css";

const ClothesList = (props) => {
  const [clothes, setClothes] = useState([]);
  const gender = props.female ? "female" : "male";
  const params = useParams();
  const category =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  useEffect(() => {
    const graphqlQuery = {
      query: `
        query variables($category:String! $gender:String!) {
          getClothes(category:$category, gender:$gender)
          {
            clothes{ _id brand title desc price amountInStock}
          }
        }
      `,
      variables: {
        category: category,
        gender: gender,
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
          throw new Error("An error occured! Could not fetch clothes");
        }
        setClothes(res.data.getClothes.clothes);
      })
      .catch((error) => console.log(error));
  }, [category, gender]);
  return (
    <div className={classes.container}>
      {!props.female && <h3>Male {`${category} (${clothes.length})`}</h3>}
      {props.female && <h3>Female {`${category} (${clothes.length})`}</h3>}
      <div className={classes["cloth-item-container"]}>
        {clothes.map((c) => (
          <ClothItem
            key={c._id}
            id={c._id}
            brand={c.brand}
            price={c.price}
            title={c.title}
            gender={gender}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesList;
