import axios from "axios";
import React, { useEffect, useState } from "react";

const MemberApproval = () => {
  // Dummy data (ye baad me backend se fetch hoga)
  const [members, setMembers] = useState([]);

  // {
  //   _id: "1",
  //   name: "Rahul Sharma",
  //   phone: "9876543210",
  //   memberType: "Flat",
  //   flatNo: "A-101",
  //   flatStatus: "Owner",
  //   shopNo: null,
  //   shopStatus: null,
  // },
  // {
  //   _id: "2",
  //   name: "Ankit Verma",
  //   phone: "9123456789",
  //   memberType: "Shop",
  //   shopNo: "S-12",
  //   shopStatus: "Rent",
  //   flatNo: null,
  //   flatStatus: null,
  // },

  useEffect(() => {
    const allMemberRequets = async () => {
      const res = await axios.get("http://localhost:5000/getAllPendingMember");
      if (res.status === 200) {
        console.log("all pending member", res.data.data);
        setMembers(res.data?.data || []);
      }
    };
    allMemberRequets();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await axios.post("http://localhost:5000/adminApproveMember", {
        pendingId: id.toString(),
      });

      if (res.status === 200) {
        alert("Member is approved successfully");

        // 👇 Remove approved member without refresh
        setMembers((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // adminRejectMember
  const handleReject = async (id) => {
    try {
      const res = await axios.post("http://localhost:5000/adminRejectMember", {
        pendingId: id.toString(),
      });
      console.log("member res", res.data);

      if (res.status === 200) {
        alert("Member is rejected successfully");

        // 👇 Remove approved member without refresh
        setMembers((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl font-bold mb-5">
        Member Approval Request
      </h1>
      <h2 className="text-2xl font-bold mb-6">Pending Member Approvals</h2>

      {members.length === 0 ? (
        <p className="text-gray-600">No pending requests</p>
      ) : (
        <ul className="space-y-4">
          {members.map((member) => (
            <li
              key={member._id}
              className="relative p-4 bg-white border shadow rounded-lg flex justify-between items-center"
            >
              {/* BADGES TOP RIGHT */}
              <div className="absolute top-2 right-2 flex space-x-2">
                {/* Member Type Badge */}
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded 
                  ${
                    member.memberType === "Flat"
                      ? "bg-blue-500 text-white"
                      : "bg-purple-500 text-white"
                  }
                `}
                >
                  {member.memberType}
                </span>

                {/* Status Badge */}
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded 
                  ${
                    member.status === "Owner"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }
                `}
                >
                  {member.status}
                </span>
              </div>

              {/* Member Info */}
              <div className="space-y-1">
                {member.memberType === "Flat" && (
                  <>
                    <p>
                      <strong>Flat No:</strong> {member.flatNo}
                    </p>

                    {member.status === "Owner" && (
                      <>
                        <p>
                          <strong>Owner Name:</strong> {member.flatOwnerName}
                        </p>
                        <p>
                          <strong>Owner Phone:</strong> {member.primaryPhone}
                        </p>
                      </>
                    )}

                    {member.status === "Rent" && (
                      <>
                        <p>
                          <strong>Renter Name:</strong> {member.flatRenterName}
                        </p>
                        <p>
                          <strong>Renter Phone:</strong> {member.primaryPhone}
                        </p>

                        <p>
                          <strong>Flat Owner Name:</strong>{" "}
                          {member.flatOwnerName}
                        </p>
                        <p>
                          <strong>Flat Owner Phone:</strong>{" "}
                          {member.flatOwnerPhoneNumber}
                        </p>
                      </>
                    )}
                  </>
                )}
                {member.memberType === "Shop" && (
                  <>
                    <p>
                      <strong>Shop No:</strong> {member.shopNo}
                    </p>

                    {member.status === "Owner" && (
                      <>
                        <p>
                          <strong>Shop Owner Name:</strong>{" "}
                          {member.shopOwnerName}
                        </p>
                        <p>
                          <strong>Owner Phone:</strong> {member.primaryPhone}
                        </p>
                      </>
                    )}

                    {member.status === "Rent" && (
                      <>
                        <p>
                          <strong>Renter Name:</strong> {member.shopRenterName}
                        </p>
                        <p>
                          <strong>Renter Phone:</strong> {member.primaryPhone}
                        </p>

                        <p>
                          <strong>Shop Owner Name:</strong>{" "}
                          {member.shopOwnerName}
                        </p>
                        <p>
                          <strong>Shop Owner Phone:</strong>{" "}
                          {member.shopOwnerPhoneNumber}
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-x-2">
                <button
                  onClick={() => handleApprove(member._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(member._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MemberApproval;
