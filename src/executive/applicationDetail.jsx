import { useEffect, useState } from "react";
import { 
  ArrowLeft, FileText, Download, Calendar, 
  Car, Shield, Image as ImageIcon, User, Info, Hash, Clock,
  CheckCircle2, XCircle, UploadCloud
} from "lucide-react";

/* ================= SUB COMPONENTS (TOP પર રાખવા) ================= */

const DetailBox = ({ label, value, icon }) => (
  <div>
    <div className="flex items-center gap-1 text-gray-400 text-xs">
      {icon} {label}
    </div>
    <p className="text-sm font-semibold break-all">{value}</p>
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

      {files.map((path, i) => (
        <div key={i} className="flex justify-between p-2 text-xs">
          <span>{path.split("/").pop()}</span>
          <a href={path} target="_blank" rel="noreferrer" className="text-blue-600 flex items-center gap-1">
            <Download size={12}/> View
          </a>
        </div>
      ))}
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const ApplicationDetail = ({ application, onBack }) => {
  const [currentApplication, setCurrentApplication] = useState(application);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [actionLoading, setActionLoading] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCurrentApplication(application);
  }, [application]);

  if (!currentApplication) {
    return <div className="p-10 text-center">No Record Found.</div>;
  }

  const token = localStorage.getItem("executiveToken") || localStorage.getItem("token");

  const updateApplication = async (formData, successMessage, loadingKey) => {
    if (!token) {
      setMessage("Admin token not found. Please login again.");
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
        setMessage(data.message || "Action failed. Please try again.");
        return;
      }

      const updatedApplication = data.data || {};
      setCurrentApplication({
        ...currentApplication,
        ...updatedApplication,
        user: typeof updatedApplication.user === "object" ? updatedApplication.user : currentApplication.user,
      });
      setMessage(successMessage);
      setSelectedPolicy(null);
    } catch (err) {
      console.error("Application update failed:", err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setActionLoading("");
    }
  };

  const handleStatusUpdate = (status) => {
    const formData = new FormData();
    formData.append("status", status);
    updateApplication(
      formData,
      status === "approved" ? "Application approved successfully." : "Application rejected successfully.",
      status
    );
  };

  const handlePolicyUpload = () => {
    if (!selectedPolicy) {
      setMessage("Please select a policy document first.");
      return;
    }

    const formData = new FormData();
    formData.append("adminPolicyDocument", selectedPolicy);
    updateApplication(formData, "Policy document uploaded successfully.", "upload");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* BACK BUTTON */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6"
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
                <h1 className="text-2xl font-bold">{currentApplication.carNo}</h1>
              </div>
            </div>

            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <p className="text-xs text-gray-300">Type</p>
              <p className="font-bold capitalize">
                {currentApplication.tp === "full" ? "Comprehensive" : currentApplication.tp}
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
                  <Info size={14}/> Basic Info
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailBox label="ID" value={currentApplication._id} icon={<Hash size={14}/>}/>
               <DetailBox 
  label="Delear Agency Name" 
  value={currentApplication.user?.fullName || "N/A"} 
  icon={<User size={14}/>}
/>
                  <DetailBox label="Created" value={formatDate(currentApplication.createdAt)} icon={<Calendar size={14}/>}/>
                  <DetailBox label="Updated" value={formatDate(currentApplication.updatedAt)} icon={<Clock size={14}/>}/>
                  
                  <div className="md:col-span-2">
                    <DetailBox 
                      label="Details" 
                      value={currentApplication.otherDetails || "No details"} 
                      icon={<FileText size={14}/>}
                    />
                  </div>
                </div>
              </div>

              {/* DOCUMENTS */}
              <div>
                <h3 className="text-xs text-gray-400 mb-4 flex items-center gap-2">
                  <ImageIcon size={14}/> Documents
                </h3>

                <div className="space-y-3">
                  <DocCategory title="RC Book" files={currentApplication.rcBookImages} />
                  <DocCategory title="Aadhar" files={currentApplication.aadharCardImages} />
                  <DocCategory title="PAN" files={currentApplication.panCardImages} />
                  <DocCategory title="Old Policy" files={currentApplication.oldPolicyImages} />
                  <DocCategory title="Other" files={currentApplication.otherImages} />
                  <DocCategory title="Admin Policy Document" files={currentApplication.adminPolicyDocument ? [currentApplication.adminPolicyDocument] : []} />
                </div>
              </div>

            </div>

            {/* RIGHT */}
            <div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold mb-3">Summary</h4>

                <StatRow label="RC" count={currentApplication.rcBookImages?.length}/>
                <StatRow label="Aadhar" count={currentApplication.aadharCardImages?.length}/>
                <StatRow label="PAN" count={currentApplication.panCardImages?.length}/>
                <StatRow label="Policy" count={currentApplication.oldPolicyImages?.length}/>

                <div className="mt-4 bg-blue-50 text-blue-600 p-2 rounded-lg flex items-center gap-2">
                  <Shield size={16}/>
                  <span className="text-xs font-bold">Verified</span>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t bg-[#f8fafc] p-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.1fr]">
              <div className="rounded-2xl border border-[#d9e3f5] bg-white p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1f2f86]">Application Status</p>
                    <h4 className="mt-1 text-lg font-black text-[#10183f]">Approve or reject</h4>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black uppercase text-amber-700 ring-1 ring-amber-200">
                    {currentApplication.status || "pending"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleStatusUpdate("approved")}
                    disabled={actionLoading === "approved"}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#cbdcff] bg-[#f3f7ff] text-sm font-black text-[#1f2f86] transition hover:border-[#1f2f86] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <CheckCircle2 size={17} /> {actionLoading === "approved" ? "Approving..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleStatusUpdate("rejected")}
                    disabled={actionLoading === "rejected"}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#ffd4d0] bg-[#fff5f4] text-sm font-black text-[#e6362e] transition hover:border-[#e6362e] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <XCircle size={17} /> {actionLoading === "rejected" ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-[#d9e3f5] bg-white p-4">
                <div className="mb-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e6362e]">Policy Document</p>
                  <h4 className="mt-1 text-lg font-black text-[#10183f]">Upload policy document</h4>
                </div>

                <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#b9c9ee] bg-[#f7faff] p-4 transition hover:border-[#1f2f86] hover:bg-white">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(event) => setSelectedPolicy(event.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#1f2f86] shadow-sm">
                      <UploadCloud size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black text-[#10183f]">
                        {selectedPolicy ? "Selected file" : "Choose policy document"}
                      </span>
                      <span className="mt-0.5 block truncate text-xs font-semibold text-slate-500">
                        {selectedPolicy ? selectedPolicy.name : "Click here to select PDF, JPG, JPEG, or PNG"}
                      </span>
                    </span>
                  </label>
                  <button
                    onClick={handlePolicyUpload}
                    disabled={!selectedPolicy || actionLoading === "upload"}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1f2f86] px-5 text-sm font-black text-white transition hover:bg-[#e6362e] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <UploadCloud size={17} /> {actionLoading === "upload" ? "Uploading..." : selectedPolicy ? "Upload" : "Select File"}
                  </button>
                </div>

                {currentApplication.adminPolicyDocument && (
                  <a
                    href={currentApplication.adminPolicyDocument}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#1f2f86] hover:text-[#e6362e]"
                  >
                    <Download size={15} /> View uploaded policy document
                  </a>
                )}
              </div>
            </div>

            {message && (
              <div className="mt-4 rounded-xl border border-[#d9e3f5] bg-white px-4 py-3 text-sm font-bold text-[#1f2f86]">
                {message}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
