import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,  
  FileText,
  Mail,
  ShieldCheck,
  Trash2, 
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import ApplicationDetail from "./applicationDetail";

const hideScrollbarCSS = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const statTones = {
  blue: "border-[#cbdcff] bg-[#eef4ff] text-[#1f2f86]",
  amber: "border-[#ffe4a8] bg-[#fff7e6] text-[#9a5b00]",
  green: "border-emerald-100 bg-emerald-50 text-emerald-700",
  red: "border-[#ffd4d0] bg-[#fff0ef] text-[#e6362e]",
};

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

const AdminHome = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [dealers, setDealers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingApplicationId, setLoadingApplicationId] = useState(null);
  const [executives, setExecutives] = useState([]);

  useEffect(() => {
    fetchDealers();
    fetchApplications();
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
  try {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

    const res = await fetch("https://insurance-backend-eufn.onrender.com/api/executive", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setExecutives(Array.isArray(data) ? data : data.executives || []);
  } catch (err) {
    console.error("Failed to fetch executives:", err);
  }
};

const handleAssignExecutive = async (applicationId, executiveId) => {
  try {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token");

    const res = await fetch(
      `https://insurance-backend-eufn.onrender.com/api/application/assign-executive/${applicationId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          executiveId,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      // ✅ Local state update
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? {
                ...app,
                executive: data.data.executive,
              }
            : app
        )
      );

      alert("Executive Assigned Successfully");
    } else {
      alert(data.message || "Failed to assign executive");
    }
  } catch (err) {
    console.error("Assign executive error:", err);
  }
};

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

      if (!token) {
        console.warn("No admin token found in localStorage");
        setApplications([]);
        setLoading(false);
        return;
      }

      const res = await fetch("https://insurance-backend-eufn.onrender.com/api/application/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
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
      setDealers(allUsers.filter((user) => user.role === "dealer"));
    } catch (err) {
      console.error("Failed to fetch dealers:", err);
    }
  };

  const handleViewDetails = async (id) => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    if (!token) {
      console.warn("No admin token found in localStorage");
      return;
    }

    try {
      setLoadingApplicationId(id);
      const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/application/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data) {
        setSelectedApp(data);
      } else {
        console.error("Failed to fetch application details:", data);
      }
    } catch (err) {
      console.error("Error fetching application details:", err);
    } finally {
      setLoadingApplicationId(null);
    }
  };

  const handleApproval = async (id) => {
    try {
      const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/user/approve/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setDealers((prev) => prev.filter((dealer) => dealer._id !== id));
      }
    } catch (err) {
      console.error("Error deleting dealer:", err);
    }
  };

  const stats = useMemo(() => {
    const pending = applications.filter((app) => (app.status || "pending") === "pending").length;
    const approved = applications.filter((app) => app.status === "approved").length;
    const rejected = applications.filter((app) => app.status === "rejected").length;
    const approvedDealers = dealers.filter((dealer) => dealer.isApproved).length;

    return {
      total: applications.length,
      pending,
      approved,
      rejected,
      approvedDealers,
      pendingDealers: dealers.length - approvedDealers,
    };
  }, [applications, dealers]);

  const latestApplications = useMemo(
    () =>
      [...applications]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 6),
    [applications]
  );

  const waitingDealers = dealers.filter((dealer) => !dealer.isApproved).slice(0, 5);
  const completedReviews = stats.approved + stats.rejected;

  if (selectedApp) {
    return <ApplicationDetail application={selectedApp} onBack={() => setSelectedApp(null)} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden rounded-[1.25rem] border border-[#d7e0f1] bg-[#f4f7fb] p-4 text-slate-950 shadow-xl shadow-[#1f2f86]/10 md:p-6">
      <style>{hideScrollbarCSS}</style>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[linear-gradient(135deg,rgba(31,47,134,0.12),rgba(230,54,46,0.08),transparent_70%)]" />

      <section className="relative mb-5 overflow-hidden rounded-2xl border border-white bg-white p-4 shadow-lg shadow-[#1f2f86]/8 md:p-5">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#1f2f86] via-[#3558d8] to-[#e6362e]" />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#e6362e]">Admin Overview</p>
            <h1 className="mt-2 text-2xl font-black text-[#10183f] font-bold md:text-3xl">Dashboard</h1>
            <p className="mt-2 max-w-2xl text-[13px] font-semibold leading-6 text-slate-500">
              Monitor policy applications, dealer approvals, and pending work from one clean admin workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[360px]">
            <HeaderMetric label="Pending Policies" value={stats.pending} tone="blue" />
            <HeaderMetric label="Pending Dealers" value={stats.pendingDealers} tone="red" />
          </div>
        </div>
      </section>

      <section className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Policies" value={stats.total} tone="blue" icon={<FileText size={21} />} />
        <StatCard label="Pending Review" value={stats.pending} tone="amber" icon={<Clock size={21} />} />
        <StatCard label="Approved" value={stats.approved} tone="green" icon={<CheckCircle2 size={21} />} />
        <StatCard label="Declined" value={stats.rejected} tone="red" icon={<XCircle size={21} />} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-[#d9e3f5] bg-white shadow-lg shadow-[#1f2f86]/8">
          <SectionHeader
            eyebrow="Application Queue"
            title="Latest Policy Files"
            icon={<FileText size={20} />}
            action={
              <Link
                to="/admin/pending-applications"
                className="flex h-10 items-center gap-2 rounded-lg bg-[#1f2f86] px-4 text-xs font-black text-white shadow-lg shadow-[#1f2f86]/20 transition hover:bg-[#e6362e]"
              >
                Open Queue <ArrowUpRight size={14} />
              </Link>
            }
          />

          <div className="grid grid-cols-1 gap-3 border-y border-[#e2e9f6] bg-[#f7faff] p-4 sm:grid-cols-3">
            <QueueMetric label="Active Files" value={applications.length} />
            <QueueMetric label="Need Review" value={stats.pending} />
            <QueueMetric label="Completed" value={completedReviews} />
          </div>

          <div className="hide-scrollbar max-h-[520px] overflow-y-auto p-4">
            {loading ? (
              <EmptyState title="Loading policy files..." subtitle="Fetching the latest application queue." />
            ) : latestApplications.length > 0 ? (
              <div className="space-y-3">
                {latestApplications.map((app) => (
                 <ApplicationRow
  key={app._id}
  app={app}
  executives={executives}
  isLoading={loadingApplicationId === app._id}
  onViewDetails={handleViewDetails}
  onAssignExecutive={handleAssignExecutive}
/>
                ))}
              </div>
            ) : (
              <EmptyState title="No applications found" subtitle="New policy files will appear here once dealers submit them." />
            )}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="overflow-hidden rounded-2xl border border-[#d9e3f5] bg-white shadow-lg shadow-[#1f2f86]/8">
            <SectionHeader eyebrow="Dealer Control" title="Approval Desk" icon={<ShieldCheck size={20} />} />

            <div className="grid grid-cols-2 gap-3 border-y border-[#e2e9f6] bg-[#f7faff] p-4">
              <QueueMetric label="Pending" value={stats.pendingDealers} />
              <QueueMetric label="Approved" value={stats.approvedDealers} />
            </div>

            <div className="hide-scrollbar max-h-[420px] space-y-3 overflow-y-auto p-4">
              {waitingDealers.length > 0 ? (
                waitingDealers.map((dealer) => (
                  <DealerCard key={dealer._id} dealer={dealer} onApprove={handleApproval} onDelete={handleDelete} />
                ))
              ) : (
                <EmptyState title="All dealers approved" subtitle="No dealer account is waiting for approval." compact />
              )}
            </div>

            <div className="border-t border-[#e2e9f6] bg-white p-4">
              <Link
                to="/admin/dealer-management"
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#cbdcff] bg-[#f7faff] text-sm font-black text-[#1f2f86] transition hover:border-[#1f2f86] hover:bg-white"
              >
                Manage All Dealers <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#d9e3f5] bg-white p-5 shadow-lg shadow-[#1f2f86]/8">
            <div className="-mx-5 -mt-5 mb-5 h-1.5 bg-gradient-to-r from-[#1f2f86] to-[#e6362e]" />
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef4ff] text-[#1f2f86]">
                <Activity size={20} />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e6362e]">Work Summary</p>
                <h3 className="text-lg font-black text-[#10183f]">Admin priorities</h3>
              </div>
            </div>
            <div className="space-y-3 text-sm font-semibold text-slate-600">
              <FocusItem label="Policy files waiting" value={stats.pending} />
              <FocusItem label="Dealer approvals pending" value={stats.pendingDealers} />
              <FocusItem label="Completed reviews" value={completedReviews} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const HeaderMetric = ({ label, value, tone }) => (
  <div
    className={`rounded-xl border px-4 py-3 ${
      tone === "red" ? "border-[#ffd4d0] bg-[#fff5f4]" : "border-[#cbdcff] bg-[#f3f7ff]"
    }`}
  >
    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
    <p className={`mt-1 text-xl font-black ${tone === "red" ? "text-[#e6362e]" : "text-[#1f2f86]"}`}>{value}</p>
  </div>
);

const StatCard = ({ label, value, tone, icon }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-[#d9e3f5] bg-white p-4 shadow-lg shadow-[#1f2f86]/8 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1f2f86]/10">
    <div className={`grid h-11 w-11 place-items-center rounded-xl border ${statTones[tone]}`}>
      {icon}
    </div>
    <div>
      <h2 className="text-[11px] font-black uppercase tracking-wide text-slate-500">{label}</h2>
      <p className="text-2xl font-black text-[#10183f]">{value}</p>
    </div>
  </div>
);

const SectionHeader = ({ eyebrow, title, icon, action }) => (
  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef4ff] text-[#1f2f86]">{icon}</span>
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1f2f86]">{eyebrow}</p>
        <h3 className="mt-1 text-xl font-black text-[#10183f]">{title}</h3>
      </div>
    </div>
    {action}
  </div>
);

const QueueMetric = ({ label, value }) => (
  <div className="rounded-xl border border-[#d9e3f5] bg-white px-4 py-3 shadow-sm">
    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
    <p className="mt-1 text-lg font-black text-[#10183f]">{value}</p>
  </div>
);

const ApplicationRow = ({
  app,
  executives,
  isLoading,
  onViewDetails,
  onAssignExecutive,
}) => {
  const status = app.status || "pending";

  return (
    <div className="grid gap-4 rounded-xl border border-[#d9e3f5] bg-white p-4 transition hover:border-[#b9c9ee] hover:bg-[#fbfcff] lg:grid-cols-[1fr_auto]">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h4 className="truncate text-base font-black text-[#10183f]">{app.carNo || "Unknown Vehicle"}</h4>
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ring-1 ${statusStyles[status] || statusStyles.pending}`}>
            {status}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-500">
          <InfoPill icon={<Users size={12} />} text={app.user?.fullName || "Dealer not available"} />
          <InfoPill icon={<Activity size={12} />} text={`Type: ${app.tp || "N/A"}`} />
          <InfoPill icon={<Calendar size={12} />} text={app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"} />
        </div>
        {app.otherDetails && <p className="mt-3 line-clamp-2 text-sm font-semibold text-slate-500">{app.otherDetails}</p>}
      </div>

     <div className="flex flex-col gap-2">
 <select
  value={app.executive?._id || ""}
  onChange={(e) => {
    if (e.target.value) {
      onAssignExecutive(app._id, e.target.value);
    }
  }}
  className="h-10 rounded-lg border border-[#d9e3f5] bg-white px-3 text-xs font-bold text-[#10183f] outline-none focus:border-[#1f2f86]"
>
  <option value="">Assign Executive</option>

  {executives?.map((executive) => (
    <option
      key={executive._id}
      value={executive._id}
    >
      {executive.Name}
    </option>
  ))}
</select>


  <button
    onClick={() => onViewDetails(app._id)}
    disabled={isLoading}
    className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1f2f86] px-4 text-xs font-black text-white transition hover:bg-[#e6362e] disabled:cursor-not-allowed disabled:opacity-50"
  >
    <Eye size={14} /> {isLoading ? "Loading..." : "View"}
  </button>
</div>
    </div>
  );
};

const DealerCard = ({ dealer, onApprove, onDelete }) => (
  <div className="rounded-xl border border-[#d9e3f5] bg-white p-4 transition hover:bg-[#fbfcff]">
    <div className="mb-3 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h4 className="truncate text-sm font-black text-[#10183f]">{dealer.fullName || "Dealer"}</h4>
        <p className="mt-1 flex items-center gap-1 truncate text-xs font-semibold text-slate-500">
          <Mail size={12} /> {dealer.emailId || "Email not available"}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-black uppercase text-amber-700 ring-1 ring-amber-200">
        Pending
      </span>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <button
        onClick={() => onApprove(dealer._id)}
        className="flex h-10 items-center justify-center gap-1 rounded-lg bg-[#1f2f86] text-xs font-black text-white transition hover:bg-[#18307f]"
      >
        <UserCheck size={14} /> Approve
      </button>
      <button
        onClick={() => onDelete(dealer._id)}
        className="flex h-10 items-center justify-center gap-1 rounded-lg border border-rose-200 bg-rose-50 text-xs font-black text-rose-700 transition hover:bg-rose-600 hover:text-white"
      >
        <Trash2 size={14} /> Delete
      </button>
    </div>
  </div>
);

const InfoPill = ({ icon, text }) => (
  <span className="flex items-center gap-1 rounded-full bg-[#f1f5fc] px-3 py-1">
    {icon} {text}
  </span>
);

const FocusItem = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-xl border border-[#d9e3f5] bg-[#f7faff] px-4 py-3">
    <span>{label}</span>
    <span className="font-black text-[#1f2f86]">{value}</span>
  </div>
);

const EmptyState = ({ title, subtitle, compact = false }) => (
  <div className={`rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center ${compact ? "px-4 py-8" : "px-5 py-14"}`}>
    <p className="text-sm font-black text-slate-900">{title}</p>
    <p className="mt-1 text-xs font-semibold text-slate-500">{subtitle}</p>
  </div>
);

export default AdminHome;
