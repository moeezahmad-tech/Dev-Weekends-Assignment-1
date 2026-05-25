const handleAddToCart = (props: {
  productImage: string;
  productName: string;
  price: number;
}) => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") as string)
    : [];

  const existingItem = cartItems.find(
    (item: { productImage: string; productName: string; price: number }) =>
      item.productName === props.productName,
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...props, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  window.location.href = "/cart";

};

export default handleAddToCart;
