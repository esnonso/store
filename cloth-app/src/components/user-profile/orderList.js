import classes from "./user.module.css";

const OrderList = (props) => {
  return (
    <div className={classes.orders}>
      <p>
        <b>Date </b>: {props.date.split("T")[0]} Time:{" "}
        {props.date.split("T")[1]}
      </p>
      <p>
        <b>Amount</b>: {props.total}
      </p>
      <p>
        <b>Shipping Address</b>: {props.address}
      </p>
      <p>
        <b>Status: </b> {props.status}
      </p>
      <p>
        <b>Delivery Status: </b> {props.deliveryStatus}
      </p>
      <section>
        <b>Products Bought:</b>
        {JSON.parse(props.items).map((item) => (
          <small key={item.id}>
            <p>
              <span>product name:</span> {item.name}, <span>Quantity: </span>
              {item.amount}, <span>Price: </span>
              {item.price}, <span>Size: </span> {item.size}
            </p>
          </small>
        ))}
      </section>
    </div>
  );
};

export default OrderList;
