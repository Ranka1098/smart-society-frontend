import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MeetingDetail = () => {
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [allMembers, setAllMembers] = useState([]); // ✅ All members
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Meeting detail
        const meetingRes = await axios.get(
          `http://localhost:5000/singleMeeting/${meetingId}`,
          { withCredentials: true }
        );

        setMeeting(meetingRes.data.meeting);

        // 2️⃣ All members
        const membersRes = await axios.get(
          "http://localhost:5000/allMembersList",
          { withCredentials: true }
        );
        setAllMembers(membersRes.data.members || []);
      } catch (err) {
        console.error(err);
        alert("Data load nahi hui");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [meetingId]);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  if (!meeting) {
    return (
      <div className="p-4 text-center text-red-500">Meeting not found</div>
    );
  }

  const mergedAttendance = allMembers.map((m) => {
    const record = meeting.attendance.find((a) => {
      // a.member ya string ho sakta hai
      const memberId = typeof a.member === "string" ? a.member : a.member?._id;
      return String(memberId) === String(m._id);
    });

    return {
      member: m, // pura member object
      present: record ? record.present : false,
      _id: m._id,
    };
  });

  const flats = mergedAttendance
    .filter((a) => a.member.memberType === "Flat")
    .sort((a, b) => a.member.flatNo - b.member.flatNo);

  const shops = mergedAttendance
    .filter((a) => a.member.memberType === "Shop")
    .sort((a, b) => a.member.shopNo - b.member.shopNo);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 mb-3 hover:underline"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-lg font-semibold text-gray-800 mb-2">
          {meeting.title}
        </h1>
        <p className="text-xs text-gray-500 mb-4">
          📅 {new Date(meeting.meetingDate).toLocaleString()}
        </p>

        <div className="mb-5">
          <h2 className="text-sm font-medium text-gray-700 mb-1">Discussion</h2>
          <p className="text-sm text-gray-600">{meeting.discussion}</p>
        </div>

        <div className="flex gap-4 text-xs mb-5">
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Present: {mergedAttendance.filter((a) => a.present).length}
          </div>
          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
            Absent: {mergedAttendance.filter((a) => !a.present).length}
          </div>
        </div>

        {/* Flats */}
        <h2 className="text-sm font-medium text-gray-700 mb-2">Flats</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-5">
          {flats.map((a) => (
            <div
              key={a._id}
              className={`text-xs py-2 text-center rounded border ${
                a.present
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Flat {a.member.flatNo}
            </div>
          ))}
        </div>

        {/* Shops */}
        <h2 className="text-sm font-medium text-gray-700 mb-2">Shops</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {shops.map((a) => (
            <div
              key={a._id}
              className={`text-xs py-2 text-center rounded border ${
                a.present
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              Shop {a.member.shopNo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
