import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, isAdmin } = formData;

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    // ================= ADMIN LOGIN =================
    if (isAdmin) {
      if (email === adminEmail && password === adminPassword) {
        navigate("/admin-dashboard");
      } else {
        setError("Invalid Admin Credentials");
      }
      return;
    }

    // ================= DEALER LOGIN (DEFAULT) =================
    navigate("/dealer-dashboard");
  };

  const inputBase =
    "w-full pl-12 pr-4 py-3.5 text-sm border rounded-lg outline-none transition shadow-sm bg-white";

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#fdfaf2] p-4">
      <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-xl shadow-2xl border-t-8 border-[#E8021E]">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#213591]">
            Welcome <span className="text-[#E8021E]">Back</span>
          </h2>
          <div className="w-14 h-1 bg-[#E8021E] mx-auto mt-2 rounded-full" />
          <p className="text-gray-500 mt-3 font-medium">
            Login to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* Admin Toggle */}
          <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              className="w-4 h-4 accent-[#213591]"
            />
            <label className="text-sm font-semibold text-[#213591]">
              Login as Admin
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#213591] text-white py-4 rounded-lg font-bold hover:bg-[#1a2a75] transition border-l-8 border-[#E8021E] uppercase tracking-widest"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-[#E8021E] font-bold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;