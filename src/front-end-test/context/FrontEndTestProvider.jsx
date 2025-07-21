import { useState } from "react";
import { loadCartCountFromCache, saveCartCountToCache } from "../../storage/Cache";
import { FrontEndTestContext } from "./FrontEndTestContext";

export const FrontEndTestProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(() => {
    const cachedCount = loadCartCountFromCache();
    return cachedCount !== null ? cachedCount : 0;
  });

  const updateCartCount = (newCount) => {
    setCartCount(newCount);
    saveCartCountToCache(newCount);
  };

  return (
    <FrontEndTestContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </FrontEndTestContext.Provider>
  );
};
