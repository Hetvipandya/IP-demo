import { useCallback, useEffect, useState } from "react";
import { Calendar, Download, FileText, LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

const DealerDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyApplications = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://insurance-backend-eufn.onrender.com/api/application/my", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unable to fetch applications.");
        setApplications([]);
        return;
      }

      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch dealer applications:", err);
      setError("Server error. Please try again.");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchMyApplications();
  }, [fetchMyApplications]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-4 text-[#10183f] md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 overflow-hidden rounded-2xl border border-white bg-white p-5 shadow-lg shadow-[#1f2f86]/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#eef4ff] text-[#1f2f86]">
                <ShieldCheck size={26} />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#e6362e]">Dealer Workspace</p>
                <h1 className="mt-1 text-2xl font-black md:text-3xl">My Applications</h1>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Track submitted policies and download uploaded policy documents.
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#ffd4d0] bg-[#fff5f4] px-4 text-sm font-black text-[#e6362e] transition hover:border-[#e6362e] hover:bg-white"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d9e3f5] bg-white shadow-lg shadow-[#1f2f86]/10">
          <div className="border-b border-[#e2e9f6] p-5">
            <h2 className="flex items-center gap-3 text-xl font-black">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef4ff] text-[#1f2f86]">
                <FileText size={20} />
              </span>
              Submitted Applications
            </h2>
          </div>

          <div className="p-5">
            {loading ? (
              <EmptyState title="Loading applications..." subtitle="Fetching your submitted policy files." />
            ) : error ? (
              <EmptyState title={error} subtitle="Please refresh or login again." />
            ) : applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <ApplicationCard key={app._id} app={app} formatDate={formatDate} />
                ))}
              </div>
            ) : (
              <EmptyState title="No applications found" subtitle="Your submitted applications will appear here." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationCard = ({ app, formatDate }) => {
  const status = app.status || "pending";

  return (
    <div className="grid gap-4 rounded-2xl border border-[#d9e3f5] bg-[#fbfcff] p-4 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-black text-[#10183f]">{app.carNo || "Unknown Vehicle"}</h3>
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ring-1 ${statusStyles[status] || statusStyles.pending}`}>
            {status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-500">
          <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1">
            <FileText size={12} /> Type: {app.tp || "N/A"}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1">
            <Calendar size={12} /> {formatDate(app.createdAt)}
          </span>
        </div>

        {app.otherDetails && <p className="mt-3 text-sm font-semibold text-slate-500">{app.otherDetails}</p>}
      </div>

      {app.adminPolicyDocument ? (
        <a
          href={app.adminPolicyDocument}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1f2f86] px-5 text-sm font-black text-white transition hover:bg-[#e6362e]"
        >
          <Download size={16} /> Open Policy
        </a>
      ) : (
        <div className="rounded-xl border border-dashed border-[#cbdcff] bg-white px-5 py-3 text-center text-xs font-black uppercase tracking-wide text-slate-400">
          Policy not uploaded
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ title, subtitle }) => (
  <div className="rounded-2xl border border-dashed border-[#cbdcff] bg-[#f7faff] px-5 py-12 text-center">
    <p className="text-sm font-black text-[#10183f]">{title}</p>
    <p className="mt-1 text-xs font-semibold text-slate-500">{subtitle}</p>
  </div>
);

export default DealerDashboard;
