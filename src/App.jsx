import "./App.css";
import BuildingForm from "./component/BuildingForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/member/Register";
import Login from "./component/Login.jsx";
import SocietyMemberForm from "./component/SocietyMemberForm";
import Home from "./component/Home";

import Maintaince from "./pages/maintenance/Maintenance.jsx";
import Complaint from "./pages/complaint/Complaint.jsx";
import Expenses from "./pages/expense/Expenses.jsx";
import MemberApproval from "./pages/admin/MemberApproval";
import MemberType from "./pages/member/MemberType.jsx";
import MaintenanceDetail from "./pages/admin/MaintenanceDetail";
import ExpenceForm from "./pages/expense/ExpenceForm.jsx";
import BillReport from "./pages/admin/BillReport";
import CalculateMaitenance from "./pages/maintenance/CalculateMaitenance.jsx";
import AdminOtp from "./pages/admin/admin auth/AdminOtp.jsx";
import SocietyMemberOtp from "./pages/member/SocietyMemberOtp";
import PublicRoute from "./Protect_Routes/PublicRoute";
import PrivateRoute from "./Protect_Routes/PrivateRoute";
import Notice from "./pages/notice/Notice.jsx";
import AddMaitenancePayment from "./pages/maintenance/AddMaitenancePayment.jsx";
import AddSocietyStaff from "./pages/staff/AddSocietyStaff.jsx";
import SocietyStaffInfo from "./pages/staff/SocietyStaffInfo";
import ComplaintList from "./pages/complaint/ComplaintList.jsx";
import Profile from "./pages/member/Profile.jsx";
import MemberMaitenancePaymet from "./pages/member/MemberMaitenancePaymet.jsx";
import ViewComplaint from "./pages/member/ViewComplaint.jsx";
import MemberNotice from "./pages/member/memberNotice.jsx";
import SocietyRules from "./pages/member/SocietyRules.jsx";
import AllAdminExpenses from "./pages/expense/AllAdminExpenses.jsx";
import AllMemberExpenses from "./pages/expense/AllMemberExpenses.jsx";
import ForgetPassword from "./component/ForgetPassword.jsx";
import VerifyForgetPasswordOtp from "./component/VerifyForgetPasswordOtp.jsx";
import ResetPassword from "./component/ResetPassword.jsx";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
    {
      path: "/home",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
      children: [
        //admin
        { path: "memberApproval", element: <MemberApproval /> },
        { path: "membersType", element: <MemberType /> },
        { path: "calculateMaitenance", element: <CalculateMaitenance /> },
        { path: "addMaintenance", element: <AddMaitenancePayment /> },
        { path: "maintenanceDetail", element: <MaintenanceDetail /> },
        { path: "expenseForm", element: <ExpenceForm /> },
        { path: "admin-expenses", element: <AllAdminExpenses /> },
        { path: "billReport", element: <BillReport /> },
        { path: "notice", element: <Notice /> },
        { path: "complaintList", element: <ComplaintList /> },
        { path: "addStaff", element: <AddSocietyStaff /> },
        { path: "staffDetail", element: <SocietyStaffInfo /> },
        //member
        { path: "member-maitenance", element: <MemberMaitenancePaymet /> },
        { path: "member-expenses", element: <AllMemberExpenses /> },
        { path: "complaint", element: <Complaint /> },
        { path: "view-complaint", element: <ViewComplaint /> },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "member-notice",
          element: <MemberNotice />,
        },
        {
          path: "rules",
          element: <SocietyRules />,
        },
      ],
    },
    {
      path: "/adminOtp",
      element: (
        <PublicRoute>
          <AdminOtp />
        </PublicRoute>
      ),
    },

    {
      path: "/memberOtp",
      element: (
        <PublicRoute>
          <SocietyMemberOtp />
        </PublicRoute>
      ),
    },
    {
      path: "/buildingForm",
      element: (
        <PublicRoute>
          <BuildingForm />
        </PublicRoute>
      ),
    },
    {
      path: "/societyMemberForm",
      element: (
        <PublicRoute>
          <SocietyMemberForm />
        </PublicRoute>
      ),
    },
    {
      path: "/forget-password",
      element: (
        <PublicRoute>
          <ForgetPassword />
        </PublicRoute>
      ),
    },
    {
      path: "/verifyOtp",
      element: (
        <PublicRoute>
          <VerifyForgetPasswordOtp />
        </PublicRoute>
      ),
    },
    {
      path: "/resetpassword",
      element: (
        <PublicRoute>
          <ResetPassword />
        </PublicRoute>
      ),
    },
  ]);
  return (
    <div>
      {/* <BuildingForm />
      <Xyz /> */}
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
