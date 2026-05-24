import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import FoodItem from "../components/FoodItem";
import Header from "../components/Header";
import Navbar from "../components/navbar";

const API_URL = import.meta.env.VITE_API_URL as string;

type Food = {
  id: number;
  name?: string;
  desc: string;
  price?: string;
  currency?: string;
  image?: string;
};

const Home = () => {
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
    <>
      <Navbar />
      <Header />
      <section className="food-section" id="menu">
        <div className="food-section__header">
          <h2>Best Products</h2>
          <p>The dishes that our community loves the most.</p>
        </div>
        <div className="food-section__grid">
          {items.map((item) => (
            <FoodItem
              key={item.id}
              title={item.name || "Food Item"}
              description={item.desc}
              price={item.price ? `${item.price}` : ""}
              image={item.image || "/food.png"}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
