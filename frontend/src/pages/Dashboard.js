import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "Lost",
    location: "",
    date: "",
    contactInfo: "",
  });

  const navigate = useNavigate();

  // Fetch all items
  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/items/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/items", form);
    }

    setForm({
      itemName: "",
      description: "",
      type: "Lost",
      location: "",
      date: "",
      contactInfo: "",
    });

    fetchItems();
  };

  // Delete
  const handleDelete = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  // Edit
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  // Search
  const handleSearch = async () => {
    if (!search) return fetchItems();

    const res = await API.get(`/items/search?name=${search}`);
    setItems(res.data);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Search */}
      <div className="card p-3 mb-3 shadow">
        <div className="d-flex gap-2">
          <input
            className="form-control"
            placeholder="Search item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button className="btn btn-secondary" onClick={fetchItems}>
            Reset
          </button>
        </div>
      </div>

      {/* Add / Update Form */}
      <div className="card p-3 mb-4 shadow">
        <h5>{editId ? "Update Item" : "Add Item"}</h5>

        <form onSubmit={handleSubmit} className="row g-2">
          <input
            className="form-control col"
            placeholder="Item Name"
            value={form.itemName}
            onChange={(e) =>
              setForm({ ...form, itemName: e.target.value })
            }
          />

          <input
            className="form-control col"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="form-control col"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          <select
            className="form-control col"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>

          <input
            type="date"
            className="form-control col"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <input
            className="form-control col"
            placeholder="Contact"
            value={form.contactInfo}
            onChange={(e) =>
              setForm({ ...form, contactInfo: e.target.value })
            }
          />

          <button className="btn btn-success mt-2">
            {editId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* Items List */}
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4" key={item._id}>
            <div className="card shadow mb-3">
              <div className="card-body">
                <h5>{item.itemName}</h5>
                <p>{item.description}</p>
                <p><strong>Location:</strong> {item.location}</p>

                <span
                  className={`badge ${
                    item.type === "Lost" ? "bg-danger" : "bg-success"
                  }`}
                >
                  {item.type}
                </span>

                <div className="mt-3 d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;