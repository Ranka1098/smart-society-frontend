import axios from "axios";
import React from "react";
import { FaHome, FaPhoneAlt, FaUserTie, FaTrash } from "react-icons/fa";

const FlatOwnerCard = ({ item, onDelete }) => {
  const deleteMember = async () => {
    const confirmAction = window.confirm(
      "⚠️ Ye member permanently delete ho jayega. Continue?"
    );
    if (!confirmAction) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/deleteMember/${item._id}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("✅ Member successfully deleted");
        onDelete(item._id);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Member delete failed");
    }
  };

  return (
    <div className="relative p-5 rounded-xl shadow-md bg-white border">
      {/* 🔴 DELETE BUTTON */}
      <button
        onClick={deleteMember}
        className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full text-white bg-red-600 hover:bg-red-700 flex items-center gap-1"
      >
        <FaTrash />
        Delete
      </button>

      <div className="flex items-center gap-3 mb-3">
        <FaHome className="text-blue-600 text-xl" />
        <h3 className="text-lg font-bold text-gray-800">Flat Owner Details</h3>
      </div>

      <p>
        <b>Flat No:</b> {item.flatNo}
      </p>

      <p className="flex items-center gap-2">
        <FaUserTie />
        <b>Name:</b> {item.flatOwnerName}
      </p>

      <p className="flex items-center gap-2">
        <FaPhoneAlt />
        <b>Phone:</b> {item.primaryPhone}
      </p>

      <p>
        <b>Status:</b> {item.status}
      </p>
    </div>
  );
};

export default FlatOwnerCard;
