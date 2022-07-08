import { Fragment } from "react";
import { Link } from "react-router-dom";

import Card from "../../UI/Card/Card";
import { separator } from "../../../Functions/seperator";
import classes from "./style.module.css";

import Picture from "../../../images/default-profile-pic.png";

const ClothItem = (props) => {
  const evaluate = (price) => {
    const off = (25 / 100) * price;
    return off + price;
  };
  const oldPrice = evaluate(+props.price);

  return (
    <Fragment>
      <div className={classes["cloth-item"]}>
        <Link to={`/products/${props.title}/${props.id}`}>
          <Card>
            <figure>
              <img src={Picture} alt="cloth" />
              <figcaption>
                <b>{props.title}</b>
              </figcaption>
            </figure>

            <div className={classes.p}>
              <p className={classes.price}>
                <b>
                  <span className={classes.oldPrice}>
                    ₦{separator(oldPrice)}
                  </span>{" "}
                  ₦{separator(props.price)}{" "}
                </b>
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </Fragment>
  );
};

export default ClothItem;
