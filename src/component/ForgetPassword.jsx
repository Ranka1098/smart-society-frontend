import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    buildingCode: "",
    role: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role || !formData.phone) {
      alert("Please select role and enter mobile number");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/forget-password", {
        role: formData.role,
        phone: formData.phone,
        buildingCode: formData.buildingCode,
      });

      if (res.status === 200) {
        alert("OTP sent successfully");

        navigate("/verifyOtp", {
          state: {
            role: formData.role,
            phone: formData.phone,
          },
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          🔐 Forget Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Verify role & mobile number
        </p>

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
              <option value="admin">👮 Society Admin</option>
              <option value="member">🏠 Society Member</option>
            </select>
          </div>

          {/* building code */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Building Code
            </label>
            <input
              name="buildingCode"
              placeholder="Enter registered mobile number"
              value={formData.buildingCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter registered mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        </form>

        <p
          onClick={() => navigate("/")}
          className="text-center text-sm text-blue-500 hover:underline cursor-pointer mt-5"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
