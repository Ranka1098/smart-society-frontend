import BuildingForm from "./component/BuildingForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/member/Register";
import Login from "./component/Login.jsx";
import SocietyMemberForm from "./component/SocietyMemberForm";
import Home from "./component/Home";
import Flat from "./pages/member/Flat";
import FlatDetail from "./component/FlatDetail";
import Shop from "./pages/member/Shop";
import Maintaince from "./pages/member/Maintenance";
import Complaint from "./pages/member/Complaint";
import ShopDetails from "./component/ShopDetails";
import Expenses from "./pages/member/Expenses";
import MemberApproval from "./pages/admin/MemberApproval";
import MemberType from "./pages/admin/MemberType";
import MaintenanceDetail from "./pages/admin/MaintenanceDetail";
import ExpenceForm from "./pages/admin/ExpenceForm";
import BillReport from "./pages/admin/BillReport";
import ExpenceDetail from "./pages/admin/ExpenceDetail";
import CalculateMaitenance from "./pages/admin/CalculateMaitenance";
import AdminOtp from "./pages/admin/AdminOtp";
import SocietyMemberOtp from "./pages/member/SocietyMemberOtp";
import PublicRoute from "./Protect_Routes/PublicRoute";
import PrivateRoute from "./Protect_Routes/PrivateRoute";
import Notice from "./pages/admin/Notice.jsx";
import AddMaitenancePayment from "./pages/admin/AddMaitenancePayment.jsx";
import AddSocietyStaff from "./component/AddSocietyStaff.jsx";
import SocietyStaffInfo from "./component/SocietyStaffInfo.jsx";
import ComplaintList from "./component/ComplaintList.jsx";
import Profile from "./pages/member/Profile.jsx";
import MemberMaitenancePaymet from "./pages/member/MemberMaitenancePaymet.jsx";
import ViewComplaint from "./pages/member/ViewComplaint.jsx";
import MemberNotice from "./pages/member/memberNotice.jsx";
import SocietyRules from "./pages/member/SocietyRules.jsx";

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
        { path: "expenseDetail", element: <ExpenceDetail /> },
        { path: "billReport", element: <BillReport /> },
        { path: "notice", element: <Notice /> },
        {
          path: "complaintList",
          element: <ComplaintList />,
        },
        {
          path: "addStaff",
          element: <AddSocietyStaff />,
        },
        {
          path: "staffDetail",
          element: <SocietyStaffInfo />,
        },
        //member
        { path: "member-maitenance", element: <MemberMaitenancePaymet /> },
        { path: "expenses", element: <Expenses /> },
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
