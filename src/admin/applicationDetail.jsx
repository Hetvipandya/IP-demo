import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, FileText, Download, Calendar, 
  Car, Shield, Image as ImageIcon, User, Info, Hash, Clock
} from "lucide-react";

const ApplicationDetail = ({ applicationId, onBack }) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // ડેટા ફેચ કરવાની રીત (તમારા API endpoint મુજબ બદલી લેવું)
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // અહીં તમારો API Call આવશે, અત્યારે dummy logic છે
        // const res = await fetch(`/api/applications/${applicationId}`);
        // const data = await res.json();
        
        // Dummy data for structure (તમારા DB મુજબ)
        const dummyData = {
          "_id": "69f42bb14f26f66f861b2f25",
          "user": "69f428104f26f66f861b2f1f",
          "carNo": "GJ01AB1235",
          "rcBookImages": ["/uploads/sample-rc.jpg"],
          "aadharCardImages": ["/uploads/a1.png", "/uploads/a2.jpg"],
          "panCardImages": [],
          "oldPolicyImages": [],
          "tp": "full",
          "otherImages": ["/uploads/other.png"],
          "otherDetails": "Car Insurance",
          "createdAt": "2026-05-01T04:27:29.970Z",
          "updatedAt": "2026-05-01T04:27:29.970Z"
        };
        
        setApplication(dummyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [applicationId]);

  if (loading) return <div className="p-10 text-center font-bold">Loading Application Details...</div>;
  if (!application) return <div className="p-10 text-center">No Record Found.</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to List</span>
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Top Banner: Vehicle & Status */}
          <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400">
                <Car size={32} />
              </div>
              <div>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Vehicle Number</p>
                <h1 className="text-3xl font-black tracking-tight">{application.carNo}</h1>
              </div>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10">
              <p className="text-gray-400 text-[10px] uppercase font-bold">Insurance Type</p>
              <p className="font-bold text-lg capitalize">{application.tp === 'full' ? 'Comprehensive' : application.tp}</p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Column 1 & 2: Primary Information */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Application Details Grid */}
              <section>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Info size={14} /> Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                  <DetailBox label="Record ID" value={application._id} icon={<Hash size={16}/>} />
                  <DetailBox label="User ID" value={application.user} icon={<User size={16}/>} />
                  <DetailBox label="Submitted On" value={formatDate(application.createdAt)} icon={<Calendar size={16}/>} />
                  <DetailBox label="Last Updated" value={formatDate(application.updatedAt)} icon={<Clock size={16}/>} />
                  <div className="md:col-span-2">
                    <DetailBox label="Other Remarks" value={application.otherDetails || "No additional remarks"} icon={<FileText size={16}/>} />
                  </div>
                </div>
              </section>

              {/* Document Repository */}
              <section className="pt-6 border-t border-gray-100">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <ImageIcon size={14} /> Uploaded Documents
                </h3>
                
                <div className="space-y-4">
                  <DocCategory title="RC Book" files={application.rcBookImages} />
                  <DocCategory title="Aadhar Card" files={application.aadharCardImages} />
                  <DocCategory title="PAN Card" files={application.panCardImages} />
                  <DocCategory title="Old Policy" files={application.oldPolicyImages} />
                  <DocCategory title="Other Images" files={application.otherImages} />
                </div>
              </section>
            </div>

            {/* Column 3: Quick Stats */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-6">
                <h4 className="font-bold text-gray-800 mb-4">Summary</h4>
                <div className="space-y-3">
                  <StatRow label="RC Images" count={application.rcBookImages?.length} />
                  <StatRow label="Aadhar Images" count={application.aadharCardImages?.length} />
                  <StatRow label="PAN Images" count={application.panCardImages?.length} />
                  <StatRow label="Old Policy" count={application.oldPolicyImages?.length} />
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                   <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-xl">
                      <Shield size={18} />
                      <span className="text-xs font-bold uppercase">Verified Asset</span>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub Components ---

const DetailBox = ({ label, value, icon }) => (
  <div className="group">
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-gray-400">{icon}</span>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
    </div>
    <p className="text-slate-700 font-semibold break-all text-sm md:text-base">{value}</p>
  </div>
);

const StatRow = ({ label, count = 0 }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-500">{label}</span>
    <span className={`font-bold ${count > 0 ? 'text-blue-600' : 'text-gray-300'}`}>{count} Files</span>
  </div>
);

const DocCategory = ({ title, files }) => {
  if (!files || files.length === 0) return (
    <div className="flex justify-between items-center p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 opacity-60">
      <span className="text-sm font-medium text-gray-400">{title}</span>
      <span className="text-[10px] font-bold text-gray-400 uppercase">Not Uploaded</span>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{title}</span>
      </div>
      <div className="divide-y divide-gray-100">
        {files.map((path, i) => {
          const fileName = path.split('/').pop();
          return (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-blue-50/30 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                   <ImageIcon size={14} />
                </div>
                <span className="text-xs font-medium text-slate-600 truncate">{fileName}</span>
              </div>
              <a 
                href={path} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                <Download size={12} /> View
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationDetail;