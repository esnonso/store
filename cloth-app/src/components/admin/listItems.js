import classes from "./clothForm.module.css";
export const DescListItems = (props) => {
  const deleteItem = () => {
    props.onRemove(props.id);
  };
  return (
    <li>
      <small>
        {props.item}{" "}
        <span className={classes.del} onClick={deleteItem}>
          x
        </span>
      </small>
    </li>
  );
};

export const ColorListItems = (props) => {
  const deleteItem = () => {
    props.onRemove(props.id);
  };
  return (
    <li>
      <small>
        {props.color}{" "}
        <span className={classes.del} onClick={deleteItem}>
          x
        </span>
      </small>
    </li>
  );
};
