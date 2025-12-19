import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // icons

const SocietyStaffInfo = () => {
  const [staffs, setStaff] = useState([]);

  useEffect(() => {
    const getStaffInfo = async () => {
      const res = await axios.get("http://localhost:5000/allStaffMember");
      setStaff(res.data.staff);
    };
    getStaffInfo();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    try {
      await axios.delete(`http://localhost:5000/deleteStaffMember/${id}`, {
        withCredentials: true,
      });
      // Update state after deletion
      setStaff(staffs.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting staff");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Society Staff Details
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffs.map((staff) => (
          <div
            key={staff._id}
            className="relative bg-white rounded-xl shadow-lg border hover:shadow-2xl transition duration-300"
          >
            {/* Top-right buttons */}
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleDelete(staff._id)}
                className="p-1 text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>

            {/* Photo & Role */}
            <div className="flex flex-col items-center p-4 border-b">
              <img
                src={`http://localhost:5000/${staff.workerPhoto.replace(
                  "\\",
                  "/"
                )}`}
                alt={staff.workerName}
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
              <p className="mt-3 font-semibold text-lg text-blue-600">
                {staff.role}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Joined:{" "}
                {new Date(staff.joiningDate).toLocaleDateString("en-IN")}
              </p>
            </div>

            {/* Details */}
            <div className="p-4 space-y-2 text-gray-700 text-sm">
              <p className="font-semibold text-md">
                <span className="font-semibold">Name:</span> {staff.workerName}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {staff.workerAddress}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {staff.workerPhoneNumber}
              </p>
              <p>
                <span className="font-semibold">Proof:</span>{" "}
                <a
                  href={`http://localhost:5000/${staff.workerIdProof.replace(
                    "\\",
                    "/"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View ID
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocietyStaffInfo;
