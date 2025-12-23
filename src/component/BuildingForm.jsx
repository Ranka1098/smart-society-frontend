import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ import axios

const BuildingForm = () => {
  const [building, setBuilding] = useState({
    admin: "",
    phone: "",
    bname: "",
    address: "",
    pincode: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const handleChanange = (e) => {
    const { name, value } = e.target;

    // update field
    setBuilding((prev) => ({ ...prev, [name]: value }));

    // remove error message when user starts typing
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  // validation
  const validate = () => {
    let newError = {};
    if (!building.admin.trim()) newError.admin = "Admin name is required";
    if (!building.phone.trim()) newError.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(building.phone))
      newError.phone = "Phone must be 10 digits";
    if (!building.password.trim())
      newError.password = "Password is required (min 6 chars)";
    else if (building.password.length < 6)
      newError.password = "Password must be at least 6 characters";
    if (!building.bname.trim()) newError.bname = "Building name is required";
    if (!building.address.trim()) newError.address = "Address is required";
    if (!building.pincode.trim()) newError.pincode = "Pincode is required";
    else if (!/^[0-9]{6}$/.test(building.pincode))
      newError.pincode = "Pincode must be 6 digits";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const res = await axios.post("http://localhost:5000/adminregister", {
          adminName: building.admin,
          phone: building.phone,
          bname: building.bname,
          address: building.address,
          pincode: building.pincode,
          password: building.password,
        });

        if (res.status === 201) {
          console.log("OTP sent to phone");
          console.log("Building Data:", res.data);
          alert("Otp send Your Register Phone Number 🚀");
          navigate("/adminOtp", { state: { phone: building.phone } });
          // ✅ phone number ko OTP page me bhejna zaroori hai
        }
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        alert("phone number all ready used registred with different number");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r  from-blue-100 to-blue-200 px-4 sm:px-6">
      <div className="w-full m-2 max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-2xl rounded-2xl p-5 sm:p-7 md:p-8">
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-blue-600 hover:underline"
        >
          Back
        </button>
        <h2 className="font-bold text-xl sm:text-2xl text-center text-gray-800">
          🏢 Create Building
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm text-center mb-3">
          Fill the building details. After submit you'll get a unique building
          code.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-3">
          {/* Admin */}
          <div className="flex flex-col">
            <label className="font-semibold">Admin Name</label>
            <input
              type="text"
              placeholder="Enter Admin Name..."
              className={`border px-3 py-2 sm:py-2.5 rounded focus:outline-none focus:ring-2 text-sm sm:text-base ${
                error.admin
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-300"
              }`}
              name="admin"
              value={building.admin}
              onChange={handleChanange}
            />
            {error.admin && (
              <span className="text-red-500 text-sm">{error.admin}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="font-semibold">Phone Number</label>
            <input
              type="text"
              placeholder="Enter Phone..."
              className={`border p-2 rounded focus:outline-none focus:ring-2 ${
                error.phone
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-300"
              }`}
              name="phone"
              value={building.phone}
              onChange={handleChanange}
            />
            {error.phone && (
              <span className="text-red-500 text-sm">{error.phone}</span>
            )}
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label className="font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password..."
              name="password"
              value={building.password}
              onChange={handleChanange}
              className={`border p-2 rounded focus:outline-none focus:ring-2 ${
                error.password
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-300"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 sm:top-10 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
            {error.password && (
              <span className="text-red-500 text-sm">{error.password}</span>
            )}
          </div>

          {/* Building Name */}
          <div className="flex flex-col">
            <label className="font-semibold">Building Name</label>
            <input
              type="text"
              placeholder="Enter Building Name..."
              className={`border p-2 rounded focus:outline-none focus:ring-2 ${
                error.bname
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-300"
              }`}
              name="bname"
              value={building.bname}
              onChange={handleChanange}
            />
            {error.bname && (
              <span className="text-red-500 text-sm">{error.bname}</span>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="font-semibold">Building Address</label>
            <input
              type="text"
              placeholder="Enter Address..."
              className={`border p-2 rounded focus:outline-none focus:ring-2 ${
                error.address
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-300"
              }`}
              name="address"
              value={building.address}
              onChange={handleChanange}
            />
            {error.address && (
              <span className="text-red-500 text-sm">{error.address}</span>
            )}
          </div>

          {/* Pincode */}
          <div className="flex flex-col">
            <label className="font-semibold">Pincode</label>
            <input
              type="number"
              placeholder="Enter Pincode..."
              className={`border p-2 rounded focus:outline-none focus:ring-2 ${
                error.pincode
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-300"
              }`}
              name="pincode"
              value={building.pincode}
              onChange={handleChanange}
            />
            {error.pincode && (
              <span className="text-red-500 text-sm">{error.pincode}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-blue-600 transition shadow"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuildingForm;
