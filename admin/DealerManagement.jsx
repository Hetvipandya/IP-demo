import { useEffect, useState } from "react";
import { CheckCircle2, Mail, Search, ShieldCheck, Trash2, UserCheck, Users } from "lucide-react";

const hideScrollbarCSS = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const DealerManagement = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://insurance-backend-eufn.onrender.com/api/user/dealers");
      const responseData = await res.json();
      const allUsers = Array.isArray(responseData) ? responseData : responseData.users || [];
      setDealers(allUsers.filter((user) => user.role === "dealer"));
    } catch (err) {
      console.error("Failed to fetch dealers:", err);
    } finally {
      setLoading(false);
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

  const filteredDealers = dealers.filter((dealer) => {
    const query = search.toLowerCase();
    return dealer.fullName?.toLowerCase().includes(query) || dealer.emailId?.toLowerCase().includes(query);
  });

  const approvedCount = dealers.filter((dealer) => dealer.isApproved).length;
  const pendingCount = dealers.length - approvedCount;

  return (
    <div className="relative min-h-screen overflow-hidden rounded-[1.75rem] border border-white bg-[#f7f8fc] p-4 shadow-2xl shadow-[#1f2f86]/10 md:p-7">
      <style>{hideScrollbarCSS}</style>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(230,54,46,0.13),transparent_28%),radial-gradient(circle_at_90%_8%,rgba(31,47,134,0.17),transparent_35%)]" />

      <div className="relative mb-6 flex flex-col gap-4 rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-xl shadow-[#1f2f86]/10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e6362e]">Admin Workspace</p>
          <h1 className="mt-2 text-3xl font-black text-[#121a43]">Dealer Management</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Approve, review, and remove dealer accounts in a focused view.</p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-[#dfe5f3] bg-white px-4 py-3 text-[#1f2f86]">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search dealers"
            className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400 md:w-64"
          />
        </div>
      </div>

      <div className="relative mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard label="Total Dealers" value={dealers.length} icon={<Users size={20} />} />
        <SummaryCard label="Pending Approval" value={pendingCount} icon={<UserCheck size={20} />} />
        <SummaryCard label="Approved Dealers" value={approvedCount} icon={<CheckCircle2 size={20} />} />
      </div>

      <div className="relative rounded-[1.75rem] border border-white/30 bg-gradient-to-br from-[#1f2f86] via-[#293da5] to-[#e6362e] p-5 text-white shadow-2xl shadow-[#1f2f86]/25 md:p-7">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-3 text-2xl font-black">
            <ShieldCheck className="text-white/80" /> Dealer List
          </h2>
          <span className="rounded-full border border-white/15 bg-white/15 px-3 py-1 text-xs font-bold text-white/80">
            {filteredDealers.length} shown
          </span>
        </div>

        <div className="hide-scrollbar max-h-[62vh] space-y-4 overflow-y-auto pr-1">
          {loading ? (
            <div className="rounded-2xl border border-white/15 bg-white/10 py-14 text-center text-sm font-semibold text-white/60">
              Loading dealers...
            </div>
          ) : filteredDealers.length > 0 ? (
            filteredDealers.map((dealer) => (
              <div
                key={dealer._id}
                className={`grid gap-4 rounded-2xl border p-5 transition-all lg:grid-cols-[1fr_auto] ${
                  dealer.isApproved ? "border-emerald-300/40 bg-emerald-400/20" : "border-white/15 bg-white/15"
                }`}
              >
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black">{dealer.fullName}</h3>
                    {dealer.isApproved ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-black text-[#063b22]">
                        <CheckCircle2 size={10} /> APPROVED
                      </span>
                    ) : (
                      <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-black text-white/80">
                        PENDING
                      </span>
                    )}
                  </div>
                  <p className="flex items-center gap-2 text-sm font-medium text-white/75">
                    <Mail size={14} /> {dealer.emailId}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  {!dealer.isApproved && (
                    <button
                      onClick={() => handleApproval(dealer._id)}
                      className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-black text-[#1f2f86] transition-colors hover:bg-[#f1f4fb]"
                    >
                      <UserCheck size={14} /> Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(dealer._id)}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#121a43]/35 px-5 text-xs font-black text-white transition-colors hover:bg-[#e6362e]"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-white/15 bg-white/10 py-14 text-center text-sm font-semibold text-white/60">
              No dealers found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-white bg-white/90 p-5 shadow-xl shadow-[#1f2f86]/10">
    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#1f2f86] to-[#e6362e] text-white shadow-lg">
      {icon}
    </div>
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-3xl font-black text-[#121a43]">{value}</p>
    </div>
  </div>
);

export default DealerManagement;
