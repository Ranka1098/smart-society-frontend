import React from "react";
import axios from "axios";
import {
  FaStore,
  FaPhoneAlt,
  FaUserTie,
  FaDoorOpen,
  FaMapMarkedAlt,
  FaTrash,
} from "react-icons/fa";

const ShopOwnerCard = ({ item, onDelete }) => {
  // 🔴 DELETE SHOP OWNER
  const deleteMember = async () => {
    const confirmAction = window.confirm(
      "⚠️ Ye Shop Owner permanently delete ho jayega. Continue?"
    );
    if (!confirmAction) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/deleteMember/${item._id}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("✅ Shop Owner successfully deleted");
        onDelete(item._id);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Shop Owner delete failed");
    }
  };

  return (
    <div className="relative p-5 rounded-xl shadow-md transition-all border border-gray-200 bg-white">
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
        <FaStore className="text-purple-600 text-xl" />
        <h3 className="text-lg font-bold text-gray-800">Shop Owner Details</h3>
      </div>

      {/* Shop No */}
      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Shop No:</span> {item.shopNo || "N/A"}
      </p>

      {/* Owner Name */}
      <p className="text-gray-700 mb-1 flex items-center gap-2">
        <FaUserTie />
        <span>
          <b>Owner Name:</b> {item.shopOwnerName || "N/A"}
        </span>
      </p>

      {/* Phone */}
      <p className="text-gray-700 mb-1 flex items-center gap-2">
        <FaPhoneAlt />
        <span>
          <b>Phone:</b> {item.primaryPhone || "N/A"}
        </span>
      </p>

      {/* Status */}
      <p className="text-gray-700 mb-1 flex items-center gap-2">
        <FaDoorOpen />
        <span>
          <b>Status:</b> {item.status || "N/A"}
        </span>
      </p>

      {/* Shop Category */}
      {item.shopCategory && (
        <p className="text-gray-700 mt-1 flex items-center gap-2">
          <FaMapMarkedAlt />
          <span>
            <b>Shop Category:</b> {item.shopCategory}
          </span>
        </p>
      )}

      {/* Date of Joining */}
      {item.dateOfJoiningShop && (
        <p className="text-gray-700 mt-2">
          <b>Date of Joining:</b> {item.dateOfJoiningShop}
        </p>
      )}
    </div>
  );
};

export default ShopOwnerCard;
