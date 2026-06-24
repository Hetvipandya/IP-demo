import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

// FIX: safer API structure (prevents double /api/teamleader issues)
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://insurance-backend-eufn.onrender.com/api/teamleader";

const TLManagement = () => {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [userRef, setUserRef] = useState(null);

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    fetchTeamLeaders();
  }, []);

  // ================= POPUP =================
  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    setTimeout(() => {
      setPopup({ show: false, type: "", message: "" });
    }, 2500);
  };

  // ================= FETCH =================
  const fetchTeamLeaders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/all`);
      const data = await res.json();

      // FIX: handle both array and {data: []}
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setTeamLeaders(list);
    } catch (err) {
      console.log(err);
      showPopup("error", "Failed to fetch Team Leaders");
    } finally {
      setLoading(false);
    }
  };

  // ================= CREATE =================
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: form.name.trim(),
          Email: form.email.trim(),
          mobileNo: form.mobile.trim(),
          address: form.address.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Create failed");

      showPopup("success", "Team Leader Added Successfully");

      setShowAdd(false);
      setForm({ name: "", email: "", mobile: "", address: "", password: "" });

      fetchTeamLeaders();
    } catch (err) {
      console.log(err);
      showPopup("error", err.message);
    }
  };

  // ================= EDIT OPEN =================
  const handleEditOpen = (leader) => {
    console.log("Opening edit for leader:", leader);

    setForm({
      name: leader.name || leader.Name || "",
      email: leader.email || leader.Email || "",
      mobile: leader.mobileNo || "",
      address: leader.address || "",
      password: "",
    });

    const uid =
      (leader.user && (leader.user._id || leader.user.id || leader.user)) ||
      leader.userId ||
      leader._id ||
      null;

    setUserRef(uid);
    setEditId(leader._id);
    setIsEditing(true);
    setShowAdd(true);
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editId) return;

    try {
      const res = await fetch(`${API_BASE}/update/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: form.name.trim(),
          Email: form.email.trim(),
          mobileNo: form.mobile.trim(),
          address: form.address.trim(),
          ...(form.password ? { password: form.password } : {}),
          ...(userRef ? { user: userRef } : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Backend Error:", data);
        throw new Error(data.message || "Update failed");
      }

      showPopup("success", "Team Leader Updated Successfully");

      setShowAdd(false);
      setIsEditing(false);
      setEditId(null);
      setUserRef(null);

      setForm({
        name: "",
        email: "",
        mobile: "",
        address: "",
        password: "",
      });

      fetchTeamLeaders();
    } catch (error) {
      console.log("Update Error:", error);
      showPopup("error", error.message);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Team Leader?")) return;

    try {
      const res = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Delete failed");

      showPopup("delete", "Team Leader Deleted Successfully");

      setTeamLeaders((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
      showPopup("error", err.message);
    }
  };

  // ================= FILTER =================
  const filtered = teamLeaders.filter((item) => {
    const q = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(q) ||
      item.Name?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.Email?.toLowerCase().includes(q) ||
      item.mobileNo?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#243087]">
          Team Leader Management
        </h2>

        <div className="flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="border px-3 py-2 rounded-xl"
          />

          <button
            onClick={() => {
              setShowAdd(true);
              setIsEditing(false);
              setForm({ name: "", email: "", mobile: "", address: "", password: "" });
            }}
            className="bg-[#243087] text-white px-4 py-2 rounded-xl"
          >
            + Add
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#243087] text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center p-5">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="4" className="text-center p-5">No Data</td></tr>
            ) : (
              filtered.map((l) => (
                <tr key={l._id} className="border-b">
                  <td className="p-3">{l.name || l.Name}</td>
                  <td className="p-3">{l.email || l.Email}</td>
                  <td className="p-3">{l.mobileNo}</td>

                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditOpen(l)}
                      className="p-2 rounded hover:bg-gray-200"
                    >
                      <FiEdit className="h-4 w-4 text-[#243087]" />
                    </button>

                    <button
                      onClick={() => handleDelete(l._id)}
                      className="p-2 rounded hover:bg-gray-200"
                    >
                      <FiTrash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <form
            onSubmit={isEditing ? handleUpdate : handleCreate}
            className="bg-white p-6 rounded-xl w-[400px]"
          >
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Update" : "Add"} Team Leader
            </h2>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 w-full mb-2"
              required
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border p-2 w-full mb-2"
              required
            />

            <input
              placeholder="Mobile"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="border p-2 w-full mb-2"
              required
            />

            <input
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="border p-2 w-full mb-2"
              required
            />

            <input
              placeholder={isEditing ? "New Password (optional)" : "Password"}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border p-2 w-full mb-2"
              required={!isEditing}
            />

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
              <button className="bg-[#243087] text-white px-4 py-2 rounded">
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* POPUP */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-xl text-center">
            <h2>{popup.message}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default TLManagement;