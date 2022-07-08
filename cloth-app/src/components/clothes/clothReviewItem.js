import { Rating } from "react-simple-star-rating";

import classes from "./viewCloth.module.css";

const ClothReviewItem = (props) => {
  return (
    <div className={classes["review-container"]}>
      <div className={classes["review-header"]}>
        <p>
          <Rating
            ratingValue={props.rating}
            size={20}
            readonly={true}
            allowHover={false}
          />
        </p>
        <p>
          <span>&#10003; verified purchase </span>
          {props.name.split(" ")[0]}
        </p>
      </div>
      <div className={classes["review-body"]}>{props.review}</div>
    </div>
  );
};

export default ClothReviewItem;
