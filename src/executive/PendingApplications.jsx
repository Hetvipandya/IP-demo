import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Calendar, Eye, FileText, Search, Filter, ChevronRight, Clock, User, Car } from "lucide-react";
import ApplicationDetail from "./applicationDetail";

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
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

      navigate(`/executive/application-detail/${id}`, { state: { application: data } });
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