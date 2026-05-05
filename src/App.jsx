import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import ScrollToTop from "../ScrollToTop";

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
import DealerDashboard from "./pages/DealerDashboard";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

// Admin Pages
import DealerApprove from "./admin/dealerApprove";
import ApplicationApprove from "./admin/applicationDetail";

const App = () => {
  return (
    <Router>
      <ScrollToTop />

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

          <Route path="application-detail" element={<ApplicationApprove />} />
          <Route path="dealer-approval" element={<DealerApprove />} />
        </Route>

        {/* DEALER */}
        <Route path="/dealer-dashboard" element={<DealerDashboard />} />

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