import React, { useState, useEffect } from "react";
import { Mail, Lock, Briefcase, ShieldCheck, Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Firebase Messaging
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const executiveToken = localStorage.getItem("executiveToken");

    if (adminToken) {
      navigate("/admin", { replace: true });
      return;
    } 

    if (executiveToken) {
      navigate("/executive", { replace: true });
      return;
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "executive", // 'executive' or 'admin'
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleUserTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      userType: type,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, userType } = formData;

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (userType === "admin") {
        // Admin login
        const response = await fetch(
          "https://insurance-backend-eufn.onrender.com/api/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emailId: email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          const token = data.token || data.accessToken || data.access_token || data.jwt || data.adminToken;

          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("adminToken", token);
            // Send FCM token to backend
            try {
              const permission = await Notification.requestPermission();
              if (permission === "granted") {
                const fcmToken = await getToken(messaging, {
                  vapidKey: "YOUR_VAPID_KEY"
                });
                if (fcmToken && data.admin?._id) {
                  await fetch("http://localhost:5000/api/notify/save-token", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userId: data.admin._id,
                      token: fcmToken,
                    }),
                  });
                }
              }
            } catch (err) {
              console.log("FCM token error (admin):", err);
            }
            navigate("/admin");
          } else {
            setError("Authentication token not received");
          }
        } else {
          setError(data.message || "Invalid admin credentials");
        }
      } else {
        // Executive login
        const response = await fetch(
          "https://insurance-backend-eufn.onrender.com/api/executive/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email: email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          if (!data.token) {
            setError("Authentication token not received");
            return;
          }

          localStorage.setItem("token", data.token);
          localStorage.setItem("executiveToken", data.token);

          if (data.executive?._id) {
            localStorage.setItem("executiveId", data.executive._id);
          }

          if (data.executive?.role) {
            localStorage.setItem("role", data.executive.role);
          }

          // Send FCM token to backend
          try {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              const fcmToken = await getToken(messaging, {
                vapidKey: "YOUR_VAPID_KEY"
              });
              if (fcmToken && data.executive?._id) {
                await fetch("http://localhost:5000/api/notify/save-token", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId: data.executive._id,
                    token: fcmToken,
                  }),
                });
              }
            }
          } catch (err) {
            console.log("FCM token error (executive):", err);
          }
          navigate("/executive");
        } else {
          setError(data.message || "Invalid executive credentials");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputBaseClass =
    "w-full pl-11 pr-4 py-3 text-sm border rounded-xl outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-offset-0";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-300 text-sm mt-1">Sign in to your account</p>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Error Alert */}
            {error && (
              <div className="mb-5 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* User Type Toggle */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Account Type
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleUserTypeChange("executive")}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                    formData.userType === "executive"
                      ? "bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Briefcase size={18} />
                  <span className="font-medium text-sm">Executive</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleUserTypeChange("admin")}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                    formData.userType === "admin"
                      ? "bg-purple-50 border-purple-500 text-purple-700 ring-2 ring-purple-500/20"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <ShieldCheck size={18} />
                  <span className="font-medium text-sm">Admin</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputBaseClass} ${
                      formData.userType === "admin"
                        ? "focus:ring-purple-500"
                        : "focus:ring-blue-500"
                    }`}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputBaseClass} ${
                      formData.userType === "admin"
                        ? "focus:ring-purple-500"
                        : "focus:ring-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-gray-700 transition"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                  formData.userType === "admin"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/20"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/20"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Secure authentication system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;