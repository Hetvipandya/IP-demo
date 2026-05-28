// import { useEffect, useState } from "react";
// import {
//   CheckCircle2,
//   Mail,
//   Search,
//   ShieldCheck,
//   Trash2,
//   UserCheck,
//   Users, 
//   Eye
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

// const DealerManagement = () => {
//   const [dealers, setDealers] = useState([]);
//   const [selectedDealer, setSelectedDealer] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchDealers();
//   }, []);

//   const fetchDealers = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         "https://insurance-backend-eufn.onrender.com/api/user/dealers"
//       );

//       const data = await res.json();
//       const allUsers = Array.isArray(data) ? data : data.users || [];

//       const filtered = allUsers
//         .filter((u) => u.role === "dealer")
//         .sort((a, b) =>
//           a.isApproved !== b.isApproved
//             ? b.isApproved - a.isApproved
//             : new Date(b.createdAt) - new Date(a.createdAt)
//         );

//       setDealers(filtered);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApproval = async (id) => {
//     await fetch(
//       `https://insurance-backend-eufn.onrender.com/api/user/approve/${id}`,
//       { method: "PUT" }
//     );
//     fetchDealers();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     await fetch(
//       `https://insurance-backend-eufn.onrender.com/api/user/delete/${id}`,
//       { method: "DELETE" }
//     );

//     setDealers((prev) => prev.filter((d) => d._id !== id));
//   };

//   const filteredDealers = dealers.filter((d) => {
//     const q = search.toLowerCase();
//     return (
//       d.fullName?.toLowerCase().includes(q) ||
//       d.emailId?.toLowerCase().includes(q)
//     );
//   });

//   const approvedCount = dealers.filter((d) => d.isApproved).length;

//   return (
//     <div className="relative min-h-screen overflow-hidden rounded-[2rem] border border-white bg-[#f7f8fc] p-3 sm:p-5 md:p-7 shadow-2xl shadow-[#1f2f86]/10">
//       <style>{hideScrollbarCSS}</style>

//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(230,54,46,0.13),transparent_28%),radial-gradient(circle_at_90%_8%,rgba(31,47,134,0.17),transparent_35%)]" />

//       {/* HEADER */}
//       <div className="relative mb-5 flex flex-col gap-4 rounded-[1.5rem] border border-white/80 bg-white/80 p-4 sm:p-5 shadow-xl md:flex-row md:items-center md:justify-between">
//         <div>
//           <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#e6362e]">
//             Admin Workspace
//           </p>
//           <h1 className="text-2xl sm:text-3xl font-black text-[#121a43]">
//             Dealer Management
//           </h1>
//           <p className="text-xs sm:text-sm text-slate-500">
//             Manage dealer accounts and approvals
//           </p>
//         </div>

//         <div className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 sm:px-4 sm:py-3 w-full md:w-auto">
//           <Search size={18} />
//           <input
//             className="outline-none text-sm w-full"
//             placeholder="Search dealers..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* SUMMARY */}
//       <div className="relative mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         <SummaryCard label="Total Dealers" value={dealers.length} icon={<Users />} />
//         <SummaryCard label="Pending" value={dealers.length - approvedCount} icon={<UserCheck />} />
//         <SummaryCard label="Approved" value={approvedCount} icon={<CheckCircle2 />} />
//       </div>

//       {/* TABLE WRAPPER */}
//       <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/40 mesh-gradient p-[2px] shadow-2xl">
//         <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-[#121a43]/40 backdrop-blur-xl p-4 sm:p-6 md:p-8">

//           {/* HEADER */}
//           <div className="mb-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-white">
//             <div className="flex items-center gap-3">
//               <ShieldCheck />
//               <h2 className="text-lg sm:text-xl font-black">Dealer List</h2>
//             </div>

//             <span className="text-xs text-white/70">
//               {filteredDealers.length} results
//             </span>
//           </div>

//           {/* TABLE */}
//           <div className="hide-scrollbar max-h-[60vh] overflow-auto rounded-2xl border border-white/10">
//             <table className="w-full min-w-[600px] text-sm">
//               <thead className="sticky top-0 bg-[#1f2f86]/80 text-white/70">
//                 <tr>
//                   <th className="p-3 sm:p-4 text-left">Name</th>
//                   <th className="p-3 sm:p-4 text-left">Email</th>
//                   <th className="p-3 sm:p-4 text-left">Status</th>
//                   <th className="p-3 sm:p-4 text-center">Actions</th>
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
//                   filteredDealers.map((d) => (
//                     <tr key={d._id} className="hover:bg-white/5 transition">
//                       <td className="p-3 sm:p-4 text-white font-semibold">
//                         {d.fullName}
//                       </td>

//                       <td className="p-3 sm:p-4 text-white/70 flex items-center gap-2">
//                         <Mail size={14} />
//                         <span className="break-all">{d.emailId}</span>
//                       </td>

//                       <td className="p-3 sm:p-4">
//                         {d.isApproved ? (
//                           <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-green-500/20 text-green-300">
//                             APPROVED
//                           </span>
//                         ) : (
//                           <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-white/10 text-white/70">
//                             PENDING
//                           </span>
//                         )}
//                       </td>

//                       <td className="p-3 sm:p-4 text-center">
//                         <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
//                             <button
//       onClick={() => setSelectedDealer(d)}
//       className="w-full sm:w-auto p-2 rounded-lg bg-white/10 text-white"
//     >
//       <Eye size={14} />
//     </button>
//    {selectedDealer && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
    
//     <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">
      
//       <h2 className="text-xl font-bold mb-4 text-center">
//         Dealer Details
//       </h2>

//       {/* TABLE FORMAT */}
//       <div className="overflow-hidden rounded-xl border border-gray-200">
//         <table className="w-full text-sm">
//           <tbody>
//             <tr className="border-b">
//               <td className="p-2 font-semibold bg-gray-50">Name</td>
//               <td className="p-2">{selectedDealer.fullName}</td>
//             </tr>

//             <tr className="border-b">
//               <td className="p-2 font-semibold bg-gray-50">Email</td>
//               <td className="p-2 break-all">{selectedDealer.emailId}</td>
//             </tr>

//             <tr className="border-b">
//               <td className="p-2 font-semibold bg-gray-50">Mobile</td>
//               <td className="p-2">{selectedDealer.mobileNumber}</td>
//             </tr>

//             <tr className="border-b">
//               <td className="p-2 font-semibold bg-gray-50">Role</td>
//               <td className="p-2">{selectedDealer.role}</td>
//             </tr>

//             <tr className="border-b">
//               <td className="p-2 font-semibold bg-gray-50">Address</td>
//               <td className="p-2">{selectedDealer.address || "-"}</td>
//             </tr>

//             <tr className="border-b">
//               <td className="p-2 font-semibold bg-gray-50">Status</td>
//               <td className="p-2">
//                 {selectedDealer.isApproved ? "Approved" : "Pending"}
//               </td>
//             </tr>

           
//           </tbody>
//         </table>
//       </div>

//       {/* CLOSE BUTTON */}
//       <button
//         onClick={() => setSelectedDealer(null)}
//         className="mt-5 px-4 py-2 bg-[#1f2f86] text-white rounded-lg w-full"
//       >
//         Close
//       </button>

//     </div>
//   </div>
// )}

//                           {!d.isApproved && (
//                             <button
//                               onClick={() => handleApproval(d._id)}
//                               className="w-full sm:w-auto px-3 py-1 text-xs bg-white text-[#1f2f86] rounded-lg"
//                             >
//                               Approve
//                             </button>
//                           )}

//                           <button
//                             onClick={() => handleDelete(d._id)}
//                             className="w-full sm:w-auto p-2 rounded-lg bg-white/10 text-white hover:bg-red-500"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };
 
// /* SUMMARY CARD */
// const SummaryCard = ({ label, value, icon }) => (
//   <div className="flex items-center gap-4 rounded-2xl bg-white p-4 sm:p-5 shadow">
//     <div className="text-[#1f2f86]">{icon}</div>
//     <div>
//       <p className="text-[10px] sm:text-xs text-gray-400 uppercase">{label}</p>
//       <p className="text-xl sm:text-2xl font-bold">{value}</p>
//     </div>
//   </div>
// );

// export default DealerManagement;

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Mail,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
  Eye,
} from "lucide-react";

const DealerManagement = () => {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://insurance-backend-eufn.onrender.com/api/user/dealers"
      );

      const data = await res.json();
      const allUsers = Array.isArray(data) ? data : data.users || [];

      const filtered = allUsers
        .filter((u) => u.role === "dealer")
        .sort((a, b) =>
          a.isApproved !== b.isApproved
            ? b.isApproved - a.isApproved
            : new Date(b.createdAt) - new Date(a.createdAt)
        );

      setDealers(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id) => {
    await fetch(
      `https://insurance-backend-eufn.onrender.com/api/user/approve/${id}`,
      { method: "PUT" }
    );
    fetchDealers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await fetch(
      `https://insurance-backend-eufn.onrender.com/api/user/delete/${id}`,
      { method: "DELETE" }
    );

    setDealers((prev) => prev.filter((d) => d._id !== id));
  };

  const filteredDealers = dealers.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.fullName?.toLowerCase().includes(q) ||
      d.emailId?.toLowerCase().includes(q)
    );
  });

  const approvedCount = dealers.filter((d) => d.isApproved).length;

  return (
    <div className="min-h-screen bg-[#f7f8fc] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-[#1f2f86]">
          Dealer Management
        </h1>

        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white">
          <Search size={16} />
          <input
            className="outline-none"
            placeholder="Search dealers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full border-collapse">

          {/* HEAD */}
          <thead className="bg-[#1f2f86] text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : (
              filteredDealers.map((d) => (
                <tr key={d._id} className="border-b hover:bg-gray-50">

                  {/* NAME */}
                  <td className="p-3 font-medium">{d.fullName}</td>

                  {/* EMAIL */}
                  <td className="p-3 flex items-center gap-2 text-gray-600">
                    <Mail size={14} />
                    {d.emailId}
                  </td>

                  {/* STATUS */}
                  <td className="p-3 text-center">
                    {d.isApproved ? (
                      <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                        Approved
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3">
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => setSelectedDealer(d)}
                        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        <Eye size={14} />
                      </button>

                      {!d.isApproved && (
                        <button
                          onClick={() => handleApproval(d._id)}
                          className="px-3 py-1 text-xs bg-[#1f2f86] text-white rounded"
                        >
                          Approve
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(d._id)}
                        className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL (OUTSIDE TABLE - FIXED) */}
      {selectedDealer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

          <div className="bg-white w-[90%] max-w-md rounded-xl p-6 shadow-xl">

            <h2 className="text-xl font-bold mb-4 text-center">
              Dealer Details
            </h2>

            <table className="w-full text-sm border">
              <tbody>
                <tr><td className="p-2 font-semibold">Name</td><td>{selectedDealer.fullName}</td></tr>
                <tr><td className="p-2 font-semibold">Email</td><td>{selectedDealer.emailId}</td></tr>
                <tr><td className="p-2 font-semibold">Mobile</td><td>{selectedDealer.mobileNumber}</td></tr>
                <tr><td className="p-2 font-semibold">Role</td><td>{selectedDealer.role}</td></tr>
                <tr><td className="p-2 font-semibold">Address</td><td>{selectedDealer.address || "-"}</td></tr>
                <tr><td className="p-2 font-semibold">Status</td><td>{selectedDealer.isApproved ? "Approved" : "Pending"}</td></tr>
              </tbody>
            </table>

            <button
              onClick={() => setSelectedDealer(null)}
              className="mt-4 w-full bg-[#1f2f86] text-white py-2 rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default DealerManagement;