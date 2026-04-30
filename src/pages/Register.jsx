import React, { useState } from "react";
import {
  Phone,
  User,
  Mail,
  Lock,
  MapPin,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    number: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "dealer",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const inputBase =
    "w-full pl-12 pr-4 py-3.5 text-sm border rounded-lg outline-none transition shadow-sm bg-white focus:ring-2 focus:ring-[#213591]/20 focus:border-[#213591]";

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#fdfaf2] p-4">
      <div className="w-full max-w-2xl bg-white p-6 md:p-12 rounded-xl shadow-2xl border-t-8 border-[#E8021E]">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#213591] font-semibold mb-6 hover:text-[#E8021E] transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        {/* Form Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#213591]">
            Create <span className="text-[#E8021E]">Account</span>
          </h2>
          <div className="w-16 h-1 bg-[#E8021E] mx-auto mt-3 rounded-full" />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className={inputBase}
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                name="number"
                placeholder="Mobile Number"
                onChange={handleChange}
                className={inputBase}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className={inputBase}
              required
            />
          </div>

          {/* Address */}
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
            <textarea
              name="address"
              rows={3}
              placeholder="Full Address"
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 text-sm border rounded-lg outline-none resize-none shadow-sm focus:ring-2 focus:ring-[#213591]/20 focus:border-[#213591]"
              required
            />
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className={inputBase}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                className={inputBase}
                required
              />
            </div>
          </div>

          {/* Role */}
          <div className="relative">
            <Briefcase
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#213591]"
              size={18}
            />
            <input
              type="text"
              value="Registration Role: Dealer"
              readOnly
              className="w-full pl-12 pr-4 py-3.5 bg-blue-50 border border-blue-200 rounded-lg text-[#213591] font-bold cursor-not-allowed text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#213591] text-white py-4 rounded-lg font-bold hover:bg-[#1a2a75] transition border-l-8 border-[#E8021E] uppercase tracking-widest mt-4 shadow-lg active:scale-[0.98]"
          >
            Register Now
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-8 text-gray-600 font-medium">
          Already have an account?{" "}
          <a href="/login" className="text-[#E8021E] font-bold hover:underline">
            Login here
          </a>
        </p>
      </div>
    </section>
  );
};

export default Register;