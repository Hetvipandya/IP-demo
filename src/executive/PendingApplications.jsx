import { useEffect, useState } from "react";
import { Activity, Calendar, Eye, FileText, Search } from "lucide-react";
import ApplicationDetail from "./applicationDetail";

const hideScrollbarCSS = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingApplicationId, setLoadingApplicationId] = useState(null);
  const [search, setSearch] = useState("");
 
  useEffect(() => {
    fetchApplications();
  }, []);

const fetchApplications = async () => {
  try {
    setLoading(true);

    const token =
      localStorage.getItem("executiveToken") ||
      localStorage.getItem("token");
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

    // ✅ ONLY PENDING FILTER
    const pendingApps = allApps.filter(
      (app) => app.status === "pending"
    );

    setApplications(pendingApps);
  } catch (err) {
    console.error("Fetch error:", err);
    setApplications([]);
  } finally {
    setLoading(false);
  }
};

const handleViewDetails = async (id) => {
  const token =
    localStorage.getItem("executiveToken") ||
    localStorage.getItem("token");

  if (!token) {
    console.warn("No admin token found in localStorage");
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

    // 🔥 IMPORTANT FIX
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
    const query = search.toLowerCase();
    return (
      app.carNo?.toLowerCase().includes(query) ||
      app.tp?.toLowerCase().includes(query) ||
      app.otherDetails?.toLowerCase().includes(query) ||
      app.user?.fullName?.toLowerCase().includes(query)
    );
  });

  if (selectedApp) {
    return <ApplicationDetail application={selectedApp} onBack={() => setSelectedApp(null)} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden rounded-[1.75rem] border border-white bg-[#f7f8fc] p-4 shadow-2xl shadow-[#1f2f86]/10 md:p-7">
      <style>{hideScrollbarCSS}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(230,54,46,0.13),transparent_28%),radial-gradient(circle_at_90%_5%,rgba(31,47,134,0.17),transparent_35%)]" />

      <div className="relative mb-6 flex flex-col gap-4 rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-xl shadow-[#1f2f86]/10 md:flex-row md:items-center md:justify-between">
        <div>
          {/* <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e6362e]">Admin Workspace</p> */}
          <h1 className="mt-2 text-3xl font-black text-[#121a43]">Pending Applications</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Review every submitted policy file in a larger, focused view.</p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-[#dfe5f3] bg-white px-4 py-3 text-[#1f2f86]">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search applications"
            className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400 md:w-64"
          />
        </div>
      </div>

      <div className="relative rounded-[1.75rem] border border-[#dbe6ff] bg-gradient-to-br from-white via-[#f7faff] to-[#eaf1ff] p-5 text-[#121a43] shadow-2xl shadow-[#1f2f86]/10 md:p-7">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-3 text-2xl font-black">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1f2f86] text-white shadow-lg shadow-[#1f2f86]/25">
              <FileText size={21} />
            </span>
            Application Queue
          </h2>
          <span className="rounded-full border border-[#cdd9f2] bg-white px-3 py-1.5 text-xs font-black text-[#1f2f86] shadow-sm">
            {filteredApplications.length} shown
          </span>
        </div>

        <div className="hide-scrollbar max-h-[68vh] space-y-4 overflow-y-auto pr-1">
          {loading ? (
            <div className="rounded-2xl border border-[#dbe6ff] bg-white py-14 text-center text-sm font-semibold text-slate-500 shadow-sm">
              Loading applications...
            </div>
          ) : filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <div
                key={app._id}
                className="group relative grid overflow-hidden rounded-2xl border border-[#dbe6ff] bg-white p-5 pl-6 shadow-lg shadow-[#1f2f86]/10 transition-all hover:-translate-y-0.5 hover:border-[#9fb6ee] hover:shadow-xl hover:shadow-[#1f2f86]/10 lg:grid-cols-[1.2fr_1fr_auto]"
              >
                <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-gradient-to-b from-[#1f2f86] to-[#e6362e]" />
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-xl font-black text-[#121a43] group-hover:text-[#1f2f86]">{app.carNo || "Unknown Vehicle"}</h3>
                    <span className="rounded-full bg-[#e6362e]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#e6362e]">
                      New
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">{app.user?.fullName || "Dealer name not available"}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1 rounded-full bg-[#f4f7ff] px-3 py-1">
                    <Activity size={12} /> Type: {app.tp || "N/A"}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-[#f4f7ff] px-3 py-1">
                    <FileText size={12} /> {app.otherDetails || "No details"}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-[#f4f7ff] px-3 py-1">
                    <Calendar size={12} /> {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>

                <button
                  onClick={() => handleViewDetails(app._id)}
                  disabled={loadingApplicationId === app._id}
                  className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#1f2f86] px-5 text-xs font-black text-white shadow-lg shadow-[#1f2f86]/20 transition-all hover:bg-[#e6362e] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Eye size={14} /> {loadingApplicationId === app._id ? "Loading..." : "View Details"}
                </button>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-[#dbe6ff] bg-white py-14 text-center text-sm font-semibold text-slate-400 shadow-sm">
              No applications found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingApplications;
