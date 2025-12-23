import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminLogin } from "../Redux/slices/adminAuthSlice"; // FIXED
import { setMemberLogin } from "../Redux/slices/memberAuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    role: "",
    buildingCode: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select role");
      return;
    }

    try {
      if (formData.role === "admin") {
        const res = await axios.post(
          "http://localhost:5000/adminLogin",
          formData,
          { withCredentials: true }
        );

        if (res.status === 200 || res.status === 201) {
          alert("Admin login successful");

          // FIXED DISPATCH
          dispatch(setAdminLogin(res.data.admin));

          // store token in localStorage
          localStorage.setItem("token", res.data.data);

          // navigate to home
          navigate("/home");
        }
      } else if (formData.role === "member") {
        const res = await axios.post(
          "http://localhost:5000/memberLogin",
          {
            role: formData.role,
            buildingCode: formData.buildingCode,
            primaryPhone: formData.phone,
            password: formData.password,
          },
          { withCredentials: true }
        );
        if (res.status === 200 || res.status === 201) {
          alert("society member login successful");
          dispatch(setMemberLogin(res.data.member));

          console.log("member login", res.data);
          localStorage.setItem("token", res.data.token); // token

          // navigate to home
          navigate("/home");
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          🏢 Smart Society
        </h2>
        <p className="text-center text-gray-600 mb-6">Secure Login</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="admin">Society Admin</option>
              <option value="member">Society Member</option>
            </select>
          </div>

          {/* Building Code */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Building Code
            </label>
            <input
              type="text"
              name="buildingCode"
              placeholder="Enter Building Code"
              value={formData.buildingCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label className="block font-semibold text-gray-700 mb-1">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password..."
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
        <p
          onClick={() => navigate("/forget-password")}
          className="text-center text-sm text-blue-500 hover:underline cursor-pointer hover:text-blue-700"
        >
          Forget Password
        </p>
      </div>
    </div>
  );
};

export default Login;
