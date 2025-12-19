import React from "react";
import axios from "axios";
import {
  FaStore,
  FaPhoneAlt,
  FaUserTie,
  FaDoorOpen,
  FaTrash,
} from "react-icons/fa";

const ShopRenterCard = ({ item, onDelete }) => {
  // 🔴 DELETE SHOP RENTER
  const deleteMember = async () => {
    const confirmAction = window.confirm(
      "⚠️ Ye Shop Renter permanently delete ho jayega. Continue?"
    );
    if (!confirmAction) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/deleteMember/${item._id}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("✅ Shop Renter successfully deleted");
        onDelete(item._id);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Shop Renter delete failed");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="relative p-5 rounded-xl shadow-md border border-gray-200 bg-white">
      {/* 🔴 DELETE BUTTON */}
      <button
        onClick={deleteMember}
        className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full text-white bg-red-600 hover:bg-red-700 flex items-center gap-1"
      >
        <FaTrash />
        Delete
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <FaStore className="text-orange-600 text-xl" />
        <h3 className="text-lg font-bold text-gray-800">Shop Renter Details</h3>
      </div>

      {/* Shop No */}
      <p>
        <b>Shop No:</b> {item.shopNo || "N/A"}
      </p>

      {/* Renter Name */}
      <p className="flex items-center gap-2">
        <FaUserTie />
        <span>
          <b>Renter Name:</b> {item.shopRenterName || "N/A"}
        </span>
      </p>

      {/* Renter Phone */}
      <p className="flex items-center gap-2">
        <FaPhoneAlt />
        <span>
          <b>Renter Phone:</b> {item.primaryPhone || "N/A"}
        </span>
      </p>

      {/* Owner Name */}
      <p className="flex items-center gap-2">
        <FaUserTie />
        <span>
          <b>Owner Name:</b> {item.shopOwnerName || "N/A"}
        </span>
      </p>

      {/* Owner Phone */}
      <p className="flex items-center gap-2">
        <FaPhoneAlt />
        <span>
          <b>Owner Phone:</b> {item.shopOwnerPhoneNumber || "N/A"}
        </span>
      </p>

      {/* Status */}
      <p className="flex items-center gap-2">
        <FaDoorOpen />
        <span>
          <b>Status:</b> {item.status || "N/A"}
        </span>
      </p>

      {/* Date of Joining */}
      <p className="flex items-center gap-2">
        <b>Date of Joining:</b> {formatDate(item.dateOfJoiningFlat)}
      </p>
    </div>
  );
};

export default ShopRenterCard;
