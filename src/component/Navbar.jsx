import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAdminLogout } from "../Redux/slices/adminAuthSlice";
import { setMemberLogout } from "../Redux/slices/memberAuthSlice";

const Navbar = ({ setSidebarOpen }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, isAdminLoggedIn } = useSelector((state) => state.adminAuth);
  const { member, isMemberLoggedIn } = useSelector((state) => state.memberAuth);

  const handleLogout = async () => {
    try {
      if (isAdminLoggedIn) {
        const res = await axios.post(
          "http://localhost:5000/adminLogout",
          {},
          { withCredentials: true }
        );
        if (res.status === 200) {
          dispatch(setAdminLogout());
          localStorage.removeItem("token");
          localStorage.clear();
          navigate("/");
          window.location.reload();
        }
      }

      if (isMemberLoggedIn) {
        const res = await axios.post(
          "http://localhost:5000/memberLogout",
          {},
          { withCredentials: true }
        );
        if (res.status === 200) {
          dispatch(setMemberLogout());
          localStorage.removeItem("token");
          localStorage.clear();
          navigate("/");
          window.location.reload();
        }
      }
    } catch (error) {
      alert("Logout failed");
    }
  };

  const activeUser = admin || member;

  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
      {/* ☰ Mobile menu */}
      <h1 className="hidden md:block text-xl sm:text-2xl font-bold">
        🏢 SmartSociety
      </h1>
      <button
        className="md:hidden"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <HiOutlineMenuAlt3 size={28} />
      </button>
      <h1 className="text-xl sm:text-2xl font-bold">🏡 Acacia Building</h1>
      <p>...</p>
    </nav>
  );
};

export default Navbar;
