// import { useEffect, useState } from "react";
// import {
//   Briefcase,
//   CheckCircle2,
//   Mail,
//   Phone, 
//   Search,
//   ShieldCheck,
//   Trash2,
//   UserCheck,
//   Users,
//   UserPlus,
//   Lock,
// } from "lucide-react";

// const hideScrollbarCSS = `
//   .hide-scrollbar::-webkit-scrollbar { display: none; }
//   .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

//   .mesh-gradient {
//     background-color: #1f2f86;
//     background-image: 
//       radial-gradient(at 0% 0%, rgba(230, 54, 46, 0.4) 0px, transparent 50%),
//       radial-gradient(at 100% 100%, rgba(31, 47, 134, 0.4) 0px, transparent 50%),
//       radial-gradient(at 100% 0%, rgba(230, 54, 46, 0.3) 0px, transparent 50%),
//       radial-gradient(at 0% 100%, rgba(31, 47, 134, 0.3) 0px, transparent 50%);
//   }
// `;

// const ExecutiveManagement = () => {
//   const [executives, setExecutives] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [openModal, setOpenModal] = useState(false);

//   const [form, setForm] = useState({
//     Name: "",
//     Email: "",
//     mobileNo: "",
//     password: "",
//   });

//   useEffect(() => {
//     fetchExecutives();
//   }, []);

//   const fetchExecutives = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         "https://insurance-backend-eufn.onrender.com/api/executive",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();
//       setExecutives(Array.isArray(data) ? data : data.executives || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     const token = localStorage.getItem("token");

//     await fetch(
//       `https://insurance-backend-eufn.onrender.com/api/executive/delete/${id}`,
//       {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setExecutives((prev) => prev.filter((e) => e._id !== id));
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       "https://insurance-backend-eufn.onrender.com/api/executive/create",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data?.message || "Error creating executive");
//       return;
//     }

//     setOpenModal(false);
//     setForm({ Name: "", Email: "", mobileNo: "", password: "" });
//     fetchExecutives();
//   };

//   const filteredExecutives = executives.filter((e) => {
//     const q = search.toLowerCase();
//     return (
//       e.Name?.toLowerCase().includes(q) ||
//       e.Email?.toLowerCase().includes(q) ||
//       e.mobileNo?.includes(q)
//     );
//   });

//   return (
//     <div className="relative min-h-screen overflow-hidden rounded-[1.5rem] border bg-[#f7f8fc] p-3 sm:p-5 md:p-7 shadow-2xl shadow-[#1f2f86]/10">
//       <style>{hideScrollbarCSS}</style>

//       {/* HEADER */}
//       <div className="relative mb-6 flex flex-col gap-4 rounded-2xl bg-white/80 p-4 shadow-xl md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-black text-[#121a43]">
//             Executive Management
//           </h1>
//           <p className="text-xs sm:text-sm text-gray-500">
//             Manage executives & accounts
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
//           <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 w-full sm:w-auto">
//             <Search size={18} />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="outline-none text-sm w-full"
//               placeholder="Search..."
//             />
//           </div>

//           <button
//             onClick={() => setOpenModal(true)}
//             className="flex items-center justify-center gap-2 rounded-xl bg-[#1f2f86] px-4 py-2 text-white w-full sm:w-auto"
//           >
//             <UserPlus size={16} /> Add
//           </button>
//         </div>
//       </div>

//       {/* SUMMARY */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         <SummaryCard label="Total" value={executives.length} icon={<Users />} />
//         <SummaryCard label="Showing" value={filteredExecutives.length} icon={<UserCheck />} />
//         <SummaryCard label="Status" value="Active" icon={<CheckCircle2 />} />
//       </div>

//       {/* TABLE */}
//       <div className="overflow-hidden rounded-2xl mesh-gradient p-[2px]">
//         <div className="bg-[#121a43]/40 backdrop-blur-xl p-4 sm:p-6">

//           <div className="hide-scrollbar max-h-[60vh] overflow-auto rounded-xl border border-white/10">
//             <table className="w-full min-w-[600px] text-sm">
//               <thead className="sticky top-0 bg-[#1f2f86]/80 text-white/70">
//                 <tr>
//                   <th className="p-3 sm:p-4 text-left">Name</th>
//                   <th className="p-3 sm:p-4 text-left">Email</th>
//                   <th className="p-3 sm:p-4 text-left">Mobile</th>
//                   <th className="p-3 sm:p-4 text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-white/10">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="4" className="p-10 text-center text-white/60">
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredExecutives.map((e) => (
//                     <tr key={e._id} className="hover:bg-white/5">
//                       <td className="p-3 sm:p-4 text-white font-semibold">
//                         {e.Name}
//                       </td>

//                       <td className="p-3 sm:p-4 text-white/70">
//                         <div className="flex items-center gap-2">
//                           <Mail size={14} />
//                           <span className="break-all">{e.Email}</span>
//                         </div>
//                       </td>

//                       <td className="p-3 sm:p-4 text-white/70">
//                         <div className="flex items-center gap-2">
//                           <Phone size={14} />
//                           {e.mobileNo}
//                         </div>
//                       </td>

//                       <td className="p-3 sm:p-4 text-center">
//                         <button
//                           onClick={() => handleDelete(e._id)}
//                           className="p-2 rounded-lg bg-white/10 text-white hover:bg-red-500"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//         </div>
//       </div>

//       {/* MODAL */}
//       {openModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
//           <form
//             onSubmit={handleCreate}
//             className="w-full max-w-md rounded-xl bg-white p-5 space-y-3"
//           >
//             <h2 className="text-lg font-bold">Add Executive</h2>

//             <input name="Name" placeholder="Name" onChange={handleChange} className="w-full border p-2 rounded" />
//             <input name="Email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" />
//             <input name="mobileNo" placeholder="Mobile" onChange={handleChange} className="w-full border p-2 rounded" />
//             <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 rounded" />

//             <div className="flex flex-col sm:flex-row justify-end gap-2">
//               <button type="button" onClick={() => setOpenModal(false)} className="px-4 py-2">
//                 Cancel
//               </button>
//               <button className="bg-green-600 text-white px-4 py-2 rounded">
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// /* SUMMARY CARD */
// const SummaryCard = ({ label, value, icon }) => (
//   <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow">
//     <div className="text-[#1f2f86]">{icon}</div>
//     <div>
//       <p className="text-xs text-gray-400 uppercase">{label}</p>
//       <p className="text-xl sm:text-2xl font-bold">{value}</p>
//     </div>
//   </div>
// );

// export default ExecutiveManagement;

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Search,
  Trash2,
  UserPlus,
  Users,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

const hideScrollbarCSS = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const ExecutiveManagement = () => {
  const [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

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
            onClick={() => setOpenModal(true)}
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
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      <Trash2 size={14} />
                    </button>
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
            onSubmit={handleCreate}
            className="w-full max-w-md rounded-xl bg-white p-5 space-y-3"
          >
            <h2 className="text-lg font-bold">Add Executive</h2>

            <input name="Name" placeholder="Name" onChange={handleChange} className="w-full border p-2 rounded" />
            <input name="Email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" />
            <input name="mobileNo" placeholder="Mobile" onChange={handleChange} className="w-full border p-2 rounded" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 rounded" />

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExecutiveManagement;