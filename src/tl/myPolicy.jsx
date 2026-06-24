import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Eye,
  UserCheck,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://insurance-backend-eufn.onrender.com";

const statusStyle = {
  approved:
    "bg-green-100 text-green-700",
  pending:
    "bg-yellow-100 text-yellow-700",
  rejected:
    "bg-red-100 text-red-700",
  processing:
    "bg-blue-100 text-blue-700",
};

export default function MyPolicy() {
  const [policies, setPolicies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [executives, setExecutives] =
    useState([]);

  const [assigned, setAssigned] =
    useState({});

  // Modal state for confirming assignment
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAssign, setPendingAssign] = useState({ appId: null, executiveId: null });

  const navigate = useNavigate();

  // ================= FETCH POLICIES =================
  const fetchPolicies =
    async () => {
      try {
        setLoading(true);

        const token =
          localStorage.getItem(
            "tlToken"
          ) ||
          localStorage.getItem(
            "token"
          );

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
        const response =
          await fetch(
            `${API_BASE}/api/application/teamleader/${teamLeaderId}`,
            {
              method:
                "GET",

              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "application/json",
              },
            }
          );

        const data =
          await response.json();

        console.log(
          "API RESPONSE:",
          data
        );

        if (
          response.ok &&
          data.success
        ) {
          const filteredPolicies =
            (
              data.data ||
              []
            ).filter(
              (app) =>
                [
                  "approved",
                  "pending",
                  "processing",
                ].includes(
                  app.status?.toLowerCase()
                )
            );

          setPolicies(
            filteredPolicies
          );
        } else {
          setPolicies([]);
        }
      } catch (error) {
        console.error(
          "FETCH ERROR:",
          error
        );

        setPolicies([]);
      } finally {
        setLoading(false);
      }
    };

  // ================= FETCH EXECUTIVES =================
  const fetchExecutives =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "tlToken"
          ) ||
          localStorage.getItem(
            "token"
          );

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

  // ================= ASSIGN EXECUTIVE =================
  const assignExecutive =
    async (appId, executiveIdArg) => {
      const executiveId =
        executiveIdArg ||
        assigned[appId];

      if (
        !executiveId
      ) {
        alert(
          "Please select executive"
        );
        return;
      }

      try {
        const token =
          localStorage.getItem(
            "tlToken"
          ) ||
          localStorage.getItem(
            "token"
          );

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
          // silent success to avoid many alerts in UI
          fetchPolicies();
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

  useEffect(() => {
    fetchPolicies();
    fetchExecutives();
  }, []);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 overflow-hidden">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Policy
        </h1>

        <p className="text-gray-400 text-sm">
          All policies assigned to you
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 overflow-auto max-h-[calc(100vh-220px)]">
        <div className="flex items-center gap-2 mb-5">
          <FileText
            size={20}
            className="text-blue-500"
          />

          <h2 className="font-bold text-gray-800">
            Policy List
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading...
          </div>
        )}

        {/* Empty */}
        {!loading &&
          policies.length ===
            0 && (
            <div className="text-center py-10 text-gray-500">
              No assigned policies found
            </div>
          )}

        {/* Policies */}
        <div className="space-y-4">
          {policies.map(
            (p) => (
              <div key={p._id} className="border-b border-gray-200 py-4">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-24 md:w-40 font-bold text-gray-800 truncate">
                    {p.carNo}
                  </div>

                  <div className="hidden md:flex flex-1 text-sm text-gray-500 items-center gap-6 flex-wrap">
                    <div className="w-28 truncate">
                      <strong>Type:</strong> {p.tp || "N/A"}
                    </div>

                    <div className="w-40 truncate">
                      <strong>Dealer:</strong> {p.user?.fullName || "N/A"}
                    </div>

                    <div className="w-48 truncate max-w-[280px]">
                      <strong>Policy ID:</strong> <span className="truncate inline-block max-w-[220px]">{p.applicationId}</span>
                    </div>

                    <div className="w-36">
                      <strong>Date:</strong> {new Date(p.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden flex flex-col text-sm text-gray-500 gap-2">
                    <div>
                      <strong>Type:</strong> {p.tp || "N/A"}
                    </div>

                    <div>
                      <strong>Dealer:</strong> {p.user?.fullName || "N/A"}
                    </div>

                    <div className="truncate">
                      <strong>Policy ID:</strong> <span className="truncate">{p.applicationId}</span>
                    </div>

                    <div>
                      <strong>Date:</strong> {new Date(p.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="ml-auto flex md:flex-row flex-col items-stretch md:items-center gap-3 w-full md:w-auto">
                    <select
                      value={assigned[p._id] || p.executive?._id || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        // store selection locally and open confirmation modal
                        setAssigned((prev) => ({ ...prev, [p._id]: val }));
                        if (val) {
                          setPendingAssign({ appId: p._id, executiveId: val });
                          setShowConfirm(true);
                        }
                      }}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 w-full md:max-w-[220px]"
                    >
                      <option value="">{p.executive?.Name || "Assign Executive"}</option>
                      {executives.map((ex) => (
                        <option key={ex._id} value={ex._id}>
                          {ex.Name}
                        </option>
                      ))}
                    </select>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${
                      statusStyle[p.status?.toLowerCase()] || "bg-gray-100 text-gray-700"
                    }`}>
                      {p.status}
                    </span>
                    <button onClick={() => navigate(`/tl/application-detail/${p._id}`)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition flex items-center gap-2 w-full md:w-20 justify-center">
                      <Eye size={16} />
                      <span className="hidden sm:inline">View</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setShowConfirm(false); setPendingAssign({ appId: null, executiveId: null }); }} />

          <div className="bg-white rounded-lg shadow-lg z-10 w-11/12 max-w-md p-6">
            <h3 className="text-lg font-semibold mb-2">Confirm Assignment</h3>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to assign this executive to the policy?</p>

            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-lg border" onClick={() => { setShowConfirm(false); setPendingAssign({ appId: null, executiveId: null }); }}>
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                onClick={async () => {
                  setShowConfirm(false);
                  const { appId, executiveId } = pendingAssign;
                  setPendingAssign({ appId: null, executiveId: null });
                  if (appId && executiveId) {
                    await assignExecutive(appId, executiveId);
                  }
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}