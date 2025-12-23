import axios from "axios";
import React from "react";
import { FaHome, FaPhoneAlt, FaUserTie, FaTrash } from "react-icons/fa";

const FlatRenterCard = ({ item, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };
  // 🔴 DELETE MEMBER
  const deleteMember = async () => {
    const confirmAction = window.confirm(
      "⚠️ Ye Flat Renter permanently delete ho jayega. Continue?"
    );
    if (!confirmAction) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/deleteMember/${item._id}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("✅ Flat Renter successfully deleted");
        onDelete(item._id);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Flat Renter delete failed");
    }
  };

  return (
    <div className="relative p-3 sm:p-5 rounded-xl shadow-md bg-white border">
      {/* 🔴 DELETE BUTTON */}
      <button
        onClick={deleteMember}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 
px-2 sm:px-3 py-1 
text-[10px] sm:text-xs font-semibold 
rounded-full text-white bg-red-600 hover:bg-red-700 
flex items-center gap-1"
      >
        <FaTrash />
        Delete
      </button>

      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <FaHome className="text-green-600 text-lg sm:text-xl" />

        <h3 className="text-base sm:text-lg font-bold text-gray-800">
          Flat Renter Details
        </h3>
      </div>

      <p className="text-sm sm:text-base">
        <b>Flat No:</b> {item.flatNo || "N/A"}
      </p>

      <p className="flex items-center gap-2 text-sm sm:text-base">
        <FaUserTie />
        <span>
          <b>Renter Name:</b> {item.flatRenterName || "N/A"}
        </span>
      </p>

      <p className="flex items-center gap-2 text-sm sm:text-base">
        <FaPhoneAlt />
        <span>
          <b>Phone No:</b> {item.primaryPhone || "N/A"}
        </span>
      </p>

      <p className="flex items-center gap-2 text-sm sm:text-base">
        <FaUserTie />
        <span>
          <b>Flat Owner Name:</b> {item.flatOwnerName || "N/A"}
        </span>
      </p>
      <p className="flex items-center gap-2 text-sm sm:text-base">
        <FaPhoneAlt />
        <span>
          <b>Flat Owner Phone No:</b> {item.flatOwnerPhoneNumber || "N/A"}
        </span>
      </p>

      <p className="flex items-center gap-2 text-sm sm:text-base">
        <b>Status:</b> {item.status || "N/A"}
      </p>
      <p className="flex items-center gap-2 text-sm sm:text-base">
        <b>DateOfJoinigFlat:</b> {formatDate(item.dateOfJoiningFlat)}
      </p>
    </div>
  );
};

export default FlatRenterCard;
