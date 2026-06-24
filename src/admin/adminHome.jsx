import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  ChevronRight,
  Building2,
  Car,
  UserCog,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import ApplicationDetail from "./applicationDetail";

const AdminHome = () => {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingApplicationId, setLoadingApplicationId] = useState(null);
  const [executives, setExecutives] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [assignModal, setAssignModal] = useState({ open: false, applicationId: null, executiveId: null });
  const [assignLoading, setAssignLoading] = useState(false);

  useEffect(() => {
    fetchDealers();
    fetchApplications();
    fetchExecutives();
    fetchTeamLeaders();
  }, []);

  const fetchTeamLeaders = async () => {
  try {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token");

    const res = await fetch(
      "https://insurance-backend-eufn.onrender.com/api/teamleader/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    console.log("TEAM LEADER API:", data);

    setTeamLeaders(
      Array.isArray(data)
        ? data
        : data.teamLeaders || data.data || []
    );
  } catch (err) {
    console.error(
      "Failed to fetch Team Leaders:",
      err
    );
  }
};

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

console.log(
  "APPLICATION API:",
  data
);
      setExecutives(Array.isArray(data) ? data : data.executives || []);
    } catch (err) {
      console.error("Failed to fetch executives:", err);
    }
  };

  // applicationId: id of application, id: id of user being assigned, role: 'executive' | 'teamLeader'
  const handleAssignExecutive = (applicationId, id, role = "executive") => {
    setAssignModal({ open: true, applicationId, executiveId: id, role });
  };

 const confirmAssignExecutive =
  async () => {
    setAssignLoading(
      true
    );

    try {
      const { applicationId, executiveId, role } = assignModal;

      const token =
        localStorage.getItem(
          "adminToken"
        ) ||
        localStorage.getItem(
          "token"
        );

      const endpoint =
        role === "teamLeader"
          ? `https://insurance-backend-eufn.onrender.com/api/application/assign-teamleader/${applicationId}`
          : `https://insurance-backend-eufn.onrender.com/api/application/assign-executive/${applicationId}`;

      const body = role === "teamLeader" ? { teamLeaderId: executiveId } : { executiveId };

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data =
        await res.json();

      console.log(
        "ASSIGN TL RESPONSE:",
        data
      );

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId
              ? {
                  ...app,
                  ...(role === "teamLeader"
                    ? { teamLeader: data?.data?.teamLeader || data.teamLeader || { _id: executiveId } }
                    : { executive: data?.data?.executive || data.executive || { _id: executiveId } }),
                }
              : app
          )
        );

        setAssignModal({ open: false, applicationId: null, executiveId: null, role: null });
      } else {
        alert(data.message || `Failed to assign ${role}`);
      }
    } catch (err) {
      console.error(
        "Assign TL error:",
        err
      );
    } finally {
      setAssignLoading(
        false
      );
    }
  };

  const fetchApplications =
  async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem(
          "adminToken"
        ) ||
        localStorage.getItem(
          "token"
        );

      console.log(
        "TOKEN:",
        token
      );

      const res = await fetch("https://insurance-backend-eufn.onrender.com/api/application/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      // Normalize possible response shapes and preserve all applications
      let appsList = [];
      if (Array.isArray(data)) {
        appsList = data;
      } else if (Array.isArray(data.data)) {
        appsList = data.data;
      } else if (Array.isArray(data.applications)) {
        appsList = data.applications;
      } else if (Array.isArray(data.results)) {
        appsList = data.results;
      } else {
        // fallback: try common fields that might contain arrays
        appsList = data?.applications || data?.data || data?.results || [];
      }

      console.log("Fetched applications count:", appsList.length);
      setApplications(Array.isArray(appsList) ? appsList : []);
    } catch (err) {
      console.error(
        "Fetch error:",
        err
      );
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
        navigate(`/admin/application-detail/${id}`, { state: { application: data } });
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

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Assignment Modal */}
      {assignModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <UserCog className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Assign Executive</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to assign this executive to the application?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmAssignExecutive}
                  disabled={assignLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {assignLoading ? "Assigning..." : "Yes, Assign"}
                </button>
                <button
                  onClick={() => setAssignModal({ open: false, applicationId: null, executiveId: null, role: null })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header + Top Stat Cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
            <p className="text-gray-600 mt-1">Admin Management CRM</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchApplications();
                fetchDealers();
                fetchExecutives();
                fetchTeamLeaders();
              }}
              className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="TOTAL LEADS"
            value={stats.total}
            icon={<FileText className="h-6 w-6" />}
            color="blue"
          />

          <StatCard
            label="SUCCESS RATE"
            value={`${((stats.approved / Math.max(1, stats.total)) * 100).toFixed(0)}%`}
            icon={<TrendingUp className="h-6 w-6" />}
            color="green"
          />

          <StatCard
            label="TOTAL COLLECTION"
            value={`₹${(applications.reduce((s, a) => s + (a.premium || 0), 0)).toLocaleString() || "0"}`}
            icon={<Activity className="h-6 w-6" />}
            color="blue"
          />

          <StatCard
            label="OVERDUE LEADS"
            value={0}
            icon={<AlertCircle className="h-6 w-6" />}
            color="red"
          />
        </div>

        {/* Leads by Status box */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Leads by Status</h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-2 bg-amber-400 text-white rounded-md text-sm font-medium">Pending: {stats.pending}</span>
            <span className="px-3 py-2 bg-sky-500 text-white rounded-md text-sm font-medium">Processing: {Math.max(0, stats.total - stats.pending - stats.approved - stats.rejected)}</span>
            <span className="px-3 py-2 bg-emerald-500 text-white rounded-md text-sm font-medium">Success: {stats.approved}</span>
            <span className="px-3 py-2 bg-red-400 text-white rounded-md text-sm font-medium">Lost: {stats.rejected}</span>
          </div>
        </div>
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Applications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-blue-600 uppercase font-semibold">Queue</p>
                  <h2 className="text-lg font-semibold text-gray-900">Latest Policy Files</h2>
                </div>
              </div>
              <Link
                to="/admin/pending-applications"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Open Queue <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

           

            {/* Applications List */}
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-3 text-gray-500">Loading applications...</p>
                </div>
              ) : latestApplications.length > 0 ? (
                latestApplications.map((app) => (
                  <ApplicationRow
                    key={app._id}
                    app={app}
                     teamLeaders={teamLeaders}
                    executives={executives}
                    isLoading={loadingApplicationId === app._id}
                    onViewDetails={handleViewDetails}
                    onAssignExecutive={handleAssignExecutive}
                  />
                ))
              ) : (
                <EmptyState
                  title="No applications found"
                  subtitle="New policy files will appear here once dealers submit them."
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Dealer Approval Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-purple-600 uppercase font-semibold">Control</p>
                  <h2 className="text-lg font-semibold text-gray-900">Approval Desk</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-xs text-orange-600 font-semibold">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingDealers}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-600 font-semibold">Approved         150</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approvedDealers}</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {waitingDealers.length > 0 ? (
                waitingDealers.map((dealer) => (
                  <DealerCard
                    key={dealer._id}
                    dealer={dealer}
                    onApprove={handleApproval}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <EmptyState
                  title="All dealers approved"
                  subtitle="No dealer account is waiting for approval."
                  compact
                />
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <Link
                to="/admin/dealer-management"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Manage All Dealers <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Work Summary Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-blue-600 uppercase font-semibold">Summary</p>
                <h3 className="text-lg font-semibold text-gray-900">Admin Priorities</h3>
              </div>
            </div>
            <div className="space-y-3">
              <PriorityItem label="Policy files waiting" value={stats.pending} />
              <PriorityItem label="Dealer approvals pending" value={stats.pendingDealers} />
              <PriorityItem label="Completed reviews" value={completedReviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const StatCard = ({ label, value, icon, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
      </div>
    </div>
  );
};

const QueueMetric = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 font-medium">{label}</p>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const ApplicationRow = ({ app, executives, teamLeaders, isLoading, onViewDetails, onAssignExecutive }) => {
  const statusColors = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-700",
  };
  const status = app.status || "pending";

  return (
    <div className="p-6 hover:bg-gray-50 transition">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Car className="h-5 w-5 text-gray-400" />
            <h4 className="font-semibold text-gray-900">{app.carNo || "Unknown Vehicle"}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
              {status}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" /> {app.user?.fullName || "Dealer not available"}
            </span>
            <span className="flex items-center gap-1">
              <Activity className="h-4 w-4" /> Type: {app.tp || "N/A"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />{" "}
              {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
            </span>
          </div>
          {app.otherDetails && (
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">{app.otherDetails}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={app.teamLeader?._id || ""}
            onChange={(e) => {
              if (e.target.value) {
                onAssignExecutive(app._id, e.target.value, "teamLeader");
              }
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Assign TL</option>
            {teamLeaders?.map((tl) => (
              <option key={tl._id} value={tl._id}>
                {tl.Name}
              </option>
            ))}
          </select>
          <select
            value={app.executive?._id || ""}
            onChange={(e) => {
              if (e.target.value) {
                onAssignExecutive(app._id, e.target.value, "executive");
              }
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Assign Executive</option>
            {executives?.map((executive) => (
              <option key={executive._id} value={executive._id}>
                {executive.Name}
              </option>
            ))}
          </select>
          {/* <select
            value={app.executive?._id || ""}
            onChange={(e) => {
              if (e.target.value) {
                onAssignExecutive(app._id, e.target.value);
              }
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Assign Executive</option>
            {executives?.map((executive) => (
              <option key={executive._id} value={executive._id}>
                {executive.Name}
              </option>
            ))}
          </select> */}

          <button
            onClick={() => onViewDetails(app._id)}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            <Eye className="h-4 w-4" /> {isLoading ? "Loading..." : "View Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DealerCard = ({ dealer, onApprove, onDelete }) => (
  <div className="p-4 hover:bg-gray-50 transition">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="h-4 w-4 text-gray-400" />
          <h4 className="font-medium text-gray-900">{dealer.fullName || "Dealer"}</h4>
        </div>
        <p className="flex items-center gap-1 text-sm text-gray-600">
          <Mail className="h-3 w-3" /> {dealer.emailId || "Email not available"}
        </p>
      </div>
      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
        Pending
      </span>
    </div>
    <div className="flex gap-2 mt-3">
      <button
        onClick={() => onApprove(dealer._id)}
        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
      >
        <UserCheck className="h-4 w-4" /> Approve
      </button>
      <button
        onClick={() => onDelete(dealer._id)}
        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition"
      >
        <Trash2 className="h-4 w-4" /> Delete
      </button>
    </div>
  </div>
);

const PriorityItem = ({ label, value }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
    <span className="text-sm text-gray-700">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

const EmptyState = ({ title, subtitle, compact = false }) => (
  <div className={`text-center ${compact ? "py-8" : "py-12"}`}>
    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
    <p className="text-gray-900 font-medium">{title}</p>
    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
  </div>
);

export default AdminHome;