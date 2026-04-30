import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // only service page par footer show karavo
  const showFooter = location.pathname === "/service";

  return (
    <div>
      <Header />

      {/* Important spacing for fixed navbar */}
      <main className="">
        <Outlet />
      </main>

      {/* Footer only for service page */}
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;