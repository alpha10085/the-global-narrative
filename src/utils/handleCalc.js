import { handleNumber } from "./data";

export const percentage = (num, fullNum) => {
  num = handleNumber(num);
  fullNum = handleNumber(fullNum);
  return ((100 * num) / fullNum).toFixed(2);
};
export const calcNumberAfterDiscount = (num = 0, discount = 0) => {
  num = handleNumber(num);
  discount = handleNumber(discount);
  return (num * (100 - discount)) / 100;
};
export const calculateOriginalBefPrice = (
  discountedPrice = 0,
  discountPercentage = 0
) => {
  const originalPrice = discountedPrice / (1 - discountPercentage / 100);
  const discountAmount = originalPrice - discountedPrice;
  return parseFloat(discountAmount.toFixed(2));
};
export const calculateOriginalPrice = (totalPrice, discount) => {
  if (discount > 100) {
    discount = 100;
  }
  const originalPrice = totalPrice / (1 - discount / 100);
  return originalPrice.toFixed(2); // rounding to 2 decimal places
};
export const calculatePrices = ({
  items = [],
  shippingPrice = 0,
  discount = 0,
}) => {
  // Calculate subtotal
  const subTotal = items?.reduce((total, item) => {
    const itemTotalPrice = item?.product?.price * item?.quantity;
    return total + itemTotalPrice;
  }, 0);
  // Calculate total price
  const totalPrice = calcNumberAfterDiscount(subTotal, discount) + shippingPrice;

  return { subTotal, totalPrice };
};

// Helper function to format the price
export const formatPrice = (price) => {
  // Convert price from cents to dollars and format to two decimal places
  return `${price?.toFixed(2)}`;
};
