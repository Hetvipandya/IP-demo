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
  AlertCircle,
  Building2,
  Car,
  LogOut,
} from "lucide-react";
import ApplicationDetail from "./applicationDetail";

const AdminHome = () => {
  const navigate = useNavigate();
  
  const [dealers, setDealers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingApplicationId, setLoadingApplicationId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("executiveToken");
    localStorage.removeItem("token");
    localStorage.removeItem("executiveId");
    navigate("/login");
  };

  useEffect(() => {
    fetchApplications();
    fetchDealers();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("executiveToken") || localStorage.getItem("adminToken");
      const executiveId = localStorage.getItem("executiveId");

      if (!token || !executiveId) {
        console.log("Missing token or executiveId");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://insurance-backend-eufn.onrender.com/api/application/executive/${executiveId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("Executive Applications =>", data);

      if (res.ok) {
        setApplications(data || []);
      } else {
        console.log(data.message || "Failed to fetch applications");
        setApplications([]);
      }
    } catch (error) {
      console.log("Fetch error:", error);
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
        navigate(`/executive/application-detail/${id}`, { state: { application: data } });
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
    if (!window.confirm("Are you sure you want to delete this dealer?")) return;
    try {
      const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/user/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setDealers((prev) => prev.filter((dealer) => dealer._id !== id));
        alert("Dealer deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting dealer:", err);
      alert("Failed to delete dealer");
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

  const pendingApplications = useMemo(
    () => applications.filter((app) => (app.status || "pending") === "pending"),
    [applications]
  );

  const latestPendingApplications = useMemo(
    () =>
      [...pendingApplications]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 6),
    [pendingApplications]
  );

  const waitingDealers = dealers.filter((dealer) => !dealer.isApproved).slice(0, 5);
  const completedReviews = stats.approved + stats.rejected;

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Monitor and manage your assigned policies</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Policies"
            value={stats.total}
            icon={<FileText className="h-6 w-6" />}
            color="blue"
          />
          <StatCard
            label="Pending Review"
            value={stats.pending}
            icon={<Clock className="h-6 w-6" />}
            color="orange"
          />
          <StatCard
            label="Approved"
            value={stats.approved}
            icon={<CheckCircle2 className="h-6 w-6" />}
            color="green"
          />
          <StatCard
            label="Declined"
            value={stats.rejected}
            icon={<XCircle className="h-6 w-6" />}
            color="red"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 uppercase font-semibold">Queue</p>
                      <h2 className="text-lg font-semibold text-gray-900">Pending Policy Files</h2>
                    </div>
                  </div>
                  <Link
                    to="/admin/pending-applications"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
                  >
                    View All <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Queue Metrics */}
              <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Pending Files</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{pendingApplications.length}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Need Review</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">{stats.pending}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{completedReviews}</p>
                </div>
              </div>

              {/* Applications List */}
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-3 text-gray-500">Loading applications...</p>
                  </div>
                ) : latestPendingApplications.length > 0 ? (
                  latestPendingApplications.map((app) => (
                    <ApplicationRow
                      key={app._id}
                      app={app}
                      isLoading={loadingApplicationId === app._id}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="No pending applications"
                    subtitle="All policy files have been reviewed."
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Dealer Approval Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 uppercase font-semibold">Control</p>
                    <h2 className="text-lg font-semibold text-gray-900">Approval Desk</h2>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 border-b border-gray-200">
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-xs text-orange-600 font-semibold">Pending Dealers</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">{stats.pendingDealers}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-600 font-semibold">Approved Dealers</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{stats.approvedDealers}</p>
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
                  Manage All Dealers <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Work Summary Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-blue-600 uppercase font-semibold">Summary</p>
                  <h3 className="text-lg font-semibold text-gray-900">Work Summary</h3>
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:-translate-y-0.5">
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

const ApplicationRow = ({ app, isLoading, onViewDetails }) => {
  const statusColors = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-700",
  };
  const status = app.status || "pending";

  return (
    <div className="p-6 hover:bg-gray-50 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
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

        <button
          onClick={() => onViewDetails(app._id)}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 shadow-sm"
        >
          <Eye className="h-4 w-4" /> {isLoading ? "Loading..." : "View Details"}
        </button>
      </div>
    </div>
  );
};

const DealerCard = ({ dealer, onApprove, onDelete }) => (
  <div className="p-4 hover:bg-gray-50 transition-all">
    <div className="flex items-start justify-between mb-3">
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
    <div className="flex gap-2">
      <button
        onClick={() => onApprove(dealer._id)}
        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition shadow-sm"
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
  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
    <span className="text-sm text-gray-700 font-medium">{label}</span>
    <span className="font-bold text-gray-900 text-lg">{value}</span>
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