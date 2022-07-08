import React, { useReducer } from "react";

export const WishContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultState = {
  items: [],
};

const wishlistReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingWishIndex = state.items.findIndex(
      (i) => i.id === action.item.id
    );

    const existingWishItem = state.items[existingWishIndex];
    let updatedItems;
    if (existingWishItem) {
      updatedItems = state.items;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems };
  }

  if (action.type === "REMOVE") {
    const updatedItems = state.items.filter((i) => i.id !== action.id);
    return { items: updatedItems };
  }
};

export const WishlistContextProvider = (props) => {
  const [wishlistState, dispactWishAction] = useReducer(
    wishlistReducer,
    defaultState
  );

  const addItemToWishlist = (item) => {
    dispactWishAction({ type: "ADD", item: item });
  };

  const removeItemFromWishlist = (id) => {
    dispactWishAction({ type: "REMOVE", id: id });
  };

  const wishContext = {
    items: wishlistState.items,
    addItem: addItemToWishlist,
    removeItem: removeItemFromWishlist,
  };

  return (
    <WishContext.Provider value={wishContext}>
      {props.children}
    </WishContext.Provider>
  );
};

export default WishContext;
