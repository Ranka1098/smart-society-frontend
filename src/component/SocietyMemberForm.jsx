import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SocietyMemberForm = () => {
  const initialState = {
    memberType: "",
    buildingCode: "",
    password: "",
    memberInFamily: 0,
    men: 0,
    women: 0,
    kids: 0,

    flatStatus: "",
    flatNo: "",
    flatOwnerName: "",
    flatOwnerPhoneNumber: "",
    flatRenterName: "",
    flatRenterJoining: "",

    shopStatus: "",
    shopNo: "",
    shopOwnerName: "",
    shopOwnerPhoneNumber: "",
    shopRenterName: "",
    shopRenterJoining: "",
  };

  const [member, setMember] = useState(initialState);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = {};
      let url = "";

      // ---------------- ⚡ FLAT OWNER ----------------
      if (member.memberType === "Flat" && member.flatStatus === "Owner") {
        url = "http://localhost:5000/flatOwnerRegister";

        payload = {
          memberType: "Flat",
          status: "Owner",
          buildingCode: member.buildingCode,
          flatNo: member.flatNo,
          flatOwnerName: member.flatOwnerName,
          primaryPhone: member.flatOwnerPhoneNumber,
          password: member.password,
          memberInFamily: member.memberInFamily,
          men: member.men,
          women: member.women,
          kids: member.kids,
        };
      }

      // ---------------- ⚡ FLAT RENT ----------------
      else if (member.memberType === "Flat" && member.flatStatus === "Rent") {
        url = "http://localhost:5000/flatRenterRegister";

        payload = {
          memberType: "Flat",
          status: "Rent",
          buildingCode: member.buildingCode,
          flatNo: member.flatNo,
          flatOwnerName: member.flatOwnerName,
          flatOwnerPhoneNumber: member.flatOwnerPhoneNumber,
          flatRenterName: member.flatRenterName,
          primaryPhone: member.primaryPhone,
          dateOfJoiningFlat: member.flatRenterJoining,
          password: member.password,
          memberInFamily: member.memberInFamily,
          men: member.men,
          women: member.women,
          kids: member.kids,
        };
      }

      // ---------------- ⚡ SHOP OWNER ----------------
      else if (member.memberType == "Shop" && member.shopStatus == "Owner") {
        url = "http://localhost:5000/shopOwner";

        payload = {
          memberType: "Shop",
          status: "Owner",
          buildingCode: member.buildingCode,
          shopNo: member.shopNo,
          shopOwnerName: member.shopOwnerName,
          primaryPhone: member.shopOwnerPhone,
          password: member.password,
        };
      }

      // ---------------- ⚡ SHOP RENT ----------------
      else if (member.memberType === "Shop" && member.shopStatus === "Rent") {
        url = "http://localhost:5000/shopRenter";

        payload = {
          memberType: "Shop",
          status: "Rent",
          buildingCode: member.buildingCode,
          shopNo: member.shopNo,
          shopOwnerName: member.shopOwnerName,
          shopOwnerPhoneNumber: member.shopOwnerPhoneNumber,
          shopRenterName: member.shopRenterName,
          primaryPhone: member.primaryPhone,
          dateOfJoiningShop: member.shopRenterJoining,
          password: member.password,
        };
      }

      // ---------------- SEND API ----------------
      const res = await axios.post(url, payload);

      if (res.status === 200) {
        alert("OTP sent to phone number");

        navigate("/memberOtp", {
          state: { primaryPhone: payload.primaryPhone },
        });
        sessionStorage.setItem("otpPhone", payload.primaryPhone);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-4 items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6 space-y-4"
      >
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-blue-600 hover:underline"
        >
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-700 text-center">
          🏘 Society Member
        </h1>
        {/* ----------------------------------- Member Type -----------------------------------*/}
        <div>
          <label className="font-semibold">Member Type</label>
          <select
            name="memberType"
            required
            value={member.memberType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="Flat">Flat</option>
            <option value="Shop">Shop</option>
          </select>
        </div>
        {/*----------------------------------- Member Type -----------------------------------*/}

        {/*----------------------------------- FLAT MEMBER FORM start ----------------------------------- */}
        {member.memberType === "Flat" && (
          <>
            {/* Flat Status */}
            <div>
              <label className="font-semibold">Flat Status</label>
              <select
                name="flatStatus"
                required
                value={member.flatStatus}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Flat Status</option>
                <option value="Owner">Owner</option>
                <option value="Rent">Rent</option>
              </select>
            </div>

            {/*----------------------------------- flat Owner start----------------------------------- */}
            {member.flatStatus === "Owner" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold">Building Code</label>
                  <input
                    type="text"
                    name="buildingCode"
                    required
                    placeholder="Building Code"
                    value={member.buildingCode}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold">Flat No</label>
                  <input
                    type="text"
                    name="flatNo"
                    required
                    placeholder="Flat Number"
                    value={member.flatNo}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold">Owner Full Name</label>
                  <input
                    type="text"
                    name="flatOwnerName"
                    required
                    placeholder="Owner Full Name"
                    value={member.flatOwnerName}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold">
                    Owner Phone(Primary - OTP will be sent)
                  </label>
                  <input
                    type="text"
                    name="flatOwnerPhoneNumber"
                    required
                    placeholder="Owner Phone"
                    value={member.flatOwnerPhoneNumber}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="relative">
                  <label className="font-semibold">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password..."
                    name="password"
                    required
                    value={member.password}
                    onChange={handleChange}
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </button>
                </div>
                <div>
                  <label className="font-semibold">
                    Total Members in Family
                  </label>
                  <input
                    type="number"
                    name="memberInFamily"
                    required
                    placeholder="Total Members"
                    value={member.memberInFamily}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold">Men</label>
                  <input
                    type="number"
                    name="men"
                    required
                    placeholder="No. of Men"
                    value={member.men}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold">Women</label>
                  <input
                    type="number"
                    name="women"
                    required
                    placeholder="No. of Women"
                    value={member.women}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="font-semibold">Kids</label>
                  <input
                    type="number"
                    name="kids"
                    required
                    placeholder="No. of Kids"
                    value={member.kids}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
            )}
            {/*----------------------------------- flat Owner end ----------------------------------- */}

            {/*----------------------------------- flat Renter start ----------------------------------- */}
            {member.flatStatus === "Rent" && (
              <>
                {/* Owner Detail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold">Building Code</label>
                    <input
                      type="text"
                      name="buildingCode"
                      required
                      placeholder="Building Code"
                      value={member.buildingCode}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="font-semibold">Flat No</label>
                    <input
                      type="text"
                      name="flatNo"
                      required
                      placeholder="Flat Number"
                      value={member.flatNo}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Flat Owner Name</label>
                    <input
                      type="text"
                      name="flatOwnerName"
                      required
                      placeholder="Owner Name"
                      value={member.flatOwnerName}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">
                      Flat Owner Phone (Only for record, no OTP)
                    </label>
                    <input
                      type="text"
                      name="flatOwnerPhoneNumber"
                      required
                      placeholder="Owner Phone"
                      value={member.flatOwnerPhoneNumber}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>

                {/* Renter Detail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold">Flat Renter Name</label>
                    <input
                      type="text"
                      name="flatRenterName"
                      required
                      placeholder="flat Renter Name..."
                      value={member.flatRenterName}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">
                      Renter Phone(Primary - OTP will be sent)
                    </label>
                    <input
                      type="text"
                      name="primaryPhone"
                      required
                      placeholder="flat Renter Phone"
                      value={member.primaryPhone}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <div className="relative">
                    <label className="font-semibold">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password..."
                      name="password"
                      required
                      value={member.password}
                      onChange={handleChange}
                      className="w-full border p-2 rounded focus:outline-none focus:ring-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
                    >
                      {showPassword ? (
                        <FaEye size={20} />
                      ) : (
                        <FaEyeSlash size={20} />
                      )}
                    </button>
                  </div>

                  <div>
                    <label className="font-semibold">
                      Total Members in Family
                    </label>
                    <input
                      type="number"
                      name="memberInFamily"
                      required
                      placeholder="Total Members"
                      value={member.memberInFamily}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="font-semibold">Men</label>
                    <input
                      type="number"
                      name="men"
                      required
                      placeholder="No. of Men"
                      value={member.men}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Women</label>
                    <input
                      type="number"
                      name="women"
                      required
                      placeholder="No. of Women"
                      value={member.women}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Kids</label>
                    <input
                      type="number"
                      name="kids"
                      required
                      placeholder="No. of Kids"
                      value={member.kids}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="font-semibold">flat joining Date</label>
                    <input
                      type="date"
                      name="flatRenterJoining"
                      required
                      placeholder="shop renter joining Date"
                      value={member.flatRenterJoining}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>
              </>
            )}
            {/*----------------------------------- flat Renter end ----------------------------------- */}
          </>
        )}
        {/*---------------------------------- FLAT MEMBER FORM End-------------------------------------- */}
        {/* --------------------------------------SHOP MEMBER FORM start---------------------------------*/}
        {member.memberType === "Shop" && (
          <>
            {/* Shop Status */}
            <div>
              <label className="font-semibold">Shop Status</label>
              <select
                name="shopStatus"
                required
                value={member.shopStatus}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Shop Status</option>
                <option value="Owner">Owner</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            {/*----------------------------------- shop owner form start ----------------------------------- */}
            {member.shopStatus === "Owner" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold">Building Code</label>
                    <input
                      type="text"
                      name="buildingCode"
                      required
                      placeholder="Building Code"
                      value={member.buildingCode}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  {/* Shop Number */}
                  <div>
                    <label className="font-semibold">Shop Number</label>
                    <input
                      type="text"
                      name="shopNo"
                      required
                      placeholder="Enter Shop Number"
                      value={member.shopNo}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold">Owner Name</label>
                    <input
                      type="text"
                      name="shopOwnerName"
                      required
                      placeholder="Owner Name"
                      value={member.shopOwnerName}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">
                      Owner Phone (Primary - OTP will be sent)
                    </label>
                    <input
                      type="text"
                      name="shopOwnerPhone"
                      required
                      placeholder="Owner Phone"
                      value={member.shopOwnerPhone}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div className="relative">
                    <label className="font-semibold">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password..."
                      name="password"
                      required
                      value={member.password}
                      onChange={handleChange}
                      className="w-full border p-2 rounded focus:outline-none focus:ring-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
                    >
                      {showPassword ? (
                        <FaEye size={20} />
                      ) : (
                        <FaEyeSlash size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/*----------------------------------- shop owner form end ----------------------------------- */}

            {/* --------------------------------------------shop Rent form start---------------------------------- */}
            {member.shopStatus === "Rent" && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold">Building Code</label>
                    <input
                      type="text"
                      name="buildingCode"
                      required
                      placeholder="Building Code"
                      value={member.buildingCode}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  {/* Shop Number */}
                  <div>
                    <label className="font-semibold">Shop Number</label>
                    <input
                      type="text"
                      name="shopNo"
                      required
                      placeholder="Enter Shop Number"
                      value={member.shopNo}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold">Owner Name</label>
                    <input
                      type="text"
                      name="shopOwnerName"
                      required
                      placeholder="Owner Name"
                      value={member.shopOwnerName}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">
                      Owner Phone(Only for record, no OTP)
                    </label>
                    <input
                      type="text"
                      name="shopOwnerPhoneNumber"
                      required
                      placeholder="Owner Phone"
                      value={member.shopOwnerPhoneNumber}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Renter Name</label>
                    <input
                      type="text"
                      name="shopRenterName"
                      required
                      placeholder="Renter Name"
                      value={member.shopRenterName}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">
                      Renter Phone(Primary - OTP will be sent)
                    </label>
                    <input
                      type="text"
                      name="primaryPhone"
                      required
                      placeholder="Renter Phone"
                      value={member.primaryPhone}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <div className="relative">
                    <label className="font-semibold">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password..."
                      name="password"
                      required
                      value={member.password}
                      onChange={handleChange}
                      className="w-full border p-2 rounded focus:outline-none focus:ring-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
                    >
                      {showPassword ? (
                        <FaEye size={20} />
                      ) : (
                        <FaEyeSlash size={20} />
                      )}
                    </button>
                  </div>
                  <div>
                    <label className="font-semibold">Shop opening Date</label>
                    <input
                      type="date"
                      name="shopRenterJoining"
                      required
                      placeholder="shop renter joining Date"
                      value={member.shopRenterJoining}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>
                {/* --------------------------------------------shop Rent form end---------------------------------- */}
              </div>
            )}
          </>
        )}
        {/* --------------------------------------SHOP MEMBER FORM end---------------------------------*/}

        {/* Submit */}
        {member.memberType && (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default SocietyMemberForm;
