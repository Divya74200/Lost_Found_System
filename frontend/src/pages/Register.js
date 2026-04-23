import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("CLICK WORKING");

    try {
      const res = await API.post("/register", form);
      console.log("SUCCESS:", res.data);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      console.log("ERROR:", err);
      console.log("ERROR DATA:", err.response?.data);
      alert(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Register</h3>

        {/* NO FORM SUBMIT — direct click */}
        <div>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-success w-100"
          >
            Register
          </button>
        </div>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;