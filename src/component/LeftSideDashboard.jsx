import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSideDashboard = ({ sidebarOpen, setSidebarOpen }) => {
  const { isAdminLoggedIn } = useSelector((state) => state.adminAuth);
  const { isMemberLoggedIn } = useSelector((state) => state.memberAuth);

  const role = isAdminLoggedIn ? "admin" : isMemberLoggedIn ? "member" : null;

  const adminMenus = [
    { name: "Member Approval", path: "memberApproval" },
    { name: "All Members List", path: "membersType" },
    { name: "Expense Form", path: "expenseForm" },
    { name: "All Expense Detail", path: "expenseDetail" },
    { name: "Calculate Maintenance", path: "calculateMaitenance" },
    { name: "Maintenance Detail", path: "maintenanceDetail" },
    { name: "Add-Maintenance Payment", path: "addMaintenance" },
    { name: "Notice", path: "notice" },
    { name: "Add-staff", path: "addStaff" },
    { name: "Staff Detail", path: "staffDetail" },
    { name: "Complaints", path: "complaintList" },
  ];

  const memberMenus = [
    { name: "All Expense Detail", path: "expenseDetail" },
    { name: "Payment History", path: "member-maitenance" },
    { name: "Create Complaint", path: "complaint" },
    { name: "All Complaints", path: "view-complaint" },
    { name: "Notice", path: "member-notice" },
    { name: "Society Rules", path: "rules" },
  ];

  const menus =
    role === "admin" ? adminMenus : role === "member" ? memberMenus : [];

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
          h-screen w-64
          bg-gray-900 text-white
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Title */}
        <Link to="/home">
          <p className="text-xl font-bold text-center py-4 border-b border-gray-700">
            {role === "admin"
              ? "Admin Dashboard"
              : role === "member"
              ? "Member Dashboard"
              : "Dashboard"}
          </p>
        </Link>

        {/* Menus */}
        <ul className="mt-4 space-y-2 px-2">
          {menus.map((menu) => (
            <li key={menu.name}>
              <Link
                to={menu.path}
                onClick={() => setSidebarOpen(false)} // 📱 auto close
                className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LeftSideDashboard;
