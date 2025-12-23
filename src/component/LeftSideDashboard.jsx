import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAdminLogout } from "../Redux/slices/adminAuthSlice";
import { setMemberLogout } from "../Redux/slices/memberAuthSlice";
import { useNavigate } from "react-router-dom";

const LeftSideDashboard = ({ sidebarOpen, setSidebarOpen }) => {
  const { isAdminLoggedIn } = useSelector((state) => state.adminAuth);
  const { isMemberLoggedIn } = useSelector((state) => state.memberAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = isAdminLoggedIn ? "admin" : isMemberLoggedIn ? "member" : null;

  const adminMenus = [
    { name: "Member Approval", path: "memberApproval" },
    { name: "All Members List", path: "membersType" },
    { name: "Expense Form", path: "expenseForm" },
    { name: "All Expense Detail", path: "admin-expenses" },
    { name: "Calculate Maintenance", path: "calculateMaitenance" },
    { name: "Maintenance payment  Detail", path: "maintenanceDetail" },
    { name: "Add-Maintenance Payment", path: "addMaintenance" },
    { name: "Notice", path: "notice" },
    { name: "Add-staff", path: "addStaff" },
    { name: "Staff Detail", path: "staffDetail" },
    { name: "Complaints", path: "complaintList" },
  ];

  const memberMenus = [
    { name: "All Expense Detail", path: "member-expenses" },
    { name: "Payment History", path: "member-maitenance" },
    { name: "Create Complaint", path: "complaint" },
    { name: "All Complaints", path: "view-complaint" },
    { name: "Notice", path: "member-notice" },
    { name: "Society Rules", path: "rules" },
  ];

  const menus =
    role === "admin" ? adminMenus : role === "member" ? memberMenus : [];

  const handleLogout = async () => {
    try {
      if (role === "admin") {
        const res = await axios.post(
          "http://localhost:5000/adminLogout",
          {},
          { withCredentials: true }
        );

        if (res.status === 200) {
          dispatch(setAdminLogout());
        }
      }

      if (role === "member") {
        const res = await axios.post(
          "http://localhost:5000/memberLogout",
          {},
          { withCredentials: true }
        );

        if (res.status === 200) {
          dispatch(setMemberLogout());
        }
      }

      // common cleanup
      localStorage.clear();
      setSidebarOpen(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("Logout failed");
    }
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static z-50
         h-screen top-0 w-64 flex flex-col
          bg-gray-900 text-white
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Title */}
        <Link to="/home" onClick={() => setSidebarOpen(false)}>
          <p className="text-xl font-bold text-center py-4 border-b border-gray-700">
            {role === "admin"
              ? "Admin Dashboard"
              : role === "member"
              ? "Member Dashboard"
              : "Dashboard"}
          </p>
        </Link>

        {/* Menus */}
        <ul className="mt-4 space-y-2 px-2 flex-1 overflow-y-auto">
          {menus.map((menu) => (
            <li key={menu.name}>
              <Link
                to={menu.path}
                onClick={() => setSidebarOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                {menu.name}
              </Link>
            </li>
          ))}

          {/* 🔴 Logout as Menu */}
          {role && (
            <li className="pt-2 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition
          ${
            role === "admin"
              ? "text-red-400 hover:bg-red-600 hover:text-white"
              : "text-orange-400 hover:bg-orange-500 hover:text-white"
          }
        `}
              >
                {role === "admin" ? "Admin Logout" : "Member Logout"}
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default LeftSideDashboard;
