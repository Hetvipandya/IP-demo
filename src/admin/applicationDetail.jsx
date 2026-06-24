import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PreLoader from "../components/PreLoader";
import {
  ArrowLeft, 
  FileText,
  Download,
  Calendar,
  Car,
  Shield,
  Image as ImageIcon,
  User,
  Info,
  Hash,
  Clock,
  CheckCircle2,
  XCircle,
  UploadCloud,
  MessageCircle,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

/* =========================================================
   CONFIG
========================================================= */

const BASE_URL =
  "https://insurance-backend-eufn.onrender.com";

/* =========================================================
   HELPERS
========================================================= */

const getFullImageUrl = (path) => {
  if (!path) return "";

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  const cleanPath = path.startsWith("/")
    ? path.slice(1)
    : path;

  return `${BASE_URL}/${cleanPath}`;
};

const isImageFile = (path = "") =>
  /\.(jpg|jpeg|png|webp|gif)$/i.test(path);

const isPdfFile = (path = "") =>
  /\.pdf$/i.test(path);

const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  return new Date(dateString).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

  const getDateId = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = {
      timeZone: "Asia/Kolkata",
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat("en-GB", options);
    const parts = formatter.formatToParts(date);
    const obj = {};
    parts.forEach(({ type, value }) => { obj[type] = value; });
    return `${obj.year}${obj.month}${obj.day}${obj.hour}${obj.minute}${obj.second}`;
  };

/* =========================================================
   LIGHTBOX
========================================================= */

const Lightbox = ({
  images,
  initialIndex,
  onClose,
}) => {
  const [current, setCurrent] =
    useState(initialIndex);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowRight") {
        setCurrent(
          (prev) =>
            (prev + 1) % images.length
        );
      }

      if (e.key === "ArrowLeft") {
        setCurrent(
          (prev) =>
            (prev - 1 + images.length) %
            images.length
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, [images.length, onClose]);

  const prev = () => {
    setCurrent(
      (prev) =>
        (prev - 1 + images.length) %
        images.length
    );
  };

  const next = () => {
    setCurrent(
      (prev) =>
        (prev + 1) % images.length
    );
  }; 

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X size={18} />
      </button>

      {/* Image */}
      <div
        className="relative flex items-center justify-center"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <img
          src={getFullImageUrl(
            images[current]
          )}
          alt={`Document ${
            current + 1
          }`}
          className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute -left-14 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={next}
              className="absolute -right-14 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Bottom */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <p className="text-xs text-white/70">
          {images[current]
            ?.split("/")
            ?.pop()}
        </p>

        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  current === i
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

const DetailBox = ({
  label,
  value,
  icon,
}) => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {icon}
      {label}
    </div>

    <p className="break-all text-sm font-bold text-slate-800">
      {value || "N/A"}
    </p>
  </div>
);

const StatRow = ({
  label,
  count = 0,
}) => (
  <div className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2">
    <span className="text-sm font-medium text-slate-600">
      {label}
    </span>

    <span
      className={`text-sm font-black ${
        count > 0
          ? "text-blue-700"
          : "text-slate-300"
      }`}
    >
      {count}
    </span>
  </div>
);

/* =========================================================
   DOC CATEGORY
========================================================= */

const DocCategory = ({
  title,
  files = [],
  showBadge = false,
  badge = "",
}) => {
  const [lightboxOpen, setLightboxOpen] =
    useState(false);

  const [lightboxIndex, setLightboxIndex] =
    useState(0);

  const imageFiles = useMemo(
    () =>
      files.filter((f) =>
        isImageFile(f)
      ),
    [files]
  );

  const otherFiles = useMemo(
    () =>
      files.filter(
        (f) => !isImageFile(f)
      ),
    [files]
  );

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!files?.length) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-400">
        <FileText size={16} />
        <span>
          {title} — Not Uploaded
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-black uppercase tracking-wide text-slate-600">
              {title}
            </h4>
            {showBadge && badge && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                {badge}
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-slate-400">
            {files.length} File
            {files.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Images Grid */}
        {imageFiles.length > 0 && (
          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-4">
            {imageFiles.map(
              (path, index) => (
                <button
                  key={index}
                  onClick={() =>
                    openLightbox(index)
                  }
                  className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200"
                >
                  <img
                    src={getFullImageUrl(
                      path
                    )}
                    alt={`${title}-${index}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40">
                    <ZoomIn
                      size={22}
                      className="opacity-0 transition group-hover:opacity-100 text-white"
                    />
                  </div>
                </button>
              )
            )}
          </div>
        )}

        {/* PDF and Other Files */}
        {otherFiles.length > 0 && (
          <div className="border-t border-slate-100">
            {otherFiles.map(
              (path, index) => {
                const fullUrl =
                  getFullImageUrl(path);
                const fileName = path
                  .split("/")
                  .pop();

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-none"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                      <FileText size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-700">
                        {fileName}
                      </p>

                      <p className="text-xs text-slate-400">
                        {isPdfFile(path)
                          ? "PDF Document"
                          : "Document"}
                      </p>
                    </div>

                    <a
                      href={fullUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-100 whitespace-nowrap"
                    >
                      <Download size={15} />
                      {isPdfFile(path)
                        ? "View PDF"
                        : "View"}
                    </a>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={imageFiles}
          initialIndex={
            lightboxIndex
          }
          onClose={() =>
            setLightboxOpen(false)
          }
        />
      )}
    </>
  );
};

/* =========================================================
   CONFIRM POPUP
========================================================= */

const ConfirmPopup = ({
  pendingStatus,
  rejectReason,
  loading,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full ${
              pendingStatus ===
              "approved"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {pendingStatus ===
            "approved" ? (
              <CheckCircle2 size={26} />
            ) : (
              <AlertTriangle size={26} />
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-black capitalize text-slate-900">
              Confirm{" "}
              {pendingStatus}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Are you sure you want
              to{" "}
              <span className="font-bold capitalize">
                {pendingStatus}
              </span>{" "}
              this application?
            </p>
          </div>
        </div>

        {pendingStatus ===
          "rejected" &&
          rejectReason && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-red-700">
                Rejection Reason
              </p>

              <p className="mt-2 text-sm text-red-600">
                {rejectReason}
              </p>
            </div>
          )}

        <div className="mt-7 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-black text-white transition disabled:opacity-60 ${
              pendingStatus ===
              "approved"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading
              ? "Processing..."
              : `Yes, ${pendingStatus}`}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const ApplicationDetail = ({ application, onBack }) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentApplication, setCurrentApplication] = useState(application || location.state?.application || null);

  const [
    selectedPolicy,
    setSelectedPolicy,
  ] = useState(null);

  const [
    actionLoading,
    setActionLoading,
  ] = useState("");

  const [
    showRejectBox,
    setShowRejectBox,
  ] = useState(false);

  const [
    rejectReason,
    setRejectReason,
  ] = useState("");

  const [
    showConfirmPopup,
    setShowConfirmPopup,
  ] = useState(false);

  const [
    pendingStatus,
    setPendingStatus,
  ] = useState("");


  useEffect(() => {
    setCurrentApplication(application);
  }, [application]);

  useEffect(() => {
    if (!application && params?.id) {
      const fetchApp = async () => {
        try {
          const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
          const res = await fetch(`${BASE_URL}/api/application/${params.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) setCurrentApplication(data);
        } catch (err) {
          console.error("Failed to fetch application by id:", err);
        }
      };
      fetchApp();
    }
  }, [application, params]);

  // ================= HELPER: GET OLD DOCUMENTS (EXCLUDING NEW UPLOADS) =================
  const getOldDocuments = (field) => {
    const oldDocs = currentApplication?.[field] || [];
    const newUploadedUrls = (currentApplication?.newDocuments?.[field] || [])
      .flatMap(doc => doc.urls || []);
    
    // Filter out URLs that were re-uploaded in newDocuments
    return oldDocs.filter(url => !newUploadedUrls.includes(url));
  };

  // ================= HELPER: GET NEW DOCUMENTS =================
  const getNewDocuments = (field) => {
    return (currentApplication?.newDocuments?.[field] || [])
      .flatMap(doc => doc.urls || []);
  };

  // ================= HELPER: MERGE OLD AND NEW DOCUMENTS =================
  const getAllDocuments = (field) => {
    const oldDocs = getOldDocuments(field);
    const newDocs = getNewDocuments(field);
    return [...oldDocs, ...newDocs];
  };

  const token =
    localStorage.getItem(
      "executiveToken"
    ) ||
    localStorage.getItem("token");

  /* ======================================================
     NO DATA
  ====================================================== */

  if (!currentApplication) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-bold text-slate-500">
        No Record Found
      </div>
    );
  }

  if (actionLoading === "policy") {
    return <PreLoader />;
  }

  /* ======================================================
     API UPDATE
  ====================================================== */

  const updateApplication = async (
    formData,
    successMessage,
    loadingKey
  ) => {
    if (!token) {
      toast.error(
        "Token not found. Please login again."
      );
      return;
    }

    try {
      setActionLoading(loadingKey);

      const res = await fetch(
        `${BASE_URL}/api/application/update/${currentApplication._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        toast.error(
          data.message ||
            "Something went wrong"
        );

        return;
      }

      const updatedApplication =
        data.data || {};

      // setCurrentApplication(
      //   (prev) => ({
      //     ...prev,
      //     ...updatedApplication,
      //     user:
      //       typeof updatedApplication.user ===
      //       "object"
      //         ? updatedApplication.user
      //         : prev.user,
      //   })
      // );
      setCurrentApplication(
  (prev) => ({
    ...prev,
    ...updatedApplication,

    user:
      typeof updatedApplication.user ===
      "object"
        ? updatedApplication.user
        : prev.user,

    executive:
      typeof updatedApplication.executive ===
      "object"
        ? updatedApplication.executive
        : prev.executive,
  })
);

      toast.success(successMessage);

      setSelectedPolicy(null);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update application"
      );
    } finally {
      setActionLoading("");
    }
  };

  /* ======================================================
     STATUS UPDATE
  ====================================================== */

  const handleStatusUpdate =
    async (status) => {
      try {
        setActionLoading(status);

        const formData =
          new FormData();

        formData.append(
          "status",
          status
        );

        if (
          status === "rejected"
        ) {
          formData.append(
            "rejectionReason",
            rejectReason.trim()
          );
        }

        const res = await fetch(
          `${BASE_URL}/api/application/update/${currentApplication._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data.message ||
              "Failed to update"
          );
        }

        setCurrentApplication(
          (prev) => ({
            ...prev,
            ...data.data,
            status,
            rejectionReason:
              status ===
              "rejected"
                ? rejectReason
                : "",
          })
        );

        toast.success(
          `Application ${status} successfully`
        );

        setShowConfirmPopup(
          false
        );

        setShowRejectBox(false);

        setRejectReason("");

        setPendingStatus("");
      } catch (error) {
        console.error(error);

        toast.error(
          error.message
        );
      } finally {
        setActionLoading("");
      }
    };

  /* ======================================================
     POLICY UPLOAD
  ====================================================== */
const handlePolicyUpload = async () => {
  if (!selectedPolicy) {
    toast.error(
      "Please select policy document"
    );
    return;
  }

  const formData = new FormData();

  formData.append(
    "adminPolicyDocument",
    selectedPolicy
  );

  // rejected pachi upload thay to backend ne indication
  if (
    currentApplication.status ===
    "rejected"
  ) {
    formData.append(
      "uploadedAfterReject",
      true
    );
  }

  await updateApplication(
    formData,
    "Policy uploaded successfully",
    "upload"
  );
};

  // const handlePolicyUpload =
  //   async () => {
  //     if (!selectedPolicy) {
  //       toast.error(
  //         "Please select policy document"
  //       );

  //       return;
  //     }

  //     const formData =
  //       new FormData();

  //     formData.append(
  //       "adminPolicyDocument",
  //       selectedPolicy
  //     );

  //     await updateApplication(
  //       formData,
  //       "Policy uploaded successfully",
  //       "upload"
  //     );
  //   };

  /* ======================================================
     WHATSAPP SHARE
  ====================================================== */

  const handleShareWhatsApp =
    () => {
      const appNumber =
        currentApplication.applicationId ||
        getDateId(
          currentApplication.createdAt
        );

      const carNo =
        currentApplication.carNo ||
        "N/A";

      const dealerName =
        currentApplication.user
          ?.fullName || "N/A";

      const policyDocumentUrl =
        currentApplication.adminPolicyDocument
          ? getFullImageUrl(
              currentApplication.adminPolicyDocument
            )
          : "Not Uploaded";

      const message = `
📄 Insurance Policy Details

━━━━━━━━━━━━━━━━━━━━
📋 Application ID: ${appNumber}
🚗 Vehicle Number: ${carNo}
👤 Dealer Name: ${dealerName}
📎 Policy Document: ${policyDocumentUrl}
━━━━━━━━━━━━━━━━━━━━

✅ Policy Generated By:
Griva Insurance Solution

📅 Date:
${new Date().toLocaleDateString()}

🔗 View Policy:
${policyDocumentUrl}

Thank you for choosing Griva Insurance 🛡️
`;

      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );
    };

  /* ======================================================
     TOTAL DOCS
  ====================================================== */

const totalDocuments =
  (currentApplication
    .rcBookImages?.length ||
    0) +
  (currentApplication
    .aadharCardImages
    ?.length || 0) +
  (currentApplication
    .panCardImages?.length ||
    0) +
  (currentApplication
    .oldPolicyImages
    ?.length || 0) +
  (currentApplication
    .otherImages?.length ||
    0) +
  (currentApplication
    .adminPolicyDocument
    ? 1
    : 0);

  /* ======================================================
     RENDER
  ====================================================== */
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <button
          onClick={() => (onBack ? onBack() : navigate(-1))}
          className="mb-8 flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-800 p-8 text-white md:p-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              {/* Left */}
              <div className="flex items-center gap-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 shadow-xl backdrop-blur">
                  <Car size={42} />
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">
                    Vehicle Number
                  </p>

                  <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
                    {currentApplication.carNo ||
                      "N/A"}
                  </h1>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-wrap gap-4">
                <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-200">
                    Policy Type
                  </p>

                  <p className="mt-1 text-lg font-black capitalize">
                    {currentApplication.tp ===
                    "full"
                      ? "Comprehensive"
                      : currentApplication.tp ||
                        "N/A"}
                  </p>
                </div>

                <div
                  className={`rounded-2xl px-6 py-4 backdrop-blur ${
                    currentApplication.status ===
                    "approved"
                      ? "bg-green-500/20"
                      : currentApplication.status ===
                        "rejected"
                      ? "bg-red-500/20"
                      : "bg-yellow-500/20"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-white/70">
                    Status
                  </p>

                  <p className="mt-1 text-lg font-black capitalize">
                    {currentApplication.status ||
                      "pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-8 p-5 lg:grid-cols-[1.7fr_0.8fr] lg:p-8">
            {/* LEFT */}
            <div className="space-y-8">
              {/* Basic Info */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
                    <Info size={20} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Basic Information
                    </h2>

                    <p className="text-sm text-slate-500">
                      Application details
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <DetailBox
                    label="Application ID"
                    value={getDateId(
                      currentApplication.createdAt
                    )}
                    icon={<Hash size={15} />}
                  />

                  <DetailBox
                    label="Dealer Agency"
                    value={
                      currentApplication
                        .user?.fullName
                    }
                    icon={<User size={15} />}
                  />

                  <DetailBox
                    label="Created"
                    value={formatDate(
                      currentApplication.createdAt
                    )}
                    icon={
                      <Calendar size={15} />
                    }
                  />

                  <DetailBox
                    label="Updated"
                    value={formatDate(
                      currentApplication.updatedAt
                    )}
                    icon={<Clock size={15} />}
                  />

                  <DetailBox
                    label="Executive"
                    value={
                      currentApplication.teamLeader?.Name ||
                      currentApplication.executive?.Name ||
                      "Not Assigned"
                    }
                    icon={<User size={15} />}
                  />

                  <DetailBox
                    label="Details"
                    value={
                      currentApplication.otherDetails ||
                      "No details"
                    }
                    icon={
                      <FileText size={15} />
                    }
                  />
                </div>

                {/* Rejection */}
                {currentApplication.status ===
                  "rejected" &&
                  currentApplication.rejectionReason && (
                    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-red-100 p-3 text-red-600">
                          <XCircle size={22} />
                        </div>

                        <div>
                          <h4 className="text-lg font-black text-red-700">
                            Rejection Reason
                          </h4>

                          <p className="mt-2 text-sm leading-relaxed text-red-600">
                            {
                              currentApplication.rejectionReason
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              {/* Documents */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-indigo-100 p-3 text-indigo-700">
                      <ImageIcon size={20} />
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-slate-900">
                        Documents
                      </h2>

                      <p className="text-sm text-slate-500">
                        Click image to
                        preview
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* RC Book */}
                  {getOldDocuments("rcBookImages").length > 0 && (
                    <DocCategory
                      title="RC Book (Old)"
                      files={getOldDocuments("rcBookImages")}
                      showBadge
                      badge="Original"
                    />
                  )}
                  {getNewDocuments("rcBookImages").length > 0 && (
                    <DocCategory
                      title="RC Book (Re-uploaded)"
                      files={getNewDocuments("rcBookImages")}
                      showBadge
                      badge="Updated"
                    />
                  )}
                  {getOldDocuments("rcBookImages").length === 0 && 
                   getNewDocuments("rcBookImages").length === 0 && (
                    <DocCategory
                      title="RC Book"
                      files={[]}
                    />
                  )}

                  {/* Aadhar Card */}
                  {getOldDocuments("aadharCardImages").length > 0 && (
                    <DocCategory
                      title="Aadhar Card (Old)"
                      files={getOldDocuments("aadharCardImages")}
                      showBadge
                      badge="Original"
                    />
                  )}
                  {getNewDocuments("aadharCardImages").length > 0 && (
                    <DocCategory
                      title="Aadhar Card (Re-uploaded)"
                      files={getNewDocuments("aadharCardImages")}
                      showBadge
                      badge="Updated"
                    />
                  )}
                  {getOldDocuments("aadharCardImages").length === 0 && 
                   getNewDocuments("aadharCardImages").length === 0 && (
                    <DocCategory
                      title="Aadhar Card"
                      files={[]}
                    />
                  )}

                  {/* PAN Card */}
                  {getOldDocuments("panCardImages").length > 0 && (
                    <DocCategory
                      title="PAN Card (Old)"
                      files={getOldDocuments("panCardImages")}
                      showBadge
                      badge="Original"
                    />
                  )}
                  {getNewDocuments("panCardImages").length > 0 && (
                    <DocCategory
                      title="PAN Card (Re-uploaded)"
                      files={getNewDocuments("panCardImages")}
                      showBadge
                      badge="Updated"
                    />
                  )}
                  {getOldDocuments("panCardImages").length === 0 && 
                   getNewDocuments("panCardImages").length === 0 && (
                    <DocCategory
                      title="PAN Card"
                      files={[]}
                    />
                  )}

                  {/* Old Policy */}
                  {getOldDocuments("oldPolicyImages").length > 0 && (
                    <DocCategory
                      title="Old Policy (Old)"
                      files={getOldDocuments("oldPolicyImages")}
                      showBadge
                      badge="Original"
                    />
                  )}
                  {getNewDocuments("oldPolicyImages").length > 0 && (
                    <DocCategory
                      title="Old Policy (Re-uploaded)"
                      files={getNewDocuments("oldPolicyImages")}
                      showBadge
                      badge="Updated"
                    />
                  )}
                  {getOldDocuments("oldPolicyImages").length === 0 && 
                   getNewDocuments("oldPolicyImages").length === 0 && (
                    <DocCategory
                      title="Old Policy"
                      files={[]}
                    />
                  )}

                  {/* Other Documents */}
                  {getOldDocuments("otherImages").length > 0 && (
                    <DocCategory
                      title="Other Documents (Old)"
                      files={getOldDocuments("otherImages")}
                      showBadge
                      badge="Original"
                    />
                  )}
                  {getNewDocuments("otherImages").length > 0 && (
                    <DocCategory
                      title="Other Documents (Re-uploaded)"
                      files={getNewDocuments("otherImages")}
                      showBadge
                      badge="Updated"
                    />
                  )}
                  {getOldDocuments("otherImages").length === 0 && 
                   getNewDocuments("otherImages").length === 0 && (
                    <DocCategory
                      title="Other Documents"
                      files={[]}
                    />
                  )}

{/* Admin Policy Document */}
<DocCategory
  title="Admin Policy Document"
  files={
    Array.isArray(currentApplication.adminPolicyDocument)
      ? currentApplication.adminPolicyDocument
      : currentApplication.adminPolicyDocument
      ? [currentApplication.adminPolicyDocument]
      : []
  }
/>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-8">
              {/* Summary */}
              <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-200 p-3 text-blue-800">
                    <Shield size={20} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Documents Summary
                    </h3>

                    <p className="text-sm text-slate-500">
                      Uploaded documents
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <StatRow
                    label="RC Book"
                    count={
                      currentApplication
                        .rcBookImages
                        ?.length
                    }
                  />

                  <StatRow
                    label="Aadhar Card"
                    count={
                      currentApplication
                        .aadharCardImages
                        ?.length
                    }
                  />

                  <StatRow
                    label="PAN Card"
                    count={
                      currentApplication
                        .panCardImages
                        ?.length
                    }
                  />

                  <StatRow
                    label="Old Policy"
                    count={
                      currentApplication
                        .oldPolicyImages
                        ?.length
                    }
                  />

                  <StatRow
                    label="Other Docs"
                    count={
                      currentApplication
                        .otherImages
                        ?.length
                    }
                  />
                </div>

                <div className="mt-5 rounded-2xl bg-white/70 p-4">
                  <p className="text-sm font-bold text-slate-500">
                    Total Documents
                  </p>

                  <h2 className="mt-1 text-3xl font-black text-blue-900">
                    {totalDocuments}
                  </h2>
                </div>
              </div>

              {/* Status */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
                    Application Status
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-slate-900">
                    Approve or Reject
                  </h3>
                </div>

                {!currentApplication.adminPolicyDocument &&
                  currentApplication.status !==
                    "approved" &&
                  currentApplication.status !==
                    "rejected" && (
                    <div className="mb-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
                      <p className="text-sm font-semibold text-yellow-700">
                        Upload policy
                        document before
                        approving.
                      </p>
                    </div>
                  )}

                <div className="grid gap-4">
                  {/* Approve */}
                  <button
                    onClick={() => {
                      if (
                        !currentApplication.adminPolicyDocument
                      ) {
                        toast.error(
                          "Upload policy document first"
                        );
                        return;
                      }

                      setPendingStatus(
                        "approved"
                      );

                      setShowConfirmPopup(
                        true
                      );
                    }}
                    disabled={
                      actionLoading ===
                        "approved" ||
                      currentApplication.status ===
                        "approved" ||
                      currentApplication.status ===
                        "rejected" ||
                      !currentApplication.adminPolicyDocument
                    }
                    className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-green-600 text-lg font-black text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <CheckCircle2 size={22} />

                    {actionLoading ===
                    "approved"
                      ? "Approving..."
                      : currentApplication.status ===
                        "approved"
                      ? "Already Approved"
                      : "Approve"}
                  </button>

                  {/* Reject */}
                  <button
                    onClick={() =>
                      setShowRejectBox(
                        true
                      )
                    }
                    disabled={
                      actionLoading ===
                        "rejected" ||
                      currentApplication.status ===
                        "approved" ||
                      currentApplication.status ===
                        "rejected"
                    }
                    className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-red-600 text-lg font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <XCircle size={22} />

                    {actionLoading ===
                    "rejected"
                      ? "Rejecting..."
                      : currentApplication.status ===
                        "rejected"
                      ? "Already Rejected"
                      : "Reject"}
                  </button>
                </div>

                {/* Reject Box */}
                {showRejectBox && (
                  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                    <label className="text-sm font-black uppercase tracking-wide text-red-700">
                      Rejection Reason
                    </label>

                    <textarea
                      rows={4}
                      value={
                        rejectReason
                      }
                      onChange={(e) =>
                        setRejectReason(
                          e.target.value
                        )
                      }
                      placeholder="Enter rejection reason..."
                      className="mt-3 w-full rounded-2xl border border-red-200 bg-white p-4 outline-none focus:border-red-500"
                    />

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => {
                          if (
                            !rejectReason.trim()
                          ) {
                            toast.error(
                              "Please enter rejection reason"
                            );
                            return;
                          }

                          setPendingStatus(
                            "rejected"
                          );

                          setShowConfirmPopup(
                            true
                          );

                          setShowRejectBox(
                            false
                          );
                        }}
                        className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white transition hover:bg-red-700"
                      >
                        Submit Reject
                      </button>

                      <button
                        onClick={() => {
                          setShowRejectBox(
                            false
                          );

                          setRejectReason(
                            ""
                          );
                        }}
                        className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                    Policy Document
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-slate-900">
                    Upload Policy
                  </h3>
                </div>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50 p-7 text-center transition hover:border-blue-600 hover:bg-blue-100">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    disabled={
                      currentApplication.status ===
                      "approved"
                    }
                    onChange={(e) =>
                      setSelectedPolicy(
                        e.target
                          .files?.[0] ||
                          null
                      )
                    }
                  />

                  <div className="mb-4 rounded-2xl bg-white p-4 text-blue-700 shadow">
                    <UploadCloud
                      size={32}
                    />
                  </div>

                  <h4 className="text-lg font-black text-slate-900">
                    {selectedPolicy
                      ? "Selected File"
                      : currentApplication.adminPolicyDocument
                      ? "Replace Policy Document"
                      : "Choose Policy Document"}
                  </h4>

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    {selectedPolicy
                      ? selectedPolicy.name
                      : "PDF, JPG, JPEG, PNG"}
                  </p>
                </label>

                <button
                  onClick={
                    handlePolicyUpload
                  }
                  disabled={
                    !selectedPolicy ||
                    actionLoading ===
                      "upload" ||
                    currentApplication.status ===
                      "approved"
                  }
                  className="mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-900 text-lg font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <UploadCloud
                    size={22}
                  />

                  {actionLoading ===
                  "upload"
                    ? "Uploading..."
                    : currentApplication.adminPolicyDocument
                    ? "Replace Policy"
                    : "Upload Policy"}
                </button>

                {currentApplication.adminPolicyDocument && (
                  <a
                    href={getFullImageUrl(
                      currentApplication.adminPolicyDocument
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 text-sm font-black text-blue-700 hover:text-blue-900"
                  >
                    <Download
                      size={18}
                    />
                    View Uploaded Policy
                  </a>
                )}
              </div>

              {/* WhatsApp */}
              <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
                <button
                  onClick={
                    handleShareWhatsApp
                  }
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#25d366] text-lg font-black text-white transition hover:bg-[#1ebe5b]"
                >
                  <MessageCircle
                    size={22}
                  />

                  Share on WhatsApp
                </button>

                <p className="mt-3 text-center text-xs font-semibold text-slate-500">
                  Share application
                  details instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Popup */}
      {showConfirmPopup && (
        <ConfirmPopup
          pendingStatus={
            pendingStatus
          }
          rejectReason={
            rejectReason
          }
          loading={
            actionLoading ===
            pendingStatus
          }
          onCancel={() => {
            setShowConfirmPopup(
              false
            );

            setPendingStatus("");
          }}
          onConfirm={() =>
            handleStatusUpdate(
              pendingStatus
            )
          }
        />
      )}
    </div>
  );
};

export default ApplicationDetail;