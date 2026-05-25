import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const EditItem = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadItem = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/food/${id}`);
        const json = await response.json();
        const item = json?.data as Food | undefined;
        if (item) {
          setFormState({
            name: item.name ?? "",
            desc: item.desc ?? "",
            price: item.price ?? "",
            image: item.image ?? "",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name: formState.name.trim(),
      desc: formState.desc.trim(),
      price: formState.price.trim(),
      image: formState.image.trim(),
      currency: "USD",
    };

    if (!payload.desc) {
      return;
    }

    if (!id) {
      return;
    }

   const data =  await fetch(`${API_URL}/food/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!data.ok) {
      console.error("Failed to update food item");
      return;
    }else{
        window.location.href = "/dashboard";
    }

  };

  return (
    <>
      <Navbar />
      <section className="admin">
        <header className="admin__header">
          <h1>Edit Food Item</h1>
          <p>Update the details for this item.</p>
        </header>

        <div className="admin__layout">
          <form className="admin__panel" onSubmit={handleSubmit}>
            <h2>Edit Food</h2>
            <label className="admin__field">
              Food Name
              <input
                type="text"
                name="name"
                placeholder="Veggie Bliss Bowl"
                value={formState.name}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                required
              />
            </label>
            <label className="admin__field">
              Price
              <input
                type="text"
                name="price"
                placeholder="$9.99"
                value={formState.price}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    price: event.target.value,
                  }))
                }
                required
              />
            </label>
            <label className="admin__field">
              Category
              <input type="text" name="category" placeholder="Bowls" />
            </label>
            <label className="admin__field">
              Image URL
              <input
                type="text"
                name="image"
                placeholder="/food.png"
                value={formState.image}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    image: event.target.value,
                  }))
                }
              />
            </label>
            <label className="admin__field">
              Description
              <textarea
                name="description"
                rows={4}
                placeholder="Describe the dish."
                value={formState.desc}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    desc: event.target.value,
                  }))
                }
              />
            </label>
            <button className="admin__button" type="submit">
              Save Changes
            </button>
          </form>
          {loading && <div className="admin__note">Loading...</div>}
        </div>
      </section>
    </>
  );
};

export default EditItem;
