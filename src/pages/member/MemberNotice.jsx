import React, { useEffect, useState } from "react";
import axios from "axios";

const MemberNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/member/getNotice", {
        withCredentials: true,
      });
      console.log("notice resp", res);
      setNotices(res.data.notices || []);
    } catch (error) {
      console.error("Failed to fetch notices", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  if (loading) {
    return <p className="text-center mt-6 text-gray-500">Loading notices...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Society Notices</h2>

      {notices.length === 0 ? (
        <p className="text-gray-500 text-center">No notices available</p>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="bg-white shadow rounded p-4 border-l-4 border-blue-500"
            >
              {notices.indexOf(notice) === 0 && (
                <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Latest
                </span>
              )}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{notice.title}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(notice.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>

              {notice.description}
              {/* Latest badge */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberNotice;
