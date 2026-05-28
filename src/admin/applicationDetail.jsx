import { useEffect, useState } from "react";
import PreLoader from "../components/PreLoader";
import {
  ArrowLeft, FileText, Download, Calendar,
  Car, Shield, Image as ImageIcon, User, Info, Hash, Clock,
  CheckCircle2, XCircle, UploadCloud, MessageCircle
} from "lucide-react";
import toast from "react-hot-toast";

/* ================= HELPER FUNCTIONS ================= */

const getFullImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const baseUrl = 'https://insurance-backend-eufn.onrender.com';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}/${cleanPath}`;
};

/* ================= SUB COMPONENTS ================= */

const DetailBox = ({ label, value, icon }) => (
  <div>
    <div className="flex items-center gap-1 text-gray-400 text-xs">
      {icon} {label}
    </div>
    <p className="text-sm font-semibold break-all">{value || "N/A"}</p>
  </div>
);

const StatRow = ({ label, count = 0 }) => (
  <div className="flex justify-between text-sm">
    <span>{label}</span>
    <span className={count > 0 ? "text-blue-600 font-bold" : "text-gray-300"}>
      {count}
    </span>
  </div>
);

const DocCategory = ({ title, files }) => {
  if (!files || files.length === 0) {
    return (
      <div className="p-3 bg-gray-100 rounded-lg text-xs text-gray-400">
        {title} - Not Uploaded
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <div className="bg-gray-100 px-3 py-1 text-xs font-bold">{title}</div>
      {files.map((path, i) => {
        const fullUrl = getFullImageUrl(path);
        return (
          <div key={i} className="flex justify-between p-2 text-xs border-b last:border-b-0">
            <span className="truncate flex-1 mr-2">{path.split("/").pop()}</span>
            <a
              href={fullUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 flex items-center gap-1 hover:text-blue-800"
            >
              <Download size={12} /> View
            </a>
          </div>
        );
      })}
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const ApplicationDetail = ({ application, onBack }) => {
  const [currentApplication, setCurrentApplication] = useState(application);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [actionLoading, setActionLoading] = useState("");
  const [message, setMessage] = useState("");
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [pendingStatus, setPendingStatus] = useState("");

  // Format ID as yyyymmdd from createdAt
const getDateId = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const parts = formatter.formatToParts(date);

  const obj = {};
  parts.forEach(({ type, value }) => {
    obj[type] = value;
  });

  return `${obj.day}${obj.month}${obj.year}${obj.hour}${obj.minute}${obj.second}`;
};
  useEffect(() => {
    setCurrentApplication(application);
  }, [application]);

  if (!currentApplication) {
    return <div className="p-10 text-center">No Record Found.</div>;
  }

  if (actionLoading === "policy") {
    return <PreLoader />;
  }

  const token = localStorage.getItem("executiveToken") || localStorage.getItem("token");

  const updateApplication = async (formData, successMessage, loadingKey) => {
    if (!token) {
      toast.error("Executive token not found. Please login again.");
      return;
    }

    try {
      setActionLoading(loadingKey);
      setMessage("");

      const res = await fetch(`https://insurance-backend-eufn.onrender.com/api/application/update/${currentApplication._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Action failed. Please try again.");
        return;
      }

      const updatedApplication = data.data || {};
      setCurrentApplication({
        ...currentApplication,
        ...updatedApplication,
        user: typeof updatedApplication.user === "object" ? updatedApplication.user : currentApplication.user,
      });
      toast.success(successMessage);
      setSelectedPolicy(null);
    } catch (err) {
      console.error("Application update failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setActionLoading("");
    }
  };

  const handleStatusUpdate = async (status) => {
    // Prevent approved -> rejected
    if (currentApplication.status === "approved" && status === "rejected") {
      toast.error("Approved application cannot be rejected.");
      return;
    }

    try {
      setActionLoading(status);

      const token = localStorage.getItem("executiveToken") || localStorage.getItem("token");

      if (!token) {
        toast.error("Token not found");
        return;
      }

      const formData = new FormData();
      formData.append("status", status);

      // Rejection validation
      if (status === "rejected") {
        if (!rejectReason.trim()) {
          toast.error("Please enter rejection reason");
          setActionLoading("");
          return;
        }
        formData.append("rejectionReason", rejectReason.trim());
      } else {
        // Clear rejection reason if status is not rejected
        formData.append("rejectionReason", "");
      }

      const res = await fetch(
        `https://insurance-backend-eufn.onrender.com/api/application/update/${currentApplication._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      // Update latest backend data
      setCurrentApplication((prev) => ({
        ...prev,
        ...data.data,
        status: status,
        rejectionReason: status === "rejected" ? rejectReason : "",
      }));

      // Close reject UI
      setShowRejectBox(false);
      setShowConfirmPopup(false);
      setRejectReason("");
      setPendingStatus("");

      toast.success(`Application ${status} successfully`);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setActionLoading("");
    }
  };

  const handlePolicyUpload = async () => {
    if (!selectedPolicy) {
      toast.error("Please select a policy document first.");
      return;
    }

    const formData = new FormData();
    formData.append("adminPolicyDocument", selectedPolicy);
    await updateApplication(formData, "Policy document uploaded successfully.", "upload");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShareWhatsApp = () => {
    const appNumber = currentApplication.applicationId || getDateId(currentApplication.createdAt);
    const carNo = currentApplication.carNo || "N/A";
    const dealerName = currentApplication.user?.fullName || "N/A";
    const policyDocumentUrl = currentApplication.adminPolicyDocument
      ? getFullImageUrl(currentApplication.adminPolicyDocument)
      : "Not uploaded";

    const message = `📄 Insurance Policy Details\n\n━━━━━━━━━━━━━━━━━━━━\n📋 Application ID: ${appNumber}\n🚗 Vehicle Number: ${carNo}\n👤 Dealer Name: ${dealerName}\n📎 Policy Document: ${policyDocumentUrl}\n━━━━━━━━━━━━━━━━━━━━\n✅ Policy Generated By: Griva Insurance Solution\n📅 Date: ${new Date().toLocaleDateString()}\n\n🔗 Click here to view: ${policyDocumentUrl !== "Not uploaded" ? policyDocumentUrl : "Not available"}\n\nThank you for choosing Griva Insurance! 🛡️`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Confirmation Popup Component
  const ConfirmPopup = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${pendingStatus === "approved"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
            }`}>
            {pendingStatus === "approved" ? (
              <CheckCircle2 size={24} />
            ) : (
              <XCircle size={24} />
            )}
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Confirm {pendingStatus}
            </h3>
            <p className="text-sm text-slate-500">
              Are you sure you want to{" "}
              <span className="font-bold capitalize">{pendingStatus}</span>{" "}
              this application?
            </p>
          </div>
        </div>

        {pendingStatus === "rejected" && rejectReason && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-xs font-bold text-red-700">Rejection Reason</p>
            <p className="mt-1 text-sm text-red-600">{rejectReason}</p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              setShowConfirmPopup(false);
              setPendingStatus("");
            }}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={() => handleStatusUpdate(pendingStatus)}
            disabled={actionLoading === pendingStatus}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white transition ${pendingStatus === "approved"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
              } disabled:opacity-60`}
          >
            {actionLoading === pendingStatus ? "Processing..." : `Yes, ${pendingStatus}`}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="font-semibold">Back</span>
        </button>

        <div className="bg-white rounded-3xl shadow border overflow-hidden">
          {/* TOP SECTION */}
          <div className="bg-slate-900 p-6 text-white flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                <Car size={28} />
              </div>
              <div>
                <p className="text-xs text-blue-400">Vehicle Number</p>
                <h1 className="text-2xl font-bold">{currentApplication.carNo || "N/A"}</h1>
              </div>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <p className="text-xs text-gray-300">Type</p>
              <p className="font-bold capitalize">
                {currentApplication.tp === "full" ? "Comprehensive" : currentApplication.tp || "N/A"}
              </p>
            </div>
          </div>

          {/* MAIN */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* BASIC INFO */}
              <div>
                <h3 className="text-xs text-gray-400 mb-4 flex items-center gap-2">
                  <Info size={14} /> Basic Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <DetailBox
  label="Application ID"
  value={getDateId(currentApplication.createdAt)}
  icon={<Hash size={14} />}
/>
                  <DetailBox
                    label="Dealer Agency Name"
                    value={currentApplication.user?.fullName || "N/A"}
                    icon={<User size={14} />}
                  />
                  <DetailBox
                    label="Created"
                    value={formatDate(currentApplication.createdAt)}
                    icon={<Calendar size={14} />}
                  />
                  <DetailBox
                    label="Updated"
                    value={formatDate(currentApplication.updatedAt)}
                    icon={<Clock size={14} />}
                  />
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailBox
                      label="Details"
                      value={currentApplication.otherDetails || "No details"}
                      icon={<FileText size={14} />}
                    />
                    <DetailBox
                      label="Executive"
                      value={currentApplication.executive?.Name || "Not Assigned"}
                      icon={<User size={14} />}
                    />
                  </div>

                </div>

                {/* Rejection Reason Section - Full Width */}
                {currentApplication.status === "rejected" && currentApplication.rejectionReason && (
                  <div className="mt-6 rounded-xl border-l-4 border-red-500 bg-red-50 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="rounded-full bg-red-100 p-2">
                          <XCircle size={18} className="text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-sm font-bold text-red-700">Rejection Reason</h4>
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                            Action Required
                          </span>
                        </div>
                        <p className="text-sm text-red-600 leading-relaxed break-words">
                          {currentApplication.rejectionReason}
                        </p>
                        <div className="mt-3 pt-2 border-t border-red-200">
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <Clock size={12} />
                            Rejected on: {formatDate(currentApplication.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DOCUMENTS */}
              <div>
                <h3 className="text-xs text-gray-400 mb-4 flex items-center gap-2">
                  <ImageIcon size={14} /> Documents
                </h3>
                <div className="space-y-3">
                  <DocCategory title="RC Book" files={currentApplication.rcBookImages} />
                  <DocCategory title="Aadhar Card" files={currentApplication.aadharCardImages} />
                  <DocCategory title="PAN Card" files={currentApplication.panCardImages} />
                  <DocCategory title="Old Policy" files={currentApplication.oldPolicyImages} />
                  <DocCategory title="Other Documents" files={currentApplication.otherImages} />
                  <DocCategory title="Admin Policy Document" files={currentApplication.adminPolicyDocument ? [currentApplication.adminPolicyDocument] : []} />
                </div>
              </div>
            </div>

            {/* RIGHT - SUMMARY */}
            <div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Shield size={16} />
                  Documents Summary
                </h4>
                <div className="space-y-2">
                  <StatRow label="RC Book" count={currentApplication.rcBookImages?.length || 0} />
                  <StatRow label="Aadhar Card" count={currentApplication.aadharCardImages?.length || 0} />
                  <StatRow label="PAN Card" count={currentApplication.panCardImages?.length || 0} />
                  <StatRow label="Old Policy" count={currentApplication.oldPolicyImages?.length || 0} />
                  <StatRow label="Other Documents" count={currentApplication.otherImages?.length || 0} />
                </div>
                <div className="mt-4 bg-blue-50 text-blue-600 p-3 rounded-lg flex items-center gap-2">
                  <Shield size={16} />
                  <span className="text-xs font-bold">Total Documents: {
                    (currentApplication.rcBookImages?.length || 0) +
                    (currentApplication.aadharCardImages?.length || 0) +
                    (currentApplication.panCardImages?.length || 0) +
                    (currentApplication.oldPolicyImages?.length || 0) +
                    (currentApplication.otherImages?.length || 0)
                  }</span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION - ACTIONS */}
          <div className="border-t bg-[#f8fafc] p-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.1fr]">
  {/* Status Update Section */}
  <div className="rounded-2xl border border-[#d9e3f5] bg-white p-4">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1f2f86]">Application Status</p>
        <h4 className="mt-1 text-lg font-black text-[#10183f]">Approve or reject</h4>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-black uppercase ring-1 ${currentApplication.status === "approved"
          ? "bg-green-50 text-green-700 ring-green-200"
          : currentApplication.status === "rejected"
            ? "bg-red-50 text-red-700 ring-red-200"
            : "bg-amber-50 text-amber-700 ring-amber-200"
          }`}>
          {currentApplication.status || "pending"}
        </span>
      </div>
    </div>

    {/* Show warning if no policy document uploaded */}
    {currentApplication.status !== "approved" && 
     currentApplication.status !== "rejected" && 
     !currentApplication.adminPolicyDocument && (
      <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3">
        <div className="flex items-center gap-2">
          <UploadCloud size={16} className="text-yellow-600" />
          <p className="text-xs text-yellow-700">
            <span className="font-bold">Note:</span> Please upload policy document before approving this application.
          </p>
        </div>
      </div>
    )}

    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => {
          if (currentApplication.status === "approved") {
            toast.error("Application is already approved");
            return;
          }
          if (currentApplication.status === "rejected") {
            toast.error("Rejected application cannot be approved");
            return;
          }
          
          // Check if policy document is uploaded
          if (!currentApplication.adminPolicyDocument) {
            toast.error("Please upload policy document before approving the application");
            return;
          }
          
          setPendingStatus("approved");
          setShowConfirmPopup(true);
        }}
        disabled={
          actionLoading === "approved" ||
          currentApplication.status === "approved" ||
          currentApplication.status === "rejected" ||
          !currentApplication.adminPolicyDocument // Disable if no policy document
        }
        className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60 ${
          currentApplication.status === "rejected" || !currentApplication.adminPolicyDocument
            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-[#cbdcff] bg-[#f3f7ff] text-[#1f2f86] hover:border-[#1f2f86] hover:bg-white"
        }`}
      >
        <CheckCircle2 size={17} />
        {currentApplication.status === "approved"
          ? "Already Approved"
          : currentApplication.status === "rejected"
            ? "Cannot Approve"
            : !currentApplication.adminPolicyDocument
              ? "Upload Policy First"
              : actionLoading === "approved"
                ? "Approving..."
                : "Approve"}
      </button>

      <button
        onClick={() => {
          if (currentApplication.status === "approved") {
            toast.error("Approved application cannot be rejected");
            return;
          }
          if (currentApplication.status === "rejected") {
            toast.error("Application is already rejected");
            return;
          }
          setShowRejectBox(true);
        }}
        disabled={
          actionLoading === "rejected" ||
          currentApplication.status === "approved" ||
          currentApplication.status === "rejected"
        }
        className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60 ${
          currentApplication.status === "rejected"
            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            : "border-[#ffd4d0] bg-[#fff5f4] text-[#e6362e] hover:border-[#e6362e] hover:bg-white"
        }`}
      >
        <XCircle size={17} />
        {currentApplication.status === "approved"
          ? "Already Approved"
          : currentApplication.status === "rejected"
            ? "Already Rejected"
            : actionLoading === "rejected"
              ? "Rejecting..."
              : "Reject"}
      </button>
    </div>

    {showRejectBox && (
      <div className="mt-4 border border-red-200 bg-red-50 p-4 rounded-xl">
        <label className="text-sm font-bold text-red-700">
          Rejection Reason
        </label>
        <textarea
          className="w-full mt-2 border p-2 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
          rows={3}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Enter rejection reason..."
        />
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => {
              if (!rejectReason.trim()) {
                toast.error("Please enter rejection reason");
                return;
              }
              setPendingStatus("rejected");
              setShowConfirmPopup(true);
              setShowRejectBox(false);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            disabled={actionLoading === "rejected"}
          >
            {actionLoading === "rejected" ? "Submitting..." : "Submit Reject"}
          </button>
          <button
            onClick={() => {
              setShowRejectBox(false);
              setRejectReason("");
            }}
            className="border px-4 py-2 rounded hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>

  {/* Policy Upload Section */}
  <div className="rounded-2xl border border-[#d9e3f5] bg-white p-4">
    <div className="mb-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e6362e]">Policy Document</p>
      <h4 className="mt-1 text-lg font-black text-[#10183f]">Upload policy document</h4>
    </div>

    {/* Show success indicator when policy is uploaded */}
    {currentApplication.adminPolicyDocument && (
      <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-green-600" />
          <p className="text-xs text-green-700">
            <span className="font-bold">Success:</span> Policy document uploaded successfully. You can now approve this application.
          </p>
        </div>
      </div>
    )}

    <div className="grid gap-3 md:grid-cols-[1fr_auto]">
      <label className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed p-4 transition ${
        currentApplication.adminPolicyDocument
          ? "border-green-300 bg-green-50 hover:border-green-500"
          : "border-[#b9c9ee] bg-[#f7faff] hover:border-[#1f2f86] hover:bg-white"
      }`}>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(event) => setSelectedPolicy(event.target.files?.[0] || null)}
          className="hidden"
          disabled={currentApplication.status === "approved"} // Disable if already approved
        />
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm ${
          currentApplication.adminPolicyDocument ? "text-green-600" : "text-[#1f2f86]"
        }`}>
          <UploadCloud size={20} />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-black text-[#10183f]">
            {selectedPolicy ? "Selected file" : currentApplication.adminPolicyDocument ? "Policy Uploaded" : "Choose policy document"}
          </span>
          <span className="mt-0.5 block truncate text-xs font-semibold text-slate-500">
            {selectedPolicy 
              ? selectedPolicy.name 
              : currentApplication.adminPolicyDocument 
                ? "Click to replace policy document"
                : "Click here to select PDF, JPG, JPEG, or PNG"}
          </span>
        </span>
      </label>
      <button
        onClick={handlePolicyUpload}
        disabled={!selectedPolicy || actionLoading === "upload" || currentApplication.status === "approved"}
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1f2f86] px-5 text-sm font-black text-white transition hover:bg-[#e6362e] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <UploadCloud size={17} /> 
        {actionLoading === "upload" 
          ? "Uploading..." 
          : currentApplication.adminPolicyDocument 
            ? "Replace" 
            : "Upload"}
      </button>
    </div>

    {currentApplication.adminPolicyDocument && (
      <a
        href={getFullImageUrl(currentApplication.adminPolicyDocument)}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#1f2f86] hover:text-[#e6362e]"
      >
        <Download size={15} /> View uploaded policy document
      </a>
    )}
  </div>
</div>

            {/* WhatsApp Share Section */}
            <div className="mt-4 rounded-2xl border border-[#25d366]/30 bg-[#f0fdf4] p-4">
              <button
                onClick={handleShareWhatsApp}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] px-5 py-3 text-sm font-black text-white transition hover:bg-[#20ba5a]"
              >
                <MessageCircle size={18} /> Share on WhatsApp
              </button>
              <p className="mt-2 text-center text-xs text-slate-600">
                Sends application details and policy document status
              </p>
            </div>

            {message && (
              <div className="mt-4 rounded-xl border border-[#d9e3f5] bg-white px-4 py-3 text-sm font-bold text-[#1f2f86]">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmPopup && <ConfirmPopup />}
    </div>
  );
};

export default ApplicationDetail;