import React from "react";
import { 
  ArrowLeft, FileText, Download, Calendar, 
  Car, Shield, Image as ImageIcon, User, Info, Hash, Clock
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

  if (!application) {
    return <div className="p-10 text-center">No Record Found.</div>;
  }

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
                <h1 className="text-2xl font-bold">{application.carNo}</h1>
              </div>
            </div>

            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <p className="text-xs text-gray-300">Type</p>
              <p className="font-bold capitalize">
                {application.tp === "full" ? "Comprehensive" : application.tp}
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
                  <DetailBox label="ID" value={application._id} icon={<Hash size={14}/>}/>
               <DetailBox 
  label="Delear Agency Name" 
  value={application.user?.fullName || "N/A"} 
  icon={<User size={14}/>}
/>
                  <DetailBox label="Created" value={formatDate(application.createdAt)} icon={<Calendar size={14}/>}/>
                  <DetailBox label="Updated" value={formatDate(application.updatedAt)} icon={<Clock size={14}/>}/>
                  
                  <div className="md:col-span-2">
                    <DetailBox 
                      label="Details" 
                      value={application.otherDetails || "No details"} 
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
                  <DocCategory title="RC Book" files={application.rcBookImages} />
                  <DocCategory title="Aadhar" files={application.aadharCardImages} />
                  <DocCategory title="PAN" files={application.panCardImages} />
                  <DocCategory title="Old Policy" files={application.oldPolicyImages} />
                  <DocCategory title="Other" files={application.otherImages} />
                </div>
              </div>

            </div>

            {/* RIGHT */}
            <div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold mb-3">Summary</h4>

                <StatRow label="RC" count={application.rcBookImages?.length}/>
                <StatRow label="Aadhar" count={application.aadharCardImages?.length}/>
                <StatRow label="PAN" count={application.panCardImages?.length}/>
                <StatRow label="Policy" count={application.oldPolicyImages?.length}/>

                <div className="mt-4 bg-blue-50 text-blue-600 p-2 rounded-lg flex items-center gap-2">
                  <Shield size={16}/>
                  <span className="text-xs font-bold">Verified</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;