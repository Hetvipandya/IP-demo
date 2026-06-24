import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Search,
  UserPlus,
  Users,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const hideScrollbarCSS = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const ExecutiveManagement = () => {
  const [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    Name: "",
    Email: "",
    mobileNo: "",
    password: "",
  });

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://insurance-backend-eufn.onrender.com/api/executive",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setExecutives(Array.isArray(data) ? data : data.executives || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    const token = localStorage.getItem("token");

    await fetch(
      `https://insurance-backend-eufn.onrender.com/api/executive/delete/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setExecutives((prev) => prev.filter((e) => e._id !== id));
  };

  const handleEditOpen = (exec) => {
    setForm({ Name: exec.Name || "", Email: exec.Email || "", mobileNo: exec.mobileNo || "", password: "" });
    setIsEditing(true);
    setEditId(exec._id);
    setOpenModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editId) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://insurance-backend-eufn.onrender.com/api/executive/update/${editId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Name: form.Name,
          Email: form.Email,
          mobileNo: form.mobileNo,
          ...(form.password ? { password: form.password } : {}),
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data?.message || "Error updating executive");
      return;
    }

    setOpenModal(false);
    setIsEditing(false);
    setEditId(null);
    setForm({ Name: "", Email: "", mobileNo: "", password: "" });
    fetchExecutives();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://insurance-backend-eufn.onrender.com/api/executive/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data?.message || "Error creating executive");
      return;
    }

    setOpenModal(false);
    setForm({ Name: "", Email: "", mobileNo: "", password: "" });
    fetchExecutives();
  };

  const filteredExecutives = executives.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.Name?.toLowerCase().includes(q) ||
      e.Email?.toLowerCase().includes(q) ||
      e.mobileNo?.includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#f7f8fc] p-6">
      <style>{hideScrollbarCSS}</style>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-[#1f2f86]">
          Executive Management
        </h1>

        <div className="flex gap-2">
          <div className="flex items-center border bg-white px-3 py-2 rounded-lg">
            <Search size={16} />
            <input
              className="outline-none ml-2"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setOpenModal(true);
              setIsEditing(false);
              setEditId(null);
              setForm({ Name: "", Email: "", mobileNo: "", password: "" });
            }}
            className="flex items-center gap-2 bg-[#1f2f86] text-white px-4 py-2 rounded-lg"
          >
            <UserPlus size={16} /> Add
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full border-collapse">

          {/* TABLE HEADER */}
          <thead className="bg-[#1f2f86] text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : (
              filteredExecutives.map((e) => (
                <tr key={e._id} className="border-b hover:bg-gray-50">

                  {/* NAME */}
                  <td className="p-3 font-medium">
                    {e.Name}
                  </td>

                  {/* EMAIL */}
                  <td className="p-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      {e.Email}
                    </div>
                  </td>

                  {/* MOBILE (FIXED CLEAN TABLE VIEW) */}
                  <td className="p-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      {e.mobileNo}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditOpen(e)}
                        className="p-2 rounded hover:bg-gray-100"
                        title="Edit"
                      >
                        <FiEdit className="h-4 w-4 text-[#1f2f86]" />
                      </button>

                      <button
                        onClick={() => handleDelete(e._id)}
                        className="p-2 rounded hover:bg-gray-200"
                        title="Delete"
                      >
                        <FiTrash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL (UNCHANGED) */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={isEditing ? handleUpdate : handleCreate}
            className="w-full max-w-md rounded-xl bg-white p-5 space-y-3"
          >
            <h2 className="text-lg font-bold">Add Executive</h2>

            <input name="Name" placeholder="Name" value={form.Name} onChange={handleChange} className="w-full border p-2 rounded" />
            <input name="Email" placeholder="Email" value={form.Email} onChange={handleChange} className="w-full border p-2 rounded" />
            <input name="mobileNo" placeholder="Mobile" value={form.mobileNo} onChange={handleChange} className="w-full border p-2 rounded" />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" />

            <div className="flex justify-end gap-2">
                <button type="button" onClick={() => { setOpenModal(false); setIsEditing(false); setEditId(null); setForm({ Name: "", Email: "", mobileNo: "", password: "" }); }}>
                  Cancel
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded">
                  {isEditing ? "Update" : "Create"}
                </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExecutiveManagement;