import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import RegisterBeneficiary from "./pages/receptionist/RegisterBeneficiary.jsx";
import DepartmentPanel from "./pages/staff/DepartmentPanel.jsx";

const App = () => {
  // const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* {user && user.role === "admin" && (
        <Route path="/admin" element={<AdminDashboard />} />
      )}

      {user && user.role === "receptionist" && (
        <Route path="/reception" element={<RegisterBeneficiary />} />
      )}

      {user && user.role === "staff" && (
        <Route path="/staff" element={<DepartmentPanel />} />
      )}

      <Route path="*" element={<Navigate to="/" />} /> */}

    </Routes>
  );
};

export default App;
