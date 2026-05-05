import React, { useState,  useEffect  } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/admin");
  }
}, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });

  const [error, setError] = useState("");

  const ADMIN_EMAIL = "admin10@gmail.com";
  const ADMIN_PASSWORD = "Admin789";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, isAdmin } = formData;

    // 🔴 CASE 1: Admin credentials entered but checkbox NOT selected
    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD &&
      !isAdmin
    ) {
      setError("Please tick 'Login as Admin' to continue.");
      return;
    }

    // 🔴 CASE 2: Admin checkbox selected
if (isAdmin) {
  try {
    const res = await fetch(
      "https://insurance-backend-eufn.onrender.com/api/application/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: email,
          password: password,
        }),
      }
    );

    const data = await res.json();

    console.log("🔐 Admin Login Response:", { status: res.status, data });
    console.log("🔍 Response keys:", Object.keys(data));
    console.log("🔍 Full response object:", JSON.stringify(data, null, 2));

    if (res.ok) {
      // Check multiple possible token field names
      const tokenValue = data.token || data.accessToken || data.access_token || data.jwt;
      
      console.log("🔍 Looking for token in: token, accessToken, access_token, jwt");
      console.log("✅ Token found:", tokenValue ? "YES" : "NO");
      
      if (tokenValue) {
        localStorage.setItem("token", tokenValue);
        localStorage.setItem("adminToken", tokenValue);
        console.log("✅ Tokens saved to localStorage:", tokenValue.substring(0, 20) + "...");
        navigate("/admin");
      } else {
        console.error("❌ No token field found in response");
        setError("Login failed: No token in response");
      }
    } else {
      console.error("❌ Login failed:", data);
      setError(data.message || "Admin login failed");
    }
  } catch (err) {
    setError("Server error");
  }

  return;
}

    // 🔴 CASE 3: Prevent admin login via dealer API
    if (email === ADMIN_EMAIL) {
      setError("Admin must login using 'Login as Admin'");
      return;
    }

    // ✅ DEALER LOGIN
    try {
      const res = await fetch(
        "https://insurance-backend-eufn.onrender.com/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailId: email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        if (data.user.status === "approved" || data.user.isApproved) {
          localStorage.setItem("token", data.token);
          navigate("/dealer-dashboard");
        } else {
          setError("Your account is pending admin approval.");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
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
      </div>
    </section>
  );
};

export default Login;