import { useReducer } from "react";

import CartContext from "./CartContext";

const oldCartItems = JSON.parse(localStorage.getItem("cart"));
const totalAmountForOldCartItems = localStorage.getItem("totalAmount");

const defaultCartState = {
  items: oldCartItems ? oldCartItems[0] : [],
  totalAmount: totalAmountForOldCartItems ? +totalAmountForOldCartItems : 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingItemIndex = state.items.findIndex(
      (item) =>
        item.id === action.item.id &&
        item.size === action.item.size &&
        item.color === action.item.color
    );

    const existingCartItem = state.items[existingItemIndex];
    let updatedItems;

    if (existingCartItem) {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    localStorage.removeItem("cart");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(updatedItems);

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalAmount", updatedTotalAmount);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  //REMOVE ITEM FROM CART
  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id && item.size === action.size
    );

    const existingCartItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item !== existingCartItem);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    localStorage.removeItem("cart");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(updatedItems);

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalAmount", updatedTotalAmount);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id, size) => {
    dispatchCartAction({ type: "REMOVE", id: id, size: size });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
