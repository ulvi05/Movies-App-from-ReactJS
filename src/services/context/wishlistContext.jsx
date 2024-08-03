import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  let localWishlist = [];
  if (localStorage.getItem("wishlist")) {
    localWishlist = JSON.parse(localStorage.getItem("wishlist"));
  } else {
    localStorage.setItem("wishlist", JSON.stringify([]));
  }

  const [wishlist, setWishlist] = useState(localWishlist);

  const checkWishlist = (id) => {
    return wishlist.find((x) => x.id === id);
  };

  const addToWishlist = (payload) => {
    setWishlist([...wishlist, payload]);
    const localWish = JSON.parse(localStorage.getItem("wishlist"));
    localStorage.setItem("wishlist", JSON.stringify([...localWish, payload]));
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((x) => x.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        setWishlist,
        checkWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

WishlistProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};
