import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="flex-shrink-0 p-3 text-white d-flex flex-column bg-dark"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      {/* Brand */}
      <NavLink
        to="/admin"
        className="mb-3 text-white d-flex align-items-center mb-md-0 me-md-auto text-decoration-none"
      >
        <i className="bi bi-box-seam fs-4 me-2"></i>
        <span className="fs-4">Panel</span>
      </NavLink>

      <hr />

      {/* Navigation Menu */}
      <ul className="mb-auto nav nav-pills flex-column">
        <li className="nav-item">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-people me-2"></i>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-box me-2"></i>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-cart me-2"></i>
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-gear me-2"></i>
            Settings
          </NavLink>
        </li>
      </ul>

      <hr />
    </div>
  );
};

export default Sidebar;
