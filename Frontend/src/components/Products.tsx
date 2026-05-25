import React, { useEffect, useState } from "react";
import Cards from "./Cards";

const API_URL = import.meta.env.VITE_API_URL as string;

type Food = {
  id: number;
  name?: string;
  desc: string;
  price?: string;
  currency?: string;
  image?: string;
};

const Products = () => {
  const [items, setItems] = useState<Food[]>([]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const response = await fetch(`${API_URL}/food/list`);
      const json = await response.json();
      if (isMounted && json?.data) {
        setItems(json.data);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-900">Best Products</h2>
          <p className="text-base text-gray-600">
            The dishes that our community loves the most.
          </p>
        </div>
        <div className="food-section__grid w-full justify-items-center">
          {items.map((item) => (
            <Cards
              key={item.id}
              id={String(item.id)}
              productImage={item.image || "/food.png"}
              productName={item.name || "Food Item"}
              price={item.price ? parseFloat(item.price) : 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
