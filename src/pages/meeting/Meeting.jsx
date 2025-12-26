import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Meeting = () => {
  const [title, setTitle] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meetingList, setMeetingList] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch all society members
  const getAllSocietyMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/allMembersList", {
        withCredentials: true,
      });
      const members = res.data.members || [];

      const initial = members.map((m) => ({
        memberId: m._id,
        memberType: m.memberType,
        flatNo: m.flatNo,
        shopNo: m.shopNo,
        present: false,
      }));

      setAttendance(initial);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch all meetings
  const getAllMeetingList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/allMeetingList", {
        withCredentials: true,
      });
      setMeetingList(res.data.meetings || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllSocietyMembers();
    getAllMeetingList();
  }, []);

  // 🔹 Toggle Attendance
  const toggleAttendance = (id) => {
    setAttendance((prev) =>
      prev.map((m) => (m.memberId === id ? { ...m, present: !m.present } : m))
    );
  };

  // 🔹 Filter members by search
  const filtered = attendance.filter((m) => {
    const value = m.memberType === "Shop" ? m.shopNo : m.flatNo;
    return value?.toString().includes(search);
  });

  // 🔹 Flats sorted ascending
  const flats = filtered
    .filter((m) => m.memberType === "Flat")
    .sort((a, b) => (a.flatNo && b.flatNo ? a.flatNo - b.flatNo : 0));

  // 🔹 Shops sorted ascending
  const shops = filtered
    .filter((m) => m.memberType === "Shop")
    .sort((a, b) => (a.shopNo && b.shopNo ? a.shopNo - b.shopNo : 0));

  const flatPresent = flats.filter((m) => m.present).length;
  const shopPresent = shops.filter((m) => m.present).length;

  // 🔹 Save Meeting
  const handleSaveMeeting = async () => {
    if (!title || !discussion) {
      alert("Title aur discussion required hai");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        discussion,
        attendance: attendance.map((m) => ({
          member: m.memberId,
          present: m.present,
        })),
      };

      await axios.post("http://localhost:5000/createMeeting", payload, {
        withCredentials: true,
      });

      alert("Meeting saved successfully ✅");

      setTitle("");
      setDiscussion("");
      setSearch("");
      setShowForm(false);
      getAllSocietyMembers();
      getAllMeetingList();
    } catch (error) {
      console.error(error);
      alert("Meeting save failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-lg text-center font-semibold text-gray-800 mb-4">
        Society Meeting
      </h1>

      <div className="max-w-5xl mx-auto">
        {/* Dropdown Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-sm font-medium flex justify-between items-center px-4"
        >
          <span>➕ Create Today Meeting</span>
          <span>{showForm ? "▲" : "▼"}</span>
        </button>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-3">
            {/* Title */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Meeting Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded mt-1 text-sm"
              />
            </div>

            {/* Discussion */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Discussion</label>
              <textarea
                value={discussion}
                onChange={(e) => setDiscussion(e.target.value)}
                rows="3"
                className="w-full border p-2 rounded mt-1 text-sm"
              />
            </div>

            {/* Search */}
            <div className="mb-5">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Flat / Shop No search kare"
                className="w-full border p-2 rounded text-sm"
              />
            </div>

            {/* Counts */}
            <div className="flex gap-4 text-xs mb-6">
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                Flat Present: {flatPresent}
              </div>
              <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                Shop Present: {shopPresent}
              </div>
            </div>

            {/* Flats */}
            <h2 className="text-sm font-medium mb-2">Flats : {flats.length}</h2>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 mb-6">
              {flats.map((m) => (
                <div
                  key={m.memberId}
                  onClick={() => toggleAttendance(m.memberId)}
                  className={`text-xs py-2 text-center rounded cursor-pointer border ${
                    m.present
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {m.flatNo}
                </div>
              ))}
            </div>

            {/* Shops */}
            <h2 className="text-sm font-medium mb-2">Shops : {shops.length}</h2>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 mb-6">
              {shops.map((m) => (
                <div
                  key={m.memberId}
                  onClick={() => toggleAttendance(m.memberId)}
                  className={`text-xs py-2 text-center rounded cursor-pointer border ${
                    m.present
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {m.shopNo}
                </div>
              ))}
            </div>

            {/* Save */}
            <div className="text-right">
              <button
                onClick={handleSaveMeeting}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Meeting"}
              </button>
            </div>
          </div>
        )}

        {/* 📋 Previous Meetings List */}
        <div className="bg-white rounded-lg shadow-sm mt-4 p-4">
          <h2 className="text-sm font-semibold mb-3 text-gray-700">
            📌 Previous Meetings
          </h2>
          {meetingList.length > 0 ? (
            <div className="space-y-3">
              {meetingList.map((m) => (
                <div
                  key={m._id}
                  onClick={() => navigate(`${m._id}`)}
                  className="border rounded-md p-3 bg-gray-50 cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-gray-800">
                      {m.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(m.meetingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{m.discussion}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">
              Koi meeting abhi tak nahi hui
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meeting;
