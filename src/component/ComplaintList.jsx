import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getAdminComplaints", {
        withCredentials: true,
      });
      setComplaints(res.data.complaints || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Resolve complaint
  const markResolved = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/resolveComplaint/${id}`,
        {},
        { withCredentials: true }
      );
      alert("Complaint marked as resolved");
      fetchComplaints();
    } catch (err) {
      console.error(err);
      alert("Failed to update complaint");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-600 mt-4">Loading complaints...</p>
    );
  }

  return (
    <div className="bg-white shadow-md overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200 text-gray-700 text-sm">
          <tr>
            <th className="p-3 border">Flat / Shop No</th>
            <th className="p-3 border">Member Name</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Raised On</th>
            <th className="p-3 border">Resolved On</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {complaints.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-gray-500 p-4 border">
                No complaints found
              </td>
            </tr>
          ) : (
            complaints.map((c) => (
              <tr key={c._id} className="text-center text-sm hover:bg-gray-50">
                <td className="p-3 border">{c.unitNo}</td>
                <td className="p-3 border">{c.memberName}</td>
                <td className="p-3 border">{c.category}</td>
                <td className="p-3 border">{c.description}</td>

                <td
                  className={`p-3 border font-semibold ${
                    c.status === "resolved" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {c.status}
                </td>

                <td className="p-3 border">
                  {new Date(c.createdAt).toLocaleDateString("en-IN")}
                </td>

                <td className="p-3 border">
                  {c.resolvedAt
                    ? new Date(c.resolvedAt).toLocaleDateString("en-IN")
                    : "—"}
                </td>

                <td className="p-3 border">
                  {c.status === "pending" ? (
                    <button
                      onClick={() => markResolved(c._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Mark Resolved
                    </button>
                  ) : (
                    <span className="text-gray-400">Done</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintList;
