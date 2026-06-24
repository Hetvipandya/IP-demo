import React, {
  useState,
  useEffect,
} from "react";

import {
  Mail,
  Lock,
  Briefcase,
  ShieldCheck,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

// import { useNavigate } from "react-router-dom";

// Firebase Messaging
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

const Login = () => {
  // const navigate =
  //   useNavigate();

  // ======================
  // CHECK TOKEN
  // ======================
  // useEffect(() => {
  //   const adminToken =
  //     localStorage.getItem(
  //       "adminToken"
  //     );

  //   const executiveToken =
  //     localStorage.getItem(
  //       "executiveToken"
  //     );

  //   const tlToken =
  //     localStorage.getItem(
  //       "tlToken"
  //     );

  //   if (adminToken) {
  //     navigate("/admin", {
  //       replace: true,
  //     });
  //     return;
  //   }

  //   if (executiveToken) {
  //     navigate(
  //       "/executive",
  //       {
  //         replace: true,
  //       }
  //     );
  //     return;
  //   }

  //   if (tlToken) {
  //     navigate("/tl", {
  //       replace: true,
  //     });
  //     return;
  //   }
  // }, [navigate]);

  // ======================
  // STATE
  // ======================
  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
      userType:
        "executive",
    });

  const [error, setError] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );

    setError("");
  };

  // ======================
  // USER TYPE CHANGE
  // ======================
  const handleUserTypeChange =
    (type) => {
      setFormData({
        email: "",
        password: "",
        userType: type,
      });

      setError("");
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, password, userType } =
    formData;

  if (!email || !password) {
    setError(
      "Please enter both email and password"
    );
    return;
  }

  setIsLoading(true);
  setError("");

  try {
    // ======================
    // FCM TOKEN
    // ======================
    let fcmToken = "";

    try {
      fcmToken =
        await getToken(
          messaging,
          {
            vapidKey:
              import.meta.env
                .VITE_VAPID_KEY,
          }
        );
    } catch (err) {
      console.log(
        "FCM Token Error:",
        err
      );
    }

    // ======================
    // ROLE WISE API
    // ======================
    let url = "";
    let body = {};

    // EXECUTIVE LOGIN
    if (
      userType ===
      "executive"
    ) {
      url =
        "https://insurance-backend-eufn.onrender.com/api/executive/login";

      body = {
        Email: email.trim(),
        password,
      };
    }

    // ADMIN / TL / USER LOGIN
    else {
      url =
        "https://insurance-backend-eufn.onrender.com/api/user/login";

      body = {
        identifier:
          email
            .trim()
            .toLowerCase(),
        password,
        fcmToken,
      };
    }

    // ======================
    // API CALL
    // ======================
    const response =
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          body
        ),
      });

    const data =
      await response.json();

    console.log(
      "Login Response:",
      data
    );

    if (
      response.ok &&
      data.token
    ) {
      // Clear old login
      localStorage.clear();

      // Save token
      localStorage.setItem(
        "token",
        data.token
      );

     if (
  userType ===
  "executive"
) {
  localStorage.setItem(
    "executiveToken",
    data.token
  );

  localStorage.setItem(
    "role",
    "executive"
  );

  // SAVE EXECUTIVE DATA
  localStorage.setItem(
    "executive",
    JSON.stringify(
      data.executive
    )
  );

  // SAVE EXECUTIVE ID
  localStorage.setItem(
    "executiveId",
    data.executive._id
  );

  window.location.href =
    "/executive";

  return;
}

      // ======================
      // USER LOGIN RESPONSE
      // ======================
      const role =
        data.role ||
        data.user?.role;

      localStorage.setItem(
        "role",
        role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      // ADMIN
      if (
        role ===
        "admin"
      ) {
        localStorage.setItem(
          "adminToken",
          data.token
        );

        window.location.href =
          "/admin";
      }

      // TEAM LEADER
      else if (
        role ===
          "teamleader" ||
        role === "tl"
      ) {
        localStorage.setItem(
          "tlToken",
          data.token
        );

        window.location.href =
          "/tl";
      }

      // DEALER
      else if (
        role ===
        "dealer"
      ) {
        window.location.href =
          "/";
      }

      else {
        setError(
          "Unauthorized role"
        );
      }
    } else {
      setError(
        data.message ||
          "Invalid credentials"
      );
    }
  } catch (err) {
    console.error(
      "Login Error:",
      err
    );

    setError(
      "Network error. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

  const inputBaseClass =
    "w-full pl-11 pr-4 py-3 text-sm border rounded-xl outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-offset-0";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              Welcome Back
            </h2>

            <p className="text-gray-300 text-sm mt-1">
              Sign in to your
              account
            </p>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Error */}
            {error && (
              <div className="mb-5 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-red-600 text-sm">
                  {error}
                </p>
              </div>
            )}

            {/* User Type */}
            <div className="mb-6">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                Account Type
              </p>

              <div className="grid grid-cols-3 gap-3">
                {/* Executive */}
                <button
                  type="button"
                  onClick={() =>
                    handleUserTypeChange(
                      "executive"
                    )
                  }
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                    formData.userType ===
                    "executive"
                      ? "bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Briefcase
                    size={
                      18
                    }
                  />
                  <span className="font-medium text-sm">
                    Executive
                  </span>
                </button>

                {/* Admin */}
                <button
                  type="button"
                  onClick={() =>
                    handleUserTypeChange(
                      "admin"
                    )
                  }
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                    formData.userType ===
                    "admin"
                      ? "bg-purple-50 border-purple-500 text-purple-700 ring-2 ring-purple-500/20"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <ShieldCheck
                    size={
                      18
                    }
                  />
                  <span className="font-medium text-sm">
                    Admin
                  </span>
                </button>

                {/* TL */}
                <button
                  type="button"
                  onClick={() =>
                    handleUserTypeChange(
                      "tl"
                    )
                  }
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                    formData.userType ===
                    "tl"
                      ? "bg-green-50 border-green-500 text-green-700 ring-2 ring-green-500/20"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <ShieldCheck
                    size={
                      18
                    }
                  />
                  <span className="font-medium text-sm">
                    TL
                  </span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                  Address
                </label>

                <div className="relative mt-1.5">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={
                      18
                    }
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    className={`${inputBaseClass}`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative mt-1.5">
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={
                      18
                    }
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    className={`${inputBaseClass}`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={
                          18
                        }
                      />
                    ) : (
                      <Eye
                        size={
                          18
                        }
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  isLoading
                }
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing
                    in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn
                      size={
                        18
                      }
                    />
                    Sign In
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;