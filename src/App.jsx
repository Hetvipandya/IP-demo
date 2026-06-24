import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import ScrollToTop from "../ScrollToTop";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Quote from "./pages/Quote";

// Insurance Pages
import PropertyIns from "./pages/PropertyIns";
import TravelIns from "./pages/TravelIns"; 
import LiabilityIns from "./pages/LiabilityIns";
import MotorIns from "./pages/MotorIns";
import HealthIns from "./pages/HealthIns";


// Components
import About from "./components/About";
import Blog from "./components/blog";

// Auth
import Register from "./pages/Register";
import Login from "./pages/Login";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./admin/adminHome";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Admin Pages
import DealerApprove from "./admin/dealerApprove";
import ApplicationApprove from "./admin/applicationDetail";
import PendingApplications from "./admin/PendingApplications";
import DealerManagement from "./admin/DealerManagement";
import ExecutiveManagement from "./admin/ExecutiveManagement";
import TLManagement from "./admin/TL-management";
import TeamManagement from "./admin/teamManagement";

// Executive Pages
import ExecutiveProtectedRoute from "./components/ExecutiveProtectedRoute";
import ExecutiveHome from "./executive/executiveHome";
import ExecutivePendingApplications from "./executive/PendingApplications";
import ExecutiveApplicationDetail from "./executive/applicationDetail";

import TLDashboard from "./pages/TL Dashboard";
import TLHome from "./tl/dashboard";
import MyPolicy from "./tl/myPolicy";
import ApprovalRequest from "./tl/approvalRequest";
import MyProfile from "./tl/profile";
import TLAppDetail from "./tl/TLAppDetail";


// Firebase Messaging
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

const App = () => {
  // Request notification permission and get FCM token on app load
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: "YOUR_VAPID_KEY"
          });
          console.log("FCM TOKEN:", token);
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestPermission();
  }, []);
  return (
    <Router>
      <ScrollToTop />
  <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#111827",
            borderRadius: "12px",
            padding: "14px 16px",
            fontWeight: "600",
            boxShadow:
              "0 4px 14px rgba(0,0,0,0.12)",
          },

          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#fff",
            },
          },

          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fff",
            },
          },
        }}
      /> 
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        >

          {/* default admin page */}
          <Route index element={<AdminHome />} />

          <Route path="pending-applications" element={<PendingApplications />} />
          <Route path="dealer-management" element={<DealerManagement />} />
          <Route path="application-detail/:id" element={<ApplicationApprove />} />
          <Route path="dealer-approval" element={<DealerApprove />} />
          <Route path="executive-management" element={<ExecutiveManagement />} />
          <Route path="TL-management" element={<TLManagement />} />
          <Route path="Team-management" element={<TeamManagement />} />
        </Route>

{/* TL */}
{/* TL */}
<Route
  path="/tl"
  element={<TLDashboard />}
>
  {/* Default TL Page */}
  <Route
    index
    element={<TLHome />}
  />

  <Route
    path="my-policy"
    element={<MyPolicy />}
  />

  <Route
    path="approval-request"
    element={
      <ApprovalRequest />
    }
  />

  <Route
    path="profile"
    element={<MyProfile />}
  />
  <Route path="application-detail/:id" element={<TLAppDetail />} />
</Route>

        {/* EXECUTIVE */}
      <Route
  path="/executive"
  element={
    <ExecutiveProtectedRoute>
      <ExecutiveDashboard />
    </ExecutiveProtectedRoute>
  }
>
  {/* default executive page */}
  <Route index element={<ExecutiveHome />} />

  <Route
    path="pending-applications"
    element={<ExecutivePendingApplications />}
  />

  <Route
    path="application-detail/:id"
    element={<ExecutiveApplicationDetail />}
  />
</Route>

        {/* DEALER */}

        {/* MAIN SITE */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />

          {/* INSURANCE */}
          <Route path="/property-insurance" element={<PropertyIns />} />
          <Route path="/travel-insurance" element={<TravelIns />} />
          <Route path="/liability-insurance" element={<LiabilityIns />} />
          <Route path="/motor-insurance" element={<MotorIns />} />
          <Route path="/health-insurance" element={<HealthIns />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
