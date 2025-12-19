import React from "react";
import { useNavigate } from "react-router-dom";

const ShopDetails = () => {
  const shopDetail = {
    shopNo: "1",
    residentType: "Rented", // Owner / Rented
    shopOwnerName: "Rajesh Kumar",
    shopOwnerNumber: "0123456789",
    tenantName: "Rahul Kumar",
    tenantNumber: "12378902",
  };

  const navigate = useNavigate();

  return (
    <div className="p-6 w-full flex flex-col items-center bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      {/* Back Button */}
      <div className="w-full max-w-lg mb-4">
        <button
          onClick={() => navigate("/")} // 👈 homepage par le jayega
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          ← Back
        </button>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 space-y-4">
        {/* Shop No & Resident Type */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">
            Shop No: {shopDetail.shopNo}
          </h2>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              shopDetail.residentType === "Owner"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {shopDetail.residentType}
          </span>
        </div>

        {/* Owner Details */}
        <div>
          <p className="text-gray-700">
            <span className="font-semibold">Owner Name:</span>{" "}
            {shopDetail.shopOwnerName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Owner Number:</span>{" "}
            {shopDetail.shopOwnerNumber}
          </p>
        </div>

        {/* Tenant Details - Only if Rented */}
        {shopDetail.residentType === "Rented" && (
          <div className="border-t pt-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tenant Details
            </h3>
            <p className="text-gray-700">
              <span className="font-semibold">Tenant Name:</span>{" "}
              {shopDetail.tenantName}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Tenant Number:</span>{" "}
              {shopDetail.tenantNumber}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;
