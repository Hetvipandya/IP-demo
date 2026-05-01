// // import { useEffect, useState } from "react";
// // import { 
// //   Clock, XCircle, FileText, Activity, CheckCircle2, UserCheck, Eye, ShieldCheck, Trash2, RotateCcw, MapPin, Calendar 
// // } from "lucide-react";
// // import ApplicationDetail from "./applicationDetail";

// // const hideScrollbarCSS = `
// //   .hide-scrollbar::-webkit-scrollbar { display: none; }
// //   .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// // `;

// // // Dummy data for when real applications are fetching or empty
// // const dummyApplications = [
// //   { _id: "1", applicantName: "Rahul Sharma", policyType: "Vehicle Insurance", date: "24 Apr 2026", status: "Pending", city: "Ahmedabad" },
// //   { _id: "2", applicantName: "Priya Patel", policyType: "Life Insurance", date: "23 Apr 2026", status: "Pending", city: "Surat" },
// //   { _id: "3", applicantName: "Amit Varma", policyType: "Health Insurance", date: "22 Apr 2026", status: "Pending", city: "Rajkot" },
// // ];

// // const AdminHome = () => {
// //   const [selectedApp, setSelectedApp] = useState(null);
// //   const [dealers, setDealers] = useState([]);
// //   const [applications, setApplications] = useState([]);

// //   useEffect(() => {
// //     fetchDealers();
// //     // અહિંયા તમે તમારી real applications fetch કરી શકો, અત્યારે dummy સેટ કરી છે
// //     setApplications(dummyApplications);
// //   }, []);

// //   const stats = { total: 120, pending: 25, approved: 70, rejected: 15, recent: 10 };

// //   const fetchDealers = async () => {
// //     try {
// //       const res = await fetch("https://insurance-backend-eufn.onrender.com/api/user/dealers"); 
// //       const responseData = await res.json();
// //       const allUsers = Array.isArray(responseData) ? responseData : responseData.users || [];
// //       const dealerList = allUsers.filter(user => user.role === "dealer");
// //       setDealers(dealerList);
// //     } catch (err) {
// //       console.error("Failed to fetch dealers:", err);
// //     }
// //   };

// //   const handleApproval = async (id) => {
// //     try {
// //       const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/user/approve/${id}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" }
// //       });
// //       if (res.ok) {
// //         alert("Dealer Approved Successfully!");
// //         fetchDealers(); 
// //       }
// //     } catch (err) {
// //       console.error("Error approving dealer:", err);
// //     }
// //   };

// //   const handleReject = async (id) => {
// //     if (!window.confirm("Are you sure you want to reject this dealer and move back to pending?")) return;
// //     try {
// //       const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/user/reject/${id}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" }
// //       });
// //       if (res.ok) {
// //         alert("Dealer Rejected!");
// //         fetchDealers(); 
// //       }
// //     } catch (err) {
// //       console.error("Error rejecting dealer:", err);
// //     }
// //   };

// // const handleDelete = async (id) => {
// //   if (!window.confirm("Are you sure you want to delete this dealer permanently?")) return;

// //   try {
// //     const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/user/delete/${id}`, {
// //       method: "DELETE",
// //       headers: { "Content-Type": "application/json" }
// //     });

// //     const data = await res.json();

// //     if (res.ok) {
// //       alert(data.message);

// //       // ✅ UI mathi instantly remove
// //       setDealers((prev) => prev.filter((dealer) => dealer._id !== id));

// //     } else {
// //       alert(data.message);
// //     }

// //   } catch (err) {
// //     console.error("Error deleting dealer:", err);
// //   }
// // };

// //   if (selectedApp) {
// //     return <ApplicationDetail application={selectedApp} onBack={() => setSelectedApp(null)} />;
// //   }

// //   return (
// //     <div className="w-full min-h-screen bg-gray-50/50 flex flex-col font-sans overflow-hidden">
// //       <style>{hideScrollbarCSS}</style>
      
// //       {/* Header */}
// //       <div className="flex-none p-4 md:p-8 pb-0">
// //         <div className="bg-white/60 backdrop-blur-md border border-white rounded-3xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center shadow-xl shadow-gray-200/50">
// //           <h1 className="text-3xl font-black text-slate-800 tracking-tight">Dashboard <span className="font-light text-slate-400">Insights</span></h1>
// //         </div>
        
// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
// //           <StatCard label="Total Policies" value={stats.total} color="bg-blue-600" icon={<FileText size={20}/>} />
// //           <StatCard label="Pending" value={stats.pending} color="bg-amber-500" icon={<Clock size={20}/>} />
// //           <StatCard label="Approved" value={stats.approved} color="bg-emerald-500" icon={<CheckCircle2 size={20}/>} />
// //           <StatCard label="Declined" value={stats.rejected} color="bg-rose-500" icon={<XCircle size={20}/>} />
// //         </div>
// //       </div>

// //       <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:p-8 pt-0 overflow-hidden mb-6">
        
// //         {/* Left Section: Pending Applications */}
// //         <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col overflow-hidden border border-slate-800">
// //           <h3 className="text-2xl font-bold flex items-center gap-3 mb-6"><FileText className="text-blue-400" /> Pending Applications</h3>
// //           <div className="flex-grow space-y-4 overflow-y-auto pr-2 hide-scrollbar">
// //             {applications.map((app) => (
// //               <div key={app._id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/10 transition-all group">
// //                 <div>
// //                   <div className="flex items-center gap-2 mb-1">
// //                     <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{app.applicantName}</h4>
// //                     <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>
// //                   </div>
// //                   <div className="flex flex-wrap gap-4 text-slate-400 text-xs">
// //                     <span className="flex items-center gap-1"><Activity size={12}/> {app.policyType}</span>
// //                     <span className="flex items-center gap-1"><MapPin size={12}/> {app.city}</span>
// //                     <span className="flex items-center gap-1"><Calendar size={12}/> {app.date}</span>
// //                   </div>
// //                 </div>
// //                 <button 
// //                   onClick={() => setSelectedApp(app)}
// //                   className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
// //                 >
// //                   <Eye size={14}/> View Details
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Right Section: Dealer Management */}
// //         <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col overflow-hidden border border-white/10">
// //             <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><ShieldCheck className="text-indigo-200" /> Dealer Management</h3>
// //             <div className="flex-grow space-y-3 overflow-y-auto hide-scrollbar">
// //               {dealers.length > 0 ? dealers.map((dealer) => (
// //                 <div key={dealer._id} className={`p-4 rounded-2xl border transition-all ${dealer.isApproved ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-white/10 border-white/5'}`}>
// //                   <div className="flex justify-between items-start mb-2">
// //                     <h4 className="font-bold text-sm text-white truncate pr-2">{dealer.fullName}</h4>
// //                     {dealer.isApproved && (
// //                       <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0">
// //                         <CheckCircle2 size={10} /> APPROVED
// //                       </span>
// //                     )}
// //                   </div>
// //                   <p className="text-indigo-200 text-xs mb-1">{dealer.emailId}</p>
// //                   <p className="text-indigo-200 text-[10px] mb-3 opacity-70">{dealer.mobileNumber}</p>
                  
// //                   <div className="grid grid-cols-2 gap-2">
// //                     {!dealer.isApproved ? (
// //                       <button 
// //                         onClick={() => handleApproval(dealer._id)}
// //                         className="bg-white text-blue-700 py-1.5 rounded-lg font-bold text-xs hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1"
// //                       >
// //                         <UserCheck size={14} /> Approve
// //                       </button>
// //                     ) : (
// //                       <button 
// //                         onClick={() => handleReject(dealer._id)}
// //                         className="bg-amber-500 text-white py-1.5 rounded-lg font-bold text-xs hover:bg-amber-600 transition-colors flex items-center justify-center gap-1 shadow-lg shadow-amber-900/20"
// //                       >
// //                         <RotateCcw size={14} /> Reject
// //                       </button>
// //                     )}

// //                     <button 
// //                       onClick={() => handleDelete(dealer._id)}
// //                       className="bg-rose-500/20 text-white py-1.5 rounded-lg font-bold text-xs hover:bg-rose-500/40 transition-colors flex items-center justify-center gap-1 border border-rose-500/30"
// //                     >
// //                       <Trash2 size={14} /> Delete
// //                     </button>
// //                   </div>
// //                 </div>
// //               )) : (
// //                 <div className="flex flex-col items-center justify-center py-10 opacity-40">
// //                    <UserCheck size={40} className="mb-2"/>
// //                    <p className="text-sm">No dealers found</p>
// //                 </div>
// //               )}
// //             </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const StatCard = ({ label, value, color, icon }) => (
// //   <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg flex items-center gap-5">
// //     <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>{icon}</div>
// //     <div>
// //       <h2 className="text-xs font-bold text-slate-400 uppercase">{label}</h2>
// //       <p className="text-2xl font-black text-slate-800">{value}</p>
// //     </div>
// //   </div>
// // );

// // export default AdminHome;

// import { useEffect, useState } from "react";
// import { 
//   Clock, XCircle, FileText, Activity, CheckCircle2, UserCheck, Eye, ShieldCheck, Trash2, RotateCcw, MapPin, Calendar 
// } from "lucide-react";
// import ApplicationDetail from "./applicationDetail";

// const hideScrollbarCSS = `
//   .hide-scrollbar::-webkit-scrollbar { display: none; }
//   .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// `;

// const AdminHome = () => {
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [dealers, setDealers] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDealers();
//     fetchApplications();
//   }, []);

//   // ✅ Backend API માંથી Applications Fetch કરવાનું ફંક્શન
// const fetchApplications = async () => {
//   try {
//     setLoading(true);
//     const token = localStorage.getItem("token"); 

//     console.log("Fetching with token:", token); // Log 1

//     const res = await fetch("https://insurance-backend-eufn.onrender.com/api/application/my", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}` 
//       }
//     });

//     console.log("Response Status:", res.status); // Log 2

//     const data = await res.json();
//     console.log("Raw Data from API:", data); // Log 3

//     setApplications(Array.isArray(data) ? data : []);
//   } catch (err) {
//     console.error("Fetch error:", err);
//   } finally {
//     setLoading(false);
//   }
// };

//   const fetchDealers = async () => {
//     try {
//       const res = await fetch("https://insurance-backend-eufn.onrender.com/api/user/dealers"); 
//       const responseData = await res.json();
//       const allUsers = Array.isArray(responseData) ? responseData : responseData.users || [];
//       const dealerList = allUsers.filter(user => user.role === "dealer");
//       setDealers(dealerList);
//     } catch (err) {
//       console.error("Failed to fetch dealers:", err);
//     }
//   };

//   // Stats ડેટાને ડાયનેમિકલી ગણવા માટે
//   const stats = { 
//     total: applications.length, 
//     pending: applications.length, // અત્યારે બધી એપ્લિકેશન પેન્ડિંગ ગણીએ છીએ
//     approved: 70, 
//     rejected: 15 
//   };

//   // --- Actions ---
//   const handleApproval = async (id) => {
//     try {
//       const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/user/approve/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" }
//       });
//       if (res.ok) {
//         alert("Dealer Approved Successfully!");
//         fetchDealers(); 
//       }
//     } catch (err) {
//       console.error("Error approving dealer:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/user/delete/${id}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" }
//       });
//       if (res.ok) {
//         setDealers((prev) => prev.filter((dealer) => dealer._id !== id));
//       }
//     } catch (err) {
//       console.error("Error deleting dealer:", err);
//     }
//   };

//   if (selectedApp) {
//     return <ApplicationDetail application={selectedApp} onBack={() => setSelectedApp(null)} />;
//   }

//   return (
//     <div className="w-full min-h-screen bg-gray-50/50 flex flex-col font-sans overflow-hidden">
//       <style>{hideScrollbarCSS}</style>
      
//       <div className="flex-none p-4 md:p-8 pb-0">
//         <div className="bg-white/60 backdrop-blur-md border border-white rounded-3xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center shadow-xl shadow-gray-200/50">
//           <h1 className="text-3xl font-black text-slate-800 tracking-tight">Dashboard <span className="font-light text-slate-400">Insights</span></h1>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <StatCard label="Total Policies" value={stats.total} color="bg-blue-600" icon={<FileText size={20}/>} />
//           <StatCard label="Pending" value={stats.pending} color="bg-amber-500" icon={<Clock size={20}/>} />
//           <StatCard label="Approved" value={stats.approved} color="bg-emerald-500" icon={<CheckCircle2 size={20}/>} />
//           <StatCard label="Declined" value={stats.rejected} color="bg-rose-500" icon={<XCircle size={20}/>} />
//         </div>
//       </div>

//       <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:p-8 pt-0 overflow-hidden mb-6">
        
//         {/* Left Section: Live Applications from API */}
//         <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col overflow-hidden border border-slate-800">
//           <h3 className="text-2xl font-bold flex items-center gap-3 mb-6"><FileText className="text-blue-400" /> Pending Applications</h3>
          
//           <div className="flex-grow space-y-4 overflow-y-auto pr-2 hide-scrollbar">
//             {loading ? (
//               <div className="text-center py-10 opacity-50">Loading data...</div>
//             ) : applications.length > 0 ? (
//               applications.map((app) => (
//                 <div key={app._id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/10 transition-all group">
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       {/* carNo ને ટાઇટલ તરીકે વાપર્યું */}
//                       <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{app.carNo}</h4>
//                       <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>
//                     </div>
//                     <div className="flex flex-wrap gap-4 text-slate-400 text-xs">
//                       {/* otherDetails અને createdAt નો ઉપયોગ */}
//                       <span className="flex items-center gap-1"><Activity size={12}/> {app.otherDetails}</span>
//                       <span className="flex items-center gap-1"><ShieldCheck size={12}/> {app.tp.toUpperCase()}</span>
//                       <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(app.createdAt).toLocaleDateString()}</span>
//                     </div>
//                   </div>
//                   <button 
//                     onClick={() => setSelectedApp(app)}
//                     className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
//                   >
//                     <Eye size={14}/> View Details
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-10 opacity-40">No applications found.</div>
//             )}
//           </div>
//         </div>

//         {/* Right Section: Dealer Management */}
//         <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col overflow-hidden border border-white/10">
//             <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><ShieldCheck className="text-indigo-200" /> Dealer Management</h3>
//             <div className="flex-grow space-y-3 overflow-y-auto hide-scrollbar">
//               {dealers.map((dealer) => (
//                 <div key={dealer._id} className={`p-4 rounded-2xl border transition-all ${dealer.isApproved ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-white/10 border-white/5'}`}>
//                   <div className="flex justify-between items-start mb-2">
//                     <h4 className="font-bold text-sm text-white truncate pr-2">{dealer.fullName}</h4>
//                     {dealer.isApproved && <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0"><CheckCircle2 size={10} /> APPROVED</span>}
//                   </div>
//                   <p className="text-indigo-200 text-xs mb-1">{dealer.emailId}</p>
                  
//                   <div className="grid grid-cols-2 gap-2 mt-3">
//                     {!dealer.isApproved && (
//                       <button onClick={() => handleApproval(dealer._id)} className="bg-white text-blue-700 py-1.5 rounded-lg font-bold text-xs hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1"><UserCheck size={14} /> Approve</button>
//                     )}
//                     <button onClick={() => handleDelete(dealer._id)} className="bg-rose-500/20 text-white py-1.5 rounded-lg font-bold text-xs hover:bg-rose-500/40 transition-colors flex items-center justify-center gap-1 border border-rose-500/30"><Trash2 size={14} /> Delete</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ label, value, color, icon }) => (
//   <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg flex items-center gap-5">
//     <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>{icon}</div>
//     <div>
//       <h2 className="text-xs font-bold text-slate-400 uppercase">{label}</h2>
//       <p className="text-2xl font-black text-slate-800">{value}</p>
//     </div>
//   </div>
// );

// export default AdminHome;

import { useEffect, useState } from "react";
import { 
  Clock, XCircle, FileText, Activity, CheckCircle2, UserCheck, Eye, ShieldCheck, Trash2, RotateCcw, MapPin, Calendar 
} from "lucide-react";
import ApplicationDetail from "./applicationDetail";

const hideScrollbarCSS = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const AdminHome = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [dealers, setDealers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDealers();
    fetchApplications();
  }, []);

  // ✅ Backend API માંથી Applications Fetch કરવાનું ફંક્શન
const fetchApplications = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://insurance-backend-eufn.onrender.com/api/application/my",
      {
        headers: {
          "Authorization": `Bearer ${token}`,   // ✅ MUST
          "Content-Type": "application/json"
        }
      }
    );

    const data = await res.json();

    console.log("API DATA:", data);
    console.log("FRONTEND TOKEN:", token);
    console.log("userId", data.userId);

    if (Array.isArray(data)) {
      setApplications(data);
    } else {
      setApplications([]);
    }

  } catch (err) {
    console.error("Fetch error:", err);
    setApplications([]);
  } finally {
    setLoading(false);
  }
};

  const fetchDealers = async () => {
    try {
      const res = await fetch("https://insurance-backend-eufn.onrender.com/api/user/dealers"); 
      const responseData = await res.json();
      const allUsers = Array.isArray(responseData) ? responseData : responseData.users || [];
      const dealerList = allUsers.filter(user => user.role === "dealer");
      setDealers(dealerList);
    } catch (err) {
      console.error("Failed to fetch dealers:", err);
    }
  };

  // Stats ડાયનેમિકલી ગણવા માટે
  const stats = { 
    total: applications.length, 
    pending: applications.length, 
    approved: 0, // ભવિષ્યમાં status ફિલ્ડ ઉમેરીને ગણી શકાય
    rejected: 0 
  };

  // --- Actions ---
  const handleApproval = async (id) => {
    try {
      const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/user/approve/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        alert("Dealer Approved Successfully!");
        fetchDealers(); 
      }
    } catch (err) {
      console.error("Error approving dealer:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/user/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        setDealers((prev) => prev.filter((dealer) => dealer._id !== id));
      }
    } catch (err) {
      console.error("Error deleting dealer:", err);
    }
  };

  if (selectedApp) {
    return <ApplicationDetail application={selectedApp} onBack={() => setSelectedApp(null)} />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50/50 flex flex-col font-sans overflow-hidden">
      <style>{hideScrollbarCSS}</style>
      
      <div className="flex-none p-4 md:p-8 pb-0">
        <div className="bg-white/60 backdrop-blur-md border border-white rounded-3xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center shadow-xl shadow-gray-200/50">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Dashboard <span className="font-light text-slate-400">Insights</span></h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard label="Total Policies" value={stats.total} color="bg-blue-600" icon={<FileText size={20}/>} />
          <StatCard label="Pending" value={stats.pending} color="bg-amber-500" icon={<Clock size={20}/>} />
          <StatCard label="Approved" value={stats.approved} color="bg-emerald-500" icon={<CheckCircle2 size={20}/>} />
          <StatCard label="Declined" value={stats.rejected} color="bg-rose-500" icon={<XCircle size={20}/>} />
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:p-8 pt-0 overflow-hidden mb-6">
        
        {/* Left Section: Live Applications from API */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col overflow-hidden border border-slate-800">
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-6"><FileText className="text-blue-400" /> Pending Applications</h3>
          
          <div className="flex-grow space-y-4 overflow-y-auto pr-2 hide-scrollbar">
            {loading ? (
              <div className="text-center py-10 opacity-50">Loading data...</div>
            ) : applications.length > 0 ? (
              applications.map((app) => (
                <div key={app._id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/10 transition-all group">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {/* Postman મુજબ carNo ફિલ્ડ વાપર્યું */}
                      <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{app.carNo}</h4>
                      <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-slate-400 text-xs">
                      {/* image_677a44.png મુજબ tp અને otherDetails વાપર્યા */}
                      <span className="flex items-center gap-1"><Activity size={12}/> Type: {app.tp}</span>
                      <span className="flex items-center gap-1"><FileText size={12}/> {app.otherDetails || "No details"}</span>
                      <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedApp(app)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
                  >
                    <Eye size={14}/> View Details
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 opacity-40">No applications found.</div>
            )}
          </div>
        </div>

        {/* Right Section: Dealer Management */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col overflow-hidden border border-white/10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><ShieldCheck className="text-indigo-200" /> Dealer Management</h3>
            <div className="flex-grow space-y-3 overflow-y-auto hide-scrollbar">
              {dealers.map((dealer) => (
                <div key={dealer._id} className={`p-4 rounded-2xl border transition-all ${dealer.isApproved ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-white/10 border-white/5'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm text-white truncate pr-2">{dealer.fullName}</h4>
                    {dealer.isApproved && <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0"><CheckCircle2 size={10} /> APPROVED</span>}
                  </div>
                  <p className="text-indigo-200 text-xs mb-1">{dealer.emailId}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {!dealer.isApproved && (
                      <button onClick={() => handleApproval(dealer._id)} className="bg-white text-blue-700 py-1.5 rounded-lg font-bold text-xs hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1"><UserCheck size={14} /> Approve</button>
                    )}
                    <button onClick={() => handleDelete(dealer._id)} className="bg-rose-500/20 text-white py-1.5 rounded-lg font-bold text-xs hover:bg-rose-500/40 transition-colors flex items-center justify-center gap-1 border border-rose-500/30"><Trash2 size={14} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg flex items-center gap-5">
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>{icon}</div>
    <div>
      <h2 className="text-xs font-bold text-slate-400 uppercase">{label}</h2>
      <p className="text-2xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export default AdminHome;