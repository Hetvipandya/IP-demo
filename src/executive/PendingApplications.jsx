// import { useEffect, useState } from "react";
// import { Activity, Calendar, Eye, FileText, Search } from "lucide-react";
// import ApplicationDetail from "./applicationDetail";

// const hideScrollbarCSS = `
//   .hide-scrollbar::-webkit-scrollbar { display: none; }
//   .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// `;

// const PendingApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [loadingApplicationId, setLoadingApplicationId] = useState(null);
//   const [search, setSearch] = useState("");
 
//   useEffect(() => {
//     fetchApplications();
//   }, []);

// const fetchApplications = async () => {
//   try {
//     setLoading(true);

//     const token =
//       localStorage.getItem("executiveToken") ||
//       localStorage.getItem("token");
//       const executiveId = localStorage.getItem("executiveId");
//     if (!token) {
//       setApplications([]);
//       return;
//     }

//   const res = await fetch(
//   `https://insurance-backend-eufn.onrender.com/api/application/executive/${executiveId}`,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   }
// );

//     const data = await res.json();
//     const allApps = Array.isArray(data) ? data : [];

//     // ✅ ONLY PENDING FILTER
//     const pendingApps = allApps.filter(
//       (app) => app.status === "pending"
//     );

//     setApplications(pendingApps);
//   } catch (err) {
//     console.error("Fetch error:", err);
//     setApplications([]);
//   } finally {
//     setLoading(false);
//   }
// };

// const handleViewDetails = async (id) => {
//   const token =
//     localStorage.getItem("executiveToken") ||
//     localStorage.getItem("token");

//   if (!token) {
//     console.warn("No admin token found in localStorage");
//     return;
//   }

//   try {
//     setLoadingApplicationId(id);

//     const res = await fetch(
//       `https://insurance-backend-eufn.onrender.com/api/application/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = await res.json();

//     // 🔥 IMPORTANT FIX
//     if (!res.ok) {
//       console.error(data?.message || "Access denied");
//       return;
//     }

//     setSelectedApp(data);
//   } catch (err) {
//     console.error("Error fetching application details:", err);
//   } finally {
//     setLoadingApplicationId(null);
//   }
// };

//   const filteredApplications = applications.filter((app) => {
//     const query = search.toLowerCase();
//     return (
//       app.carNo?.toLowerCase().includes(query) ||
//       app.tp?.toLowerCase().includes(query) ||
//       app.otherDetails?.toLowerCase().includes(query) ||
//       app.user?.fullName?.toLowerCase().includes(query)
//     );
//   });

//   if (selectedApp) {
//     return <ApplicationDetail application={selectedApp} onBack={() => setSelectedApp(null)} />;
//   }

//   return (
//     <div className="relative min-h-screen overflow-hidden rounded-[1.75rem] border border-white bg-[#f7f8fc] p-4 shadow-2xl shadow-[#1f2f86]/10 md:p-7">
//       <style>{hideScrollbarCSS}</style>
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(230,54,46,0.13),transparent_28%),radial-gradient(circle_at_90%_5%,rgba(31,47,134,0.17),transparent_35%)]" />

//       <div className="relative mb-6 flex flex-col gap-4 rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-xl shadow-[#1f2f86]/10 md:flex-row md:items-center md:justify-between">
//         <div>
//           {/* <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e6362e]">Admin Workspace</p> */}
//           <h1 className="mt-2 text-3xl font-black text-[#121a43]">Pending Applications</h1>
//           <p className="mt-1 text-sm font-medium text-slate-500">Review every submitted policy file in a larger, focused view.</p>
//         </div>

//         <div className="flex items-center gap-2 rounded-2xl border border-[#dfe5f3] bg-white px-4 py-3 text-[#1f2f86]">
//           <Search size={18} />
//           <input
//             value={search}
//             onChange={(event) => setSearch(event.target.value)}
//             placeholder="Search applications"
//             className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400 md:w-64"
//           />
//         </div>
//       </div>

//       <div className="relative rounded-[1.75rem] border border-[#dbe6ff] bg-gradient-to-br from-white via-[#f7faff] to-[#eaf1ff] p-5 text-[#121a43] shadow-2xl shadow-[#1f2f86]/10 md:p-7">
//         <div className="mb-5 flex items-center justify-between">
//           <h2 className="flex items-center gap-3 text-2xl font-black">
//             <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1f2f86] text-white shadow-lg shadow-[#1f2f86]/25">
//               <FileText size={21} />
//             </span>
//             Application Queue
//           </h2>
//           <span className="rounded-full border border-[#cdd9f2] bg-white px-3 py-1.5 text-xs font-black text-[#1f2f86] shadow-sm">
//             {filteredApplications.length} shown
//           </span>
//         </div>

//         <div className="hide-scrollbar max-h-[68vh] space-y-4 overflow-y-auto pr-1">
//           {loading ? (
//             <div className="rounded-2xl border border-[#dbe6ff] bg-white py-14 text-center text-sm font-semibold text-slate-500 shadow-sm">
//               Loading applications...
//             </div>
//           ) : filteredApplications.length > 0 ? (
//             filteredApplications.map((app) => (
//               <div
//                 key={app._id}
//                 className="group relative grid overflow-hidden rounded-2xl border border-[#dbe6ff] bg-white p-5 pl-6 shadow-lg shadow-[#1f2f86]/10 transition-all hover:-translate-y-0.5 hover:border-[#9fb6ee] hover:shadow-xl hover:shadow-[#1f2f86]/10 lg:grid-cols-[1.2fr_1fr_auto]"
//               >
//                 <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-gradient-to-b from-[#1f2f86] to-[#e6362e]" />
//                 <div>
//                   <div className="mb-2 flex items-center gap-2">
//                     <h3 className="text-xl font-black text-[#121a43] group-hover:text-[#1f2f86]">{app.carNo || "Unknown Vehicle"}</h3>
//                     <span className="rounded-full bg-[#e6362e]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#e6362e]">
//                       New
//                     </span>
//                   </div>
//                   <p className="text-sm font-semibold text-slate-500">{app.user?.fullName || "Dealer name not available"}</p>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
//                   <span className="flex items-center gap-1 rounded-full bg-[#f4f7ff] px-3 py-1">
//                     <Activity size={12} /> Type: {app.tp || "N/A"}
//                   </span>
//                   <span className="flex items-center gap-1 rounded-full bg-[#f4f7ff] px-3 py-1">
//                     <FileText size={12} /> {app.otherDetails || "No details"}
//                   </span>
//                   <span className="flex items-center gap-1 rounded-full bg-[#f4f7ff] px-3 py-1">
//                     <Calendar size={12} /> {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
//                   </span>
//                 </div>

//                 <button
//                   onClick={() => handleViewDetails(app._id)}
//                   disabled={loadingApplicationId === app._id}
//                   className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#1f2f86] px-5 text-xs font-black text-white shadow-lg shadow-[#1f2f86]/20 transition-all hover:bg-[#e6362e] disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <Eye size={14} /> {loadingApplicationId === app._id ? "Loading..." : "View Details"}
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div className="rounded-2xl border border-[#dbe6ff] bg-white py-14 text-center text-sm font-semibold text-slate-400 shadow-sm">
//               No applications found.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PendingApplications;

import { useEffect, useState } from "react";
import { Activity, Calendar, Eye, FileText, Search, Filter, ChevronRight, Clock, User, Car } from "lucide-react";
import ApplicationDetail from "./applicationDetail";

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingApplicationId, setLoadingApplicationId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
 
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("executiveToken") || localStorage.getItem("token");
      const executiveId = localStorage.getItem("executiveId");
      
      if (!token) {
        setApplications([]);
        return;
      }

      const res = await fetch(
        `https://insurance-backend-eufn.onrender.com/api/application/executive/${executiveId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

    const data = await res.json();
const allApps = Array.isArray(data) ? data : [];

// executive ne assign thayeli badhi applications
setApplications(allApps);
    } catch (err) {
      console.error("Fetch error:", err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id) => {
    const token = localStorage.getItem("executiveToken") || localStorage.getItem("token");

    if (!token) {
      console.warn("No token found");
      return;
    }

    try {
      setLoadingApplicationId(id);
      const res = await fetch(
        `https://insurance-backend-eufn.onrender.com/api/application/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data?.message || "Access denied");
        return;
      }

      setSelectedApp(data);
    } catch (err) {
      console.error("Error fetching application details:", err);
    } finally {
      setLoadingApplicationId(null);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = search.toLowerCase() === "" || 
      app.carNo?.toLowerCase().includes(search.toLowerCase()) ||
      app.tp?.toLowerCase().includes(search.toLowerCase()) ||
      app.otherDetails?.toLowerCase().includes(search.toLowerCase()) ||
      app.user?.fullName?.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filterType === "all" || app.tp?.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const getPolicyTypes = () => {
    const types = ["all", ...new Set(applications.map(app => app.tp).filter(Boolean))];
    return types;
  };

  if (selectedApp) {
    return <ApplicationDetail application={selectedApp} onBack={() => setSelectedApp(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">All Applications</h1>
            <p className="text-gray-500 mt-2">Review and manage insurance applications</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm px-6 py-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-medium text-gray-600">
  Total: {applications.length}
</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vehicle number, dealer name, or policy type..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-gray-700"
              >
                {getPolicyTypes().map(type => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid gap-4">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-500 mt-4">Loading applications...</p>
          </div>
        ) : filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <div
              key={app._id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Section - Main Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{app.carNo || "Unknown Vehicle"}</h3>
                     <span
  className={`px-2 py-1 text-xs font-medium rounded-full ${
    app.status === "approved"
      ? "bg-green-50 text-green-600"
      : app.status === "rejected"
      ? "bg-red-50 text-red-600"
      : app.status === "completed"
      ? "bg-purple-50 text-purple-600"
      : "bg-yellow-50 text-yellow-600"
  }`}
>
  {app.status || "Pending"}
</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{app.user?.fullName || "Dealer name not available"}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                        <Activity className="w-3 h-3" />
                        Type: {app.tp || "N/A"}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                        <FileText className="w-3 h-3" />
                        {app.otherDetails || "No details"}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Right Section - Action Button */}
                  <div className="lg:text-right">
                    <button
                      onClick={() => handleViewDetails(app._id)}
                      disabled={loadingApplicationId === app._id}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingApplicationId === app._id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Loading...
                        </>
                      ) : (
                        <>
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No applications found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      {!loading && filteredApplications.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredApplications.length} of {applications.length} pending applications
        </div>
      )}
    </div>
  );
};

export default PendingApplications;