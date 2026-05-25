import { useEffect, useState } from "react";
import LongCard from "../components/LongCard";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL as string;

type Food = {
  id: number;
  name?: string;
  desc: string;
  price?: string;
  currency?: string;
  image?: string;
};

type OrderItem = {
  productName?: string;
  price?: number | string;
  quantity?: number;
};

type Order = {
  id: number;
  items: OrderItem[];
  total: number;
  status?: string;
  created_at?: string;
};

const Dashboard = () => {
  const [items, setItems] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/food/list`);
      const json = await response.json();
      setItems(Array.isArray(json?.data) ? json.data : []);
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await fetch(`${API_URL}/orders/list`);
      const json = await response.json();
      setOrders(Array.isArray(json?.data) ? json.data : []);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      loadItems();
      loadOrders();
    }
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      desc: String(formData.get("description") || "").trim(),
      price: String(formData.get("price") || "").trim(),
      image: String(formData.get("image") || "").trim(),
      currency: "USD",
    };

    if (!payload.desc) {
      return;
    }

    await fetch(`${API_URL}/food/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    form.reset();
    loadItems();
  };

  return (
    <>
    <Navbar/>
      <section className="admin">
        <header className="admin__header">
          <h1>Admin Dashboard</h1>
          <p>Add new food items from the section below.</p>
        </header>

        <div className="admin__layout">
          <form className="admin__panel" onSubmit={handleSubmit}>
            <h2>Add Food</h2>
            <label className="admin__field">
              Food Name
              <input
                type="text"
                name="name"
                placeholder="Veggie Bliss Bowl"
                required
              />
            </label>
            <label className="admin__field">
              Price
              <input type="text" name="price" placeholder="$9.99" required />
            </label>
            <label className="admin__field">
              Category
              <input type="text" name="category" placeholder="Bowls" />
            </label>
            <label className="admin__field">
              Image URL
              <input type="text" name="image" placeholder="/food.png" />
            </label>
            <label className="admin__field">
              Description
              <textarea
                name="description"
                rows={4}
                placeholder="Describe the dish."
              />
            </label>
            <button className="admin__button" type="submit">
              Save Food Item
            </button>
          </form>

          <div className="admin__panel admin__preview h-[70vh] overflow-auto">
            <h2>Food Items</h2>
            {loading ? (
              <div className="admin__note">Loading...</div>
            ) : items.length === 0 ? (
              <div className="admin__note">No food items yet.</div>
            ) : (
              <div className="admin__list">
                {items.map((item) => (
                  <LongCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price ? parseFloat(item.price) : 0}
                    desc={item.desc}
                    image={item.image}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="admin__panel admin__preview h-[70vh] overflow-auto">
            <h2>Orders</h2>
            {loadingOrders ? (
              <div className="admin__note">Loading...</div>
            ) : orders.length === 0 ? (
              <div className="admin__note">No orders yet.</div>
            ) : (
              <div className="admin__list space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-xl bg-white p-4 shadow">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Order #{order.id}</span>
                      <span>{order.status ?? "pending"}</span>
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-gray-700">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{item.productName ?? "Item"}</span>
                          <span>
                            Qty {item.quantity ?? 1} · $
                            {typeof item.price === "number"
                              ? item.price
                              : parseFloat(item.price || "0")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-right font-semibold text-gray-800">
                      Total: ${order.total.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
