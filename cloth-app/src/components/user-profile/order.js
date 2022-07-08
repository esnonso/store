import { Fragment, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import OrderList from "./orderList";

import styles from "../../homepage/clothes.module.css";

const Orders = (props) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * props.itemsPerPage) % props.orders.length;
    setItemOffset(newOffset);
  };
  return (
    <Fragment>
      <ul>
        <p>Aboy</p>
        {currentItems.map((order) => (
          <OrderList
            key={order._id}
            total={order.amount}
            items={order.items}
            date={order.createdAt}
            status={order.paymentStatus}
            deliveryStatus={order.deliveryStatus}
            address={order.shippingAddress}
          />
        ))}
      </ul>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        className={styles.page}
        activeClassName={styles.active}
      />
    </Fragment>
  );
};

export default Orders;
