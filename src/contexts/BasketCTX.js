"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { delay } from "@/utils/time";

import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const BasketCTXContext = createContext("BasketCTXContext");
export const BasketCTX = ({ children, boundary }) => {
  const {
    createOrUpdate,
    remove,
    data: localStorageData = [],
    isLoading,
  } = useLocalStorage("basket");
  const data = localStorageData || [];
  const addtoBasket = async (newItem = {}) => {
    try {
      const prevData = [...data];
      const findItem = prevData?.find((val) => newItem?._id === val?._id);

      if (findItem) {
        findItem.Qty = newItem.Qty || findItem?.Qty + 1 || 1;
      } else {
        prevData.push({
          Qty: 1,
          ...newItem,
        });
      }

      await delay(500);
      createOrUpdate(prevData);
      toast.success("Product added to basket");
    } catch (error) {
      toast.error("Faild to add this product");
    } finally {
      return true;
    }
  };
  const removeItemFromBasket = (id) => {
    const newData = [...data]?.filter((val) => id !== val?._id);
    createOrUpdate(newData);
  };
  const clearBasket = () => {
    createOrUpdate([]);
  };
  return (
    <BasketCTXContext.Provider
      value={{
        isLoading,
        data,
        addtoBasket,
        clearBasket,
        removeItemFromBasket,
      }}
    >
      {children}
    </BasketCTXContext.Provider>
  );
};
export const useBasket = () => useContext(BasketCTXContext);
