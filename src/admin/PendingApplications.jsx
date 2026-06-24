import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Calendar,
  Eye,
  FileText,
  Search,
  Download,
  UserCheck,
  Filter,
  X
} from "lucide-react";
import * as XLSX from "xlsx";
import ApplicationDetail from "./applicationDetail";
 
const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingApplicationId, setLoadingApplicationId] = useState(null);
  const [search, setSearch] = useState("");
  const [executives, setExecutives] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    executiveId: "",
    fromDate: "",
    toDate: ""
  });

  const [assignModal, setAssignModal] = useState({
    open: false,
    applicationId: null,
    executiveId: null,
    teamLeaderId: null,
    role: null, // 'executive' or 'teamLeader'
  });

  const [assignLoading, setAssignLoading] = useState(false);

  // Helper function to format date as DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Helper function to format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    fetchApplications();
    fetchExecutives();
    fetchTeamLeaders();
  }, []);

  const fetchTeamLeaders = async () => {
    try {
      const token =
        localStorage.getItem("adminToken") || localStorage.getItem("token");

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
      setTeamLeaders(Array.isArray(data) ? data : data.teamLeaders || data.data || []);
    } catch (err) {
      console.error("Failed to fetch team leaders:", err);
      setTeamLeaders([]);
    }
  };

  const fetchExecutives = async () => {
    try {
      const token =
        localStorage.getItem("adminToken") || localStorage.getItem("token");

      const res = await fetch(
        "https://insurance-backend-eufn.onrender.com/api/executive", 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setExecutives(Array.isArray(data) ? data : data.executives || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("adminToken") || localStorage.getItem("token");

      const res = await fetch(
        "https://insurance-backend-eufn.onrender.com/api/application/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id) => {
    const token =
      localStorage.getItem("adminToken") || localStorage.getItem("token");

    setLoadingApplicationId(id);

    try {
      const res = await fetch(
        `https://insurance-backend-eufn.onrender.com/api/application/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) navigate(`/admin/application-detail/${id}`, { state: { application: data } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingApplicationId(null);
    }
  };

  // Get unique types from applications
  const getUniqueTypes = () => {
    const types = applications.map(app => app.tp).filter(Boolean);
    return [...new Set(types)];
  };

  // Return unique array by _id
  const uniqueById = (arr) => {
    if (!Array.isArray(arr)) return [];
    const map = new Map();
    arr.forEach((it) => {
      if (it && it._id) map.set(it._id, it);
    });
    return Array.from(map.values());
  };

  const teamLeadersUnique = uniqueById(teamLeaders);
  const executivesUnique = uniqueById(executives);

  const findNameFor = (list, id) => {
    if (!id) return null;
    const found = list.find((x) => x._id === id);
    if (!found) return null;
    return found.Name || found.name || found.fullName || found.Email || null;
  };

  // Get unique statuses from applications
  const getUniqueStatuses = () => {
    const statuses = applications.map(app => app.status).filter(Boolean);
    return [...new Set(statuses)];
  };

  // Apply all filters
  const filteredApplications = applications.filter((app) => {
    // Search filter
    const q = search.toLowerCase();
    const matchesSearch = !search || (
      app.carNo?.toLowerCase().includes(q) ||
      app.tp?.toLowerCase().includes(q) ||
      app.otherDetails?.toLowerCase().includes(q) ||
      app.user?.fullName?.toLowerCase().includes(q)
    );

    // Status filter
    const matchesStatus = !filters.status || app.status === filters.status;

    // Type filter
    const matchesType = !filters.type || app.tp === filters.type;

    // Executive filter - Fixed: Check for unassigned correctly
    let matchesExecutive = true;
    if (filters.executiveId) {
      if (filters.executiveId === "unassigned") {
        // Check if executive is not assigned (executive object doesn't exist or no executive ID)
        matchesExecutive = !app.executive || !app.executive._id;
      } else {
        // Check for specific executive
        matchesExecutive = app.executive?._id === filters.executiveId;
      }
    }

    // Date range filter
    let matchesDateRange = true;
    if (filters.fromDate || filters.toDate) {
      const appDate = new Date(app.createdAt);
      if (filters.fromDate) {
        const fromDate = new Date(filters.fromDate);
        fromDate.setHours(0, 0, 0, 0);
        matchesDateRange = matchesDateRange && appDate >= fromDate;
      }
      if (filters.toDate) {
        const toDate = new Date(filters.toDate);
        toDate.setHours(23, 59, 59, 999);
        matchesDateRange = matchesDateRange && appDate <= toDate;
      }
    }

    return matchesSearch && matchesStatus && matchesType && 
           matchesExecutive && matchesDateRange;
  });

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "",
      type: "",
      executiveId: "",
      fromDate: "",
      toDate: ""
    });
    setSearch("");
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.status) count++;
    if (filters.type) count++;
    if (filters.executiveId) count++;
    if (filters.fromDate || filters.toDate) count++;
    if (search) count++;
    return count;
  };

  const downloadExcel = () => {
    const excelData = filteredApplications.map((app) => ({
      "Car Number": app.carNo,
      "Customer Name": app.user?.fullName,
      "Type": app.tp,
      "Details": app.otherDetails,
      "Date": formatDate(app.createdAt),
      "Team Leader": app.teamLeader?.Name || "Not Assigned",
      "Executive": app.executive?.Name || "Not Assigned",
      "Status": app.status || "Pending",
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applications");
    XLSX.writeFile(wb, `applications_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">All Applications</h1>

        <div className="flex gap-3">
          <div className="flex items-center border rounded px-3 bg-white">
            <Search size={16} />
            <input
              className="p-2 outline-none w-64"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 rounded relative"
          >
            <Filter size={16} /> Filters
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </button>

          <button
            onClick={downloadExcel}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 rounded"
          >
            <Download size={16} /> Excel
          </button>
        </div>
      </div>

      {/* FILTERS PANEL */}
      {showFilters && (
        <div className="bg-white rounded shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
            >
              <X size={14} /> Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full border rounded p-2"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">All Status</option>
                {getUniqueStatuses().map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                className="w-full border rounded p-2"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">All Types</option>
                {getUniqueTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Executive Filter - Fixed unassigned option */}
            <div>
              <label className="block text-sm font-medium mb-1">Executive</label>
              <select
                className="w-full border rounded p-2"
                value={filters.executiveId}
                onChange={(e) => setFilters({...filters, executiveId: e.target.value})}
              >
                <option value="">All Executives</option>
                <option value="unassigned">⚠️ Not Assigned</option>
                {executives.map(exe => (
                  <option key={exe._id} value={exe._id}>{exe.Name}</option>
                ))}
              </select>
            </div>

            {/* From Date */}
            <div>
              <label className="block text-sm font-medium mb-1">From Date</label>
              <input
                type="date"
                className="w-full border rounded p-2"
                value={filters.fromDate}
                onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-sm font-medium mb-1">To Date</label>
              <input
                type="date"
                className="w-full border rounded p-2"
                value={filters.toDate}
                onChange={(e) => setFilters({...filters, toDate: e.target.value})}
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {getActiveFilterCount() > 0 && (
            <div className="mt-4 pt-3 border-t">
              <div className="flex flex-wrap gap-2">
                {search && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                    Search: {search}
                    <X size={12} className="cursor-pointer" onClick={() => setSearch("")} />
                  </span>
                )}
                {filters.status && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                    Status: {filters.status}
                    <X size={12} className="cursor-pointer" onClick={() => setFilters({...filters, status: ""})} />
                  </span>
                )}
                {filters.type && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                    Type: {filters.type}
                    <X size={12} className="cursor-pointer" onClick={() => setFilters({...filters, type: ""})} />
                  </span>
                )}
                {filters.executiveId === "unassigned" && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                    Executive: Not Assigned
                    <X size={12} className="cursor-pointer" onClick={() => setFilters({...filters, executiveId: ""})} />
                  </span>
                )}
                {filters.executiveId && filters.executiveId !== "unassigned" && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                    Executive: {executives.find(e => e._id === filters.executiveId)?.Name}
                    <X size={12} className="cursor-pointer" onClick={() => setFilters({...filters, executiveId: ""})} />
                  </span>
                )}
                {(filters.fromDate || filters.toDate) && (
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                    Date: {formatDate(filters.fromDate) || "Any"} to {formatDate(filters.toDate) || "Any"}
                    <X size={12} className="cursor-pointer" onClick={() => setFilters({...filters, fromDate: "", toDate: ""})} />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* RESULTS SUMMARY */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredApplications.length} of {applications.length} applications
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Car No</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Type</th>
              <th className="p-3">Details</th>
              <th className="p-3">Date</th>
              <th className="p-3">Team Leader</th>
              <th className="p-3">Executive</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : filteredApplications.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-6">
                  No applications found
                </td>
              </tr>
            ) : (
              filteredApplications.map((app) => (
                <tr key={app._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-semibold">{app.carNo}</td>
                  <td className="p-3">{app.user?.fullName}</td>
                  <td className="p-3">{app.tp}</td>
                  <td className="p-3 max-w-[200px] truncate">
                    {app.otherDetails}
                  </td>
                  {/* Date formatted as DD-MM-YYYY */}
                  <td className="p-3">
                    {formatDate(app.createdAt)}
                  </td>

                  {/* TEAM LEADER */}
                  <td className="p-3">
                    <div>
                      <select
                        className="border p-1 rounded w-full"
                        value={app.teamLeader?._id || ""}
                        onChange={(e) =>
                          setAssignModal({
                            open: true,
                            applicationId: app._id,
                            teamLeaderId: e.target.value,
                            role: "teamLeader",
                          })
                        }
                      >
                        <option value="">{app.teamLeader?.Name || findNameFor(teamLeadersUnique, app.teamLeader?._id) || "Not Assigned"}</option>
                        {teamLeadersUnique.map((tl) => (
                          <option key={tl._id} value={tl._id}>
                            {tl.Name || tl.name || tl.fullName || tl.Email || "Unnamed TL"}
                          </option>
                        ))}
                      </select>
                    </div>
                   </td>

                  {/* EXECUTIVE - Separate column with heading */}
                  <td className="p-3">
                    <div>
                      <select
                        className="border p-1 rounded w-full"
                        value={app.executive?._id || ""}
                        onChange={(e) =>
                          setAssignModal({
                            open: true,
                            applicationId: app._id,
                            executiveId: e.target.value,
                            role: "executive",
                          })
                        }
                      >
                        <option value="">{app.executive?.Name || findNameFor(executivesUnique, app.executive?._id) || "Not Assigned"}</option>
                        {executivesUnique.map((exe) => (
                          <option key={exe._id} value={exe._id}>
                            {exe.Name || exe.name || exe.fullName || exe.Email || "Unnamed Exec"}
                          </option>
                        ))}
                      </select>
                    </div>
                   </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      app.status === "approved" ? "bg-green-100 text-green-800" :
                      app.status === "rejected" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {app.status || "Pending"}
                    </span>
                    </td>

                  {/* ACTION */}
                  <td className="p-3">
                    <button
                      onClick={() => handleViewDetails(app._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Eye size={14} />
                      {loadingApplicationId === app._id
                        ? "Loading"
                        : "View"}
                    </button>
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ASSIGN CONFIRM MODAL */}
      {assignModal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-[300px] text-center">
                <UserCheck className="mx-auto mb-2" size={32} />

                <h2 className="font-bold mb-4">{assignModal.role === "executive" ? "Assign Executive?" : "Assign Team Leader?"}</h2>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setAssignModal({ open: false, applicationId: null, executiveId: null, teamLeaderId: null, role: null });
                    }}
                    className="w-full border p-2 rounded"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={async () => {
                      setAssignLoading(true);
                      const token =
                        localStorage.getItem("adminToken") ||
                        localStorage.getItem("token");

                      try {
                        if (assignModal.role === "teamLeader" && assignModal.teamLeaderId) {
                          const res = await fetch(
                            `https://insurance-backend-eufn.onrender.com/api/application/assign-teamleader/${assignModal.applicationId}`,
                            {
                              method: "PUT",
                              headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ teamLeaderId: assignModal.teamLeaderId }),
                            }
                          );
                          const data = await res.json();
                          if (res.ok) {
                            const tlObj = data?.data?.teamLeader || data.teamLeader || null;
                            const tlName = tlObj?.Name || tlObj?.name || findNameFor(teamLeadersUnique, assignModal.teamLeaderId);
                            const tlToSet = tlObj ? tlObj : { _id: assignModal.teamLeaderId, Name: tlName };
                            setApplications((prev) =>
                              prev.map((app) =>
                                app._id === assignModal.applicationId
                                  ? { ...app, teamLeader: tlToSet }
                                  : app
                              )
                            );
                          }
                        }

                        if (assignModal.role === "executive" && assignModal.executiveId) {
                          const res = await fetch(
                            `https://insurance-backend-eufn.onrender.com/api/application/assign-executive/${assignModal.applicationId}`,
                            {
                              method: "PUT",
                              headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ executiveId: assignModal.executiveId }),
                            }
                          );
                          const data = await res.json();
                          if (res.ok) {
                            const exObj = data?.data?.executive || data.executive || null;
                            const exName = exObj?.Name || exObj?.name || findNameFor(executivesUnique, assignModal.executiveId);
                            const exToSet = exObj ? exObj : { _id: assignModal.executiveId, Name: exName };
                            setApplications((prev) =>
                              prev.map((app) =>
                                app._id === assignModal.applicationId
                                  ? { ...app, executive: exToSet }
                                  : app
                              )
                            );
                          }
                        }

                        setAssignModal({ open: false, applicationId: null, executiveId: null, teamLeaderId: null, role: null });
                      } catch (err) {
                        console.error("Assign error:", err);
                      } finally {
                        setAssignLoading(false);
                      }

                    }}
                    className="w-full bg-blue-600 text-white p-2 rounded"
                    disabled={assignLoading}
                  >
                    {assignLoading ? "Assigning..." : "Confirm"}
                  </button>
                </div>
              </div>
        </div>
      )}
    </div>
  );
};

export default PendingApplications;