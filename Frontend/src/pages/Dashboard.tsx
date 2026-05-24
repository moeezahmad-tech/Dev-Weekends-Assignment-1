import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL as string;

type Food = {
  id: number;
  name?: string;
  desc: string;
  price?: string;
  currency?: string;
  image?: string;
};

const Dashboard = () => {
  const [items, setItems] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    loadItems();
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
            <input type="text" name="name" placeholder="Veggie Bliss Bowl" required />
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
            <textarea name="description" rows={4} placeholder="Describe the dish." />
          </label>
          <button className="admin__button" type="submit">
            Save Food Item
          </button>
        </form>

        <div className="admin__panel admin__preview">
          <h2>Food Items</h2>
          {loading ? (
            <div className="admin__note">Loading...</div>
          ) : items.length === 0 ? (
            <div className="admin__note">No food items yet.</div>
          ) : (
            <div className="admin__list">
              {items.map((item) => (
                <div className="admin__card" key={item.id}>
                  <img src={item.image || "/food.png"} alt={item.name || "Food"} />
                  <div>
                    <h3>{item.name || "Food Item"}</h3>
                    <p>{item.desc}</p>
                    <span>{item.price ? item.price : ""}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
