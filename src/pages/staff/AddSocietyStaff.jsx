import { useState } from "react";
import axios from "axios";

const AddSocietyStaff = () => {
  const [staff, setStaff] = useState({
    name: "",
    address: "",
    phone: "",
    role: "",
    workerIdProof: null,
    workerPhoto: null,
    joiningDate: "", // ✅ naya field
  });

  const [formKey, setFormKey] = useState(Date.now());

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setStaff((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setStaff((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // ✅ text values
      formData.append("role", staff.role);
      formData.append("workerName", staff.name);
      formData.append("joiningDate", staff.joiningDate);
      formData.append("workerPhoneNumber", staff.phone);
      formData.append("workerAddress", staff.address);

      // ✅ file values
      formData.append("workerPhoto", staff.workerPhoto);
      formData.append("workerIdProof", staff.workerIdProof);

      const res = await axios.post(
        "http://localhost:5000/createStaffMember",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        alert("Staff member created successfully ✅");
        setStaff({
          name: "",
          address: "",
          phone: "",
          role: "",
          joiningDate: "",
          workerIdProof: null,
          workerPhoto: null,
        });
        // 🔥 form re-mount → file inputs clear
        setFormKey(Date.now());
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error adding staff ❌");
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-white shadow-lg rounded ">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Add Society Staff
      </h2>

      <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
        {/* Role */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">
            Role / Work
          </label>
          <select
            name="role"
            value={staff.role}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            required
          >
            <option value="">Select Role</option>
            <option value="Security Guard">Security Guard</option>
            <option value="Cleaner">Cleaner</option>
          </select>
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">
            Worker Full Name
          </label>
          <input
            type="text"
            name="name"
            value={staff.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            required
          />
        </div>

        {/* Joining Date */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">
            Joining Date
          </label>
          <input
            type="date"
            name="joiningDate"
            value={staff.joiningDate}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">
            Worker Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={staff.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            required
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">
            Worker Old Address
          </label>
          <textarea
            name="address"
            value={staff.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full resize-none"
            required
          />
        </div>

        {/* Proof */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">
            Worker ID Proof
          </label>
          <input
            type="file"
            name="workerIdProof"
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Photo */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">
            Worker Photo
          </label>
          <input
            type="file"
            name="workerPhoto"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png"
            className="border rounded-lg p-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Add Staff
        </button>
      </form>
    </div>
  );
};

export default AddSocietyStaff;
