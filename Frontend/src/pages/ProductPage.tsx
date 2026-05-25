import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductHead from "../components/ProductHead";
import { useParams } from "react-router-dom";
import Products from "../components/Products";

const API_URL = import.meta.env.VITE_API_URL as string;

type Food = {
  id: number;
  name?: string;
  desc: string;
  price?: string;
  currency?: string;
  image?: string;
};

const ProductPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<Food | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadItem = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/food/${id}`);
        const json = await response.json();
        const data = json?.data as Food | undefined;
        setItem(data ?? null);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  return (
    <>
      <Navbar />
      <section className="min-h-[70vh] ">
        {loading ? (
          <div className="admin__note">Loading...</div>
        ) : item ? (
          <ProductHead
            productName={item.name ?? ""}
            productDescription={item.desc ?? ""}
            price={item.price ? Number(item.price) : 0}
            productImage={item.image ?? ""}
          />
        ) : (
          <div className="admin__note">Item not found.</div>
        )}
        
        <Products/>
        
      </section>
      <Footer />
    </>
  );
};

export default ProductPage;
