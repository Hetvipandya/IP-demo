import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  UserCheck,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://insurance-backend-eufn.onrender.com";

// ================= STATUS STYLE =================
const statusStyle = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
  processing: "bg-blue-100 text-blue-700",
};

// ================= STAT CARD =================
function StatCard({
  title,
  value,
  icon,
  iconBg,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
          {title}
        </p>

        <p className="text-2xl font-bold text-gray-800">
          {value}
        </p>
      </div>

      <div
        className={`rounded-full p-3 ${iconBg}`}
      >
        {icon}
      </div>
    </div>
  );
}

// ================= POLICY QUEUE =================
function PolicyFilesQueue({
  onStatsChange,
}) {
  const [apps, setApps] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [executives, setExecutives] =
    useState([]);

  const [assigned, setAssigned] =
    useState({});

  const token =
    localStorage.getItem(
      "tlToken"
    ) ||
    localStorage.getItem(
      "token"
    );

  const navigate = useNavigate();

  // ================= FETCH APPLICATIONS =================
const fetchApplications =
  async () => {
    try {
      setLoading(true);

      // ================= GET TL ID =================
      const tlRes =
        await fetch(
          `${API_BASE}/api/teamleader/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const tlData =
        await tlRes.json();

      if (
        !tlData.success
      ) {
        console.error(
          "TL not found"
        );
        return;
      }

      const teamLeaderId =
        tlData.data._id;

      console.log(
        "TL ID:",
        teamLeaderId
      );

      // ================= FETCH APPLICATIONS =================
      const res =
        await fetch(
          `${API_BASE}/api/application/teamleader/${teamLeaderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const data =
        await res.json();

      console.log(
        "Applications:",
        data
      );

      const list =
        data?.data ||
        [];

      setApps(list);

      const stats = {
        total:
          list.length,

        pending:
          list.filter(
            (a) =>
              a.status ===
              "pending"
          ).length,

        approved:
          list.filter(
            (a) =>
              a.status ===
              "approved"
          ).length,

        rejected:
          list.filter(
            (a) =>
              a.status ===
              "rejected"
          ).length,
      };

      onStatsChange(
        stats
      );
    } catch (err) {
      console.error(
        "Fetch applications error:",
        err
      );
    } finally {
      setLoading(false);
    }
  };
  // ================= FETCH EXECUTIVES =================
  const fetchExecutives =
    async () => {
      try {
        const res =
          await fetch(
            `${API_BASE}/api/executive`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const data =
          await res.json();

        setExecutives(
          data?.data ||
            data ||
            []
        );
      } catch (err) {
        console.error(
          "Executive fetch error:",
          err
        );
      }
    };

  useEffect(() => {
    fetchApplications();
    fetchExecutives();
  }, []);

  // ================= ASSIGN EXECUTIVE =================
  const assignExecutive =
    async (appId) => {
      const executiveId =
        assigned[
          appId
        ];

      if (
        !executiveId
      ) {
        alert(
          "Please select executive"
        );
        return;
      }

      try {
        const res =
          await fetch(
            `${API_BASE}/api/application/assign-executive/${appId}`,
            {
              method:
                "PUT",

              headers:
                {
                  "Content-Type":
                    "application/json",

                  Authorization: `Bearer ${token}`,
                },

              body:
                JSON.stringify(
                  {
                    executiveId,
                  }
                ),
            }
          );

        const data =
          await res.json();

        if (
          data.success
        ) {
          alert(
            "Executive assigned successfully"
          );

          fetchApplications();
        } else {
          alert(
            data.message ||
              "Assignment failed"
          );
        }
      } catch (error) {
        console.error(
          error
        );

        alert(
          "Failed to assign executive"
        );
      }
    };

  return (
    <div className="bg-white rounded-xl shadow p-5 flex-1">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <FileText
          size={18}
          className="text-blue-500"
        />

        <h2 className="font-bold text-gray-800">
          Latest Policy Files
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8 text-gray-500">
          Loading...
        </div>
      )}

      {/* Empty */}
      {!loading &&
        apps.length ===
          0 && (
          <div className="text-center py-8 text-gray-500">
            No applications
            assigned
          </div>
        )}

      {/* List */}
      <div className="space-y-4">
        {apps
         .filter(
    (app) =>
      (app.status || "")
        .toLowerCase() ===
      "pending"
  ).map(
          (app) => (
           <div
  key={app._id}
  className="bg-[#f7f7f7] border rounded-md px-5 py-4 hover:shadow-sm transition"
>
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
    {/* LEFT SIDE */}
    <div className="flex-1">
      {/* Top Row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Car Icon */}
        <span className="text-gray-400">
          🚗
        </span>

        {/* Car Number */}
        <h3 className="font-bold text-[24px] text-[#1e293b]">
          {app.carNo}
        </h3>

        {/* Status Badge */}
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
            statusStyle[app.status] ||
            "bg-gray-100 text-gray-700"
          }`}
        >
          {app.status}
        </span>
      </div>

      {/* Bottom Info */}
      <div className="flex flex-wrap items-center gap-5 text-gray-600 mt-3 text-[18px]">
        
        {/* Dealer */}
        <div className="flex items-center gap-1">
          <span>👤</span>
          <span>
            {app.user?.fullName || "N/A"}
          </span>
        </div>

        {/* Policy Type */}
        <div className="flex items-center gap-1">
          <span>⚡</span>
          <span>
            Type:{" "}
            {app.policyType || app.tp || "third_party"}
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1">
          <span>📅</span>
          <span>
            {new Date(
              app.createdAt
            ).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Executive Name */}
      <p className="text-blue-500 text-sm mt-2">
        {app.executive?.Name || "Not Assigned"}
      </p>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-3 flex-wrap">
      
      {/* Dropdown */}
      <select
        value={assigned[app._id] || ""}
        onChange={(e) =>
          setAssigned((prev) => ({
            ...prev,
            [app._id]: e.target.value,
          }))
        }
        className="border border-gray-300 rounded-xl px-4 py-3 min-w-[170px] text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="">
          Assign Executive
        </option>

        {executives.map((ex) => (
          <option
            key={ex._id}
            value={ex._id}
          >
            {ex.Name}
          </option>
        ))}
      </select>

      {/* Assign Button */}
      <button
        onClick={() =>
          assignExecutive(app._id)
        }
        className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-5 py-3 text-sm font-medium flex items-center gap-2"
      >
        <UserCheck size={16} />
        Assign
      </button>

      {/* View Details */}
      <button onClick={() => navigate(`/tl/application-detail/${app._id}`)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-medium flex items-center gap-2">
        <Eye size={18} />
        View Details
      </button>
    </div>
  </div>
</div>
          )
        )}
      </div>
    </div>
  );
}

// ================= DASHBOARD =================
export default function Dashboard() {
  const [stats, setStats] =
    useState({
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    });

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back,
            Team Leader
          </h1>

          <p className="text-gray-500 text-sm">
            TL Management
            Dashboard
          </p>
        </div>

        <button
          onClick={() =>
            window.location.reload()
          }
          className="flex items-center gap-2 border rounded-lg bg-white px-4 py-2 text-sm"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Leads"
          value={
            stats.total
          }
          iconBg="bg-blue-50"
          icon={
            <FileText className="text-blue-500" />
          }
        />

        <StatCard
          title="Pending"
          value={
            stats.pending
          }
          iconBg="bg-yellow-50"
          icon={
            <Clock className="text-yellow-500" />
          }
        />

        <StatCard
          title="Approved"
          value={
            stats.approved
          }
          iconBg="bg-green-50"
          icon={
            <CheckCircle className="text-green-500" />
          }
        />

        <StatCard
          title="Rejected"
          value={
            stats.rejected
          }
          iconBg="bg-red-50"
          icon={
            <XCircle className="text-red-500" />
          }
        />
      </div>

      <PolicyFilesQueue
        onStatsChange={
          setStats
        }
      />
    </div>
  );
}