import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        {/* <div className="container">
        <p>© 2025 Kimia Farma Apotek. All rights reserved.</p>
        </div> */}
      </footer>
    </div>
  );
}

export default MainLayout;
