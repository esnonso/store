import { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  maleCategoryItems,
  femaleCategoryItems,
} from "../category-list/category-list";

import Picture from "../../images/default-profile-pic.png";
import Card from "../UI/Card/Card";
import classes from "./Style.module.css";

const ClothesCategory = (props) => {
  return (
    <div className={classes.container}>
      {props.female ? (
        <div className={classes["container-category"]}>
          {femaleCategoryItems.map((c, i) => (
            <div className={classes["category-item"]} key={i}>
              <Link to={c.toLowerCase()}>
                <Card>
                  <img src={Picture} alt="display-pic" />
                </Card>
              </Link>
              <Link to={c.toLowerCase()} className={classes["category-label"]}>
                {c}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className={classes["container-category"]}>
          {maleCategoryItems.map((c, i) => (
            <div className={classes["category-item"]} key={i}>
              <Link to={c.toLowerCase()}>
                <Card>
                  <img src={Picture} alt="display-pic" />
                </Card>
              </Link>
              <Link to={c.toLowerCase()} className={classes["category-label"]}>
                {c}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClothesCategory;
