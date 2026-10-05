/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

const readGuestWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("guest_wishlist") || "[]");
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [vendors, setVendors] = useState([]);
  const [guestIds, setGuestIds] = useState(readGuestWishlist);

  const refresh = useCallback(async () => {
    if (!isLoggedIn) {
      setVendors([]);
      return;
    }
    const response = await api.get("/auth/wishlist");
    setVendors(response.data || []);
  }, [isLoggedIn]);

  useEffect(() => {
    refresh().catch(() => setVendors([]));
  }, [refresh]);

  const toggle = useCallback(async (vendor) => {
    const id = vendor?._id || vendor;
    if (!isLoggedIn) {
      const next = guestIds.includes(id)
        ? guestIds.filter((item) => item !== id)
        : [...guestIds, id];
      setGuestIds(next);
      localStorage.setItem("guest_wishlist", JSON.stringify(next));
      return next.includes(id);
    }
    const response = await api.post(`/auth/wishlist/${id}`);
    await refresh();
    return response.data.saved;
  }, [guestIds, isLoggedIn, refresh]);

  const ids = isLoggedIn ? vendors.map((vendor) => vendor._id) : guestIds;

  return <WishlistContext.Provider value={{ vendors, ids, toggle, refresh }}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
};
