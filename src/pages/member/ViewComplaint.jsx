import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getMemberComplaint", {
        withCredentials: true,
      });
      setComplaints(res.data.complaints || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyComplaints();

    // 🔁 auto refresh every 10 seconds (optional)
    const interval = setInterval(fetchMyComplaints, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-6 text-gray-600">
        Loading your complaints...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Complaints</h2>

      {complaints.length === 0 ? (
        <p className="text-gray-500 text-center">
          You have not raised any complaints yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Raised On</th>
                <th className="p-3 border">Resolved On</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr key={c._id} className="text-center hover:bg-gray-50">
                  <td className="p-3 border">{c.category}</td>
                  <td className="p-3 border">{c.description}</td>

                  <td className="p-3 border">
                    {c.status === "resolved" ? (
                      <span className="text-green-600 font-semibold">
                        Resolved ✔
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Pending ⏳
                      </span>
                    )}
                  </td>

                  <td className="p-3 border">
                    {new Date(c.createdAt).toLocaleDateString("en-IN")}
                  </td>

                  <td className="p-3 border">
                    {c.resolvedAt
                      ? new Date(c.resolvedAt).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewComplaint;
