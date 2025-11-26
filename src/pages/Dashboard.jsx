import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to Logut:", error);
    }
  };

  return (
    <div>
      <h1>Hallo Dashboard</h1>
      <p>Welcome, {user ? user.fullName : "User"}!</p>
    </div>
  );
}

export default Dashboard;
