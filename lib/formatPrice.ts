export const formattedPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-gb", {
    style: "currency",
    currency: "GBP",
  });

  return formatter.format(price);
};
