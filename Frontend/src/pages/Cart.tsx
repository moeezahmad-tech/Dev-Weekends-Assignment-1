import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LongCard from "../components/LongCard";

const API_URL = import.meta.env.VITE_API_URL as string;

type CartItem = {
  productImage?: string;
  productName?: string;
  productDescription?: string;
  price?: number | string;
  quantity?: number;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getPrice = (price: CartItem["price"]) =>
    typeof price === "number" ? price : parseFloat(price || "0");

  const getQuantity = (quantity: CartItem["quantity"]) =>
    Number.isFinite(quantity) && Number(quantity) > 0 ? Number(quantity) : 1;

  const handleOrderNow = async () => {
    if (cartItems.length === 0) {
      return;
    }

    const total = cartItems.reduce(
      (sum, item) => sum + getPrice(item.price) * getQuantity(item.quantity),
      0
    );

    const response = await fetch(`${API_URL}/orders/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems, total }),
    });

    if (!response.ok) {
      return;
    }

    localStorage.removeItem("cartItems");
    setCartItems([]);

    window.location.href = "/order-confirmation";
  };

  useEffect(() => {
    async function loadCartItems() {
      const storedItems = localStorage.getItem("cartItems");
      if (!storedItems) {
        setCartItems([]);
        return;
      }

      try {
        const parsed = JSON.parse(storedItems) as CartItem[];
        setCartItems(Array.isArray(parsed) ? parsed : []);
      } catch {
        setCartItems([]);
      }
    }

    loadCartItems();
  }, []);

  return (
    <div>
      <Navbar />

      <section className="min-h-[70vh]">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your cart is empty
            </h2>
            <p className="mt-4 text-gray-600">
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => {
                const itemPrice = getPrice(item.price);
                const itemQuantity = getQuantity(item.quantity);
                const itemTotal = itemPrice * itemQuantity;

                return (
                  <div key={index} className="space-y-2">
                    <LongCard
                      image={item.productImage}
                      name={item.productName}
                      side="user"
                      price={itemPrice}
                    />
                    <div className="flex items-center justify-between px-3 text-sm text-gray-600">
                      <span>Qty: {itemQuantity}</span>
                      <span>Total: ${itemTotal.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col items-end gap-4">
              <div className="text-lg font-semibold text-gray-800">
                Bill: $
                {cartItems
                  .reduce(
                    (sum, item) =>
                      sum + getPrice(item.price) * getQuantity(item.quantity),
                    0,
                  )
                  .toFixed(2)}
              </div>
              <button
                type="button"
                className="rounded-full bg-red-500 px-6 py-2 font-semibold text-white hover:bg-red-600"
                onClick={handleOrderNow}
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
