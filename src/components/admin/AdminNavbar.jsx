import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ onToggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm navbar navbar-expand-lg navbar-light border-bottom">
      <div className="container-fluid">
        {/* Toggle Button untuk Sidebar */}
        <button
          className="btn btn-outline-secondary me-3"
          type="button"
          onClick={onToggleSidebar}
          title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        >
          {sidebarOpen ? (
            <i className="bi bi-list fs-5"></i>
          ) : (
            <i className="bi bi-chevron-right fs-5"></i>
          )}
        </button>

        {/* Right Side Items */}
        <ul className="navbar-nav">
          {/* User Dropdown */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="User"
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <span>{user?.name || user?.email || "Admin"}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-person-circle me-2"></i>
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
