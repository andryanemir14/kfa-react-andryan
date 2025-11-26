import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="d-flex">
      {/* Sidebar - Conditional Rendering */}
      {sidebarOpen && <Sidebar />}

      {/* Main Content Area */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{ minHeight: "100vh" }}
      >
        {/* Navbar */}
        <AdminNavbar
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Page Content - Outlet untuk nested routes */}
        <main className="p-4 flex-grow-1 bg-light">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="px-4 py-3 bg-white border-top">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">
              &copy; 2025 Admin Panel. All rights reserved.
            </span>
            <div>
              <a href="#" className="text-muted me-3">
                Privacy Policy
              </a>
              <a href="#" className="text-muted">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
