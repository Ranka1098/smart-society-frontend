import { Outlet, useLocation, useNavigate } from "react-router-dom";

import LeftSideDashboard from "./LeftSideDashboard";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAdminLogin } from "../Redux/slices/adminAuthSlice";
import { setMemberLogin } from "../Redux/slices/memberAuthSlice";
import RightSideDashboard from "./RightSideDashboard";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false); // ⭐ ADD

  const isAdminLoggedIn = useSelector(
    (state) => state.adminAuth.isAdminLoggedIn
  );
  const isMemberLoggedIn = useSelector(
    (state) => state.memberAuth.isMemberLoggedIn
  );
  const navigate = useNavigate();

  const isChildRoute = location.pathname !== "/home";

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/getAdminDetails", {
          withCredentials: true,
        });
        if (res.status === 200) dispatch(setAdminLogin(res.data.admin));
      } catch {}
    };

    const fetchMember = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getMemberDetail", {
          withCredentials: true,
        });
        if (res.status === 200) dispatch(setMemberLogin(res.data.member));
      } catch {}
    };

    if (!isAdminLoggedIn) fetchAdmin();
    if (!isMemberLoggedIn) fetchMember();
  }, [dispatch, isAdminLoggedIn, isMemberLoggedIn]);

  useEffect(() => {
    if (isMemberLoggedIn && !isAdminLoggedIn && location.pathname === "/home") {
      navigate("/home/profile", { replace: true });
    }
  }, [isMemberLoggedIn, isAdminLoggedIn, location.pathname]);

  return (
    <div className="h-screen flex flex-col ">
      {/* Navbar */}
      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <LeftSideDashboard
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 relative overflow-y-auto">
          <Outlet />

          {!isChildRoute && isAdminLoggedIn && (
            <div className="absolute inset-0 overflow-auto p-4">
              <RightSideDashboard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
