import axios from "axios";
import React from "react";
import { FaHome, FaPhoneAlt, FaUserTie, FaTrash } from "react-icons/fa";

const FlatRenterCard = ({ item, onDelete }) => {
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
    <div className="relative p-5 rounded-xl shadow-md bg-white border">
      {/* 🔴 DELETE BUTTON */}
      <button
        onClick={deleteMember}
        className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full
          text-white bg-red-600 hover:bg-red-700 flex items-center gap-1"
      >
        <FaTrash />
        Delete
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <FaHome className="text-green-600 text-xl" />
        <h3 className="text-lg font-bold text-gray-800">Flat Renter Details</h3>
      </div>

      <p>
        <b>Flat No:</b> {item.flatNo || "N/A"}
      </p>

      <p className="flex items-center gap-2">
        <FaUserTie />
        <span>
          <b>Renter Name:</b> {item.flatRenterName || "N/A"}
        </span>
      </p>

      <p className="flex items-center gap-2">
        <FaPhoneAlt />
        <span>
          <b>Phone:</b> {item.primaryPhone || "N/A"}
        </span>
      </p>

      <p>
        <b>Status:</b> {item.status || "N/A"}
      </p>
    </div>
  );
};

export default FlatRenterCard;
