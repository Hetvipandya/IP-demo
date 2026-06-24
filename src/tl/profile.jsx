import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Edit,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://insurance-backend-eufn.onrender.com";

export default function MyProfile() {
  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [editing, setEditing] =
    useState(false);

  const [form, setForm] =
    useState({});

  const [saving, setSaving] =
    useState(false);

  // ======================
  // FETCH PROFILE
  // ======================
  const fetchProfile =
    async () => {
      const token =
        localStorage.getItem(
          "tlToken"
        ) ||
        localStorage.getItem(
          "token"
        );

      if (!token) {
        setError(
          "Not authenticated"
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res =
          await fetch(
            `${API_BASE}/api/teamleader/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const data =
          await res.json();

        const p = data?.data || data || null;

        // ONLY REQUIRED DATA (do NOT expose hashed password)
        const filteredProfile = {
          _id: p?._id || null,
          Name: p?.Name || "",
          Email: p?.Email || "",
          mobileNo: p?.mobileNo || p?.mobile || "",
          address: p?.address || p?.location || "",
        };

        setProfile(filteredProfile);

        setError(null);
      } catch (err) {
        console.error(
          "Failed to fetch profile",
          err
        );

        setError(
          "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProfile();
  }, []);

  const displayName =
    profile?.Name ||
    "Unknown";

  const email =
    profile?.Email ||
    "-";

  const phone =
    profile?.mobileNo ||
    "-";

  const password =
    profile?.password ||
    "-";

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Profile
        </h1>

        <p className="text-gray-400 text-sm">
          Your TL account
          details
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
            <User
              size={28}
              className="text-white"
            />
          </div>

          <div>
            <p className="text-lg font-bold text-gray-800">
              {loading
                ? "Loading..."
                : displayName}
            </p>

            <p className="text-blue-500 text-sm font-semibold">
              Team Leader
            </p>
          </div>

          <div className="ml-auto">
            {editing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    // Save
                    if (!profile?._id) return;
                    const token =
                      localStorage.getItem("tlToken") ||
                      localStorage.getItem("token");

                    if (!token) {
                      setError("Not authenticated");
                      return;
                    }

                    try {
                      setSaving(true);

                      const url = `${API_BASE}/api/teamleader/update/${profile._id}`;

                      // Only send fields that are present in the form
                      const payload = {
                        Name: form.Name || profile.Name || "",
                        Email: form.Email || profile.Email || "",
                        mobileNo: form.mobileNo || profile.mobileNo || "",
                        address: form.address || profile.address || "",
                      };

                      if (form.password && form.password.trim() !== "") {
                        payload.password = form.password;
                      }

                      const res = await fetch(url, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(payload),
                      });

                      console.log("Profile update request payload:", payload);

                      const contentType = res.headers.get("content-type") || "";

                      if (!contentType.includes("application/json")) {
                        const text = await res.text();
                        console.error("Non-JSON response on profile update:", text);
                        alert(`Update failed: ${text}`);
                        throw new Error(res.status === 401 ? "Not authenticated" : `Server error: ${res.status}`);
                      }

                      const data = await res.json();

                      console.log("Profile update response:", data);

                      if (!res.ok) {
                        const msg = data?.message || "Update failed";
                        alert(`Update failed: ${msg}`);
                        throw new Error(msg);
                      }

                      // Refresh profile and exit edit mode
                      await fetchProfile();
                      setEditing(false);
                      setForm({});
                      alert(data?.message || "Profile updated successfully");
                    } catch (err) {
                      console.error("Profile update failed", err);
                      alert(err.message || "Update failed");
                    } finally {
                      setSaving(false);
                    }
                  }}
                  disabled={saving}
                  className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-2 rounded-lg border border-green-600"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setEditing(false);
                    setForm({});
                  }}
                  className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-2 rounded-lg border border-gray-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setForm({
                    Name: profile?.Name || "",
                    Email: profile?.Email || "",
                    mobileNo: profile?.mobileNo || "",
                    address: profile?.address || "",
                    password: "",
                  });
                  setEditing(true);
                }}
                className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-2 rounded-lg border border-blue-200"
              >
                <Edit size={14} />
                Edit
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        {/* DATA */}
        <div className="flex flex-col gap-4">

          {/* Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <User
                size={15}
                className="text-blue-500"
              />
            </div>

            <div>
              <p className="text-xs text-gray-400 font-semibold">
                Name
              </p>

              {editing ? (
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={form.Name || ""}
                  onChange={(e) => setForm((p) => ({ ...p, Name: e.target.value }))}
                />
              ) : (
                <p className="font-semibold text-gray-700">
                  {loading ? "..." : displayName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
              <Mail
                size={15}
                className="text-green-500"
              />
            </div>

            <div>
              <p className="text-xs text-gray-400 font-semibold">
                Email
              </p>

              {editing ? (
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={form.Email || ""}
                  onChange={(e) => setForm((p) => ({ ...p, Email: e.target.value }))}
                />
              ) : (
                <p className="font-semibold text-gray-700">
                  {loading ? "..." : email}
                </p>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
              <Phone
                size={15}
                className="text-yellow-500"
              />
            </div>

            <div>
              <p className="text-xs text-gray-400 font-semibold">
                Mobile No
              </p>

              {editing ? (
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={form.mobileNo || ""}
                  onChange={(e) => setForm((p) => ({ ...p, mobileNo: e.target.value }))}
                />
              ) : (
                <p className="font-semibold text-gray-700">
                  {loading ? "..." : phone}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
              <MapPin size={15} className="text-purple-500" />
            </div>

            <div>
              <p className="text-xs text-gray-400 font-semibold">Address</p>

              {editing ? (
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={form.address || ""}
                  onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                />
              ) : (
                <p className="font-semibold text-gray-700">
                  {loading ? "..." : profile?.address || "-"}
                </p>
              )}
            </div>
          </div>

          {/* Change Password (only in edit mode) */}
          {editing && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                <Lock size={15} className="text-gray-500" />
              </div>

              <div className="flex-1">
                <p className="text-xs text-gray-400 font-semibold">Change Password</p>
                <input
                  type="password"
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Leave blank to keep current password"
                  value={form.password || ""}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}