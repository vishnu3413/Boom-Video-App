import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleForm = () => {
    setError("");
    setIsRegistering(!isRegistering);
    setForm({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await api.post("/auth/register", {
          email: form.email,
          password: form.password,
        });
        toast.success("Registration successful. Please log in.");
        toggleForm();
      } else {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/feed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {isRegistering ? "Create Account" : "Welcome"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isRegistering && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          {error && (
            <p className="text-sm text-red-600 -mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition duration-200"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}
          </span>
          <button
            onClick={toggleForm}
            className="ml-2 text-sm text-blue-600 hover:underline font-medium"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;