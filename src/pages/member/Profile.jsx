import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPhoneAlt, FaHome, FaUsers } from "react-icons/fa";

const Profile = () => {
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLoginMemberDetail = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/getLoginMemberInfo",
          { withCredentials: true }
        );
        setMemberData(res.data.member);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    getLoginMemberDetail();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!memberData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-indigo-500 text-white text-3xl flex items-center justify-center mb-3">
            {memberData.flatOwnerName?.charAt(0) || "M"}
          </div>
          <h2 className="text-2xl font-bold">{memberData.flatOwnerName}</h2>
          <p className="text-gray-500 mt-1">
            {memberData.memberType}-{memberData.status}
          </p>
        </div>

        {/* Info List */}
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center space-x-2">
            <FaHome className="text-indigo-500" />
            <div>
              <p className="text-sm">Flat Number</p>
              <p className="font-semibold">{memberData.flatNo}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-indigo-500" />
            <div>
              <p className="text-sm">Phone Number</p>
              <p className="font-semibold">{memberData.primaryPhone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <FaUsers className="text-indigo-500" />
            <div>
              <p className="text-sm">Members in Family</p>
              <p className="font-semibold">{memberData.memberInFamily}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
