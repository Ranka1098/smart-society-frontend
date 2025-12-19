import React, { useState } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const summary = {
    total: 30,
    owner: 5,
    rented: 25,
  };

  const shops = [
    { id: "101", name: "Rajesh Kumar", type: "Owner" },
    { id: "102", name: "Suresh Patel", type: "Rented" },
    { id: "103", name: "Amit Sharma", type: "Owner" },
    { id: "104", name: "XYZ", type: "Rented" },
    // aur bhi shops add kar sakte ho
  ];

  const [filter, setFilter] = useState("All");

  // Filtered data
  const filteredShops =
    filter === "All" ? shops : shops.filter((shop) => shop.type === filter);

  return (
    <div className="p-6 w-full bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Shop Detail
      </h1>

      {/* Summary */}
      <div className="max-w-4xl mx-auto mb-6 bg-white shadow-md rounded-xl p-4 flex justify-around">
        <p className="font-semibold text-gray-700">
          Total Shops: <span className="text-blue-600">{summary.total}</span>
        </p>
        <p className="font-semibold text-gray-700">
          Owner Shops: <span className="text-green-600">{summary.owner}</span>
        </p>
        <p className="font-semibold text-gray-700">
          Rented Shops:{" "}
          <span className="text-orange-600">{summary.rented}</span>
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded-lg ${
            filter === "All"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Owner")}
          className={`px-4 py-2 rounded-lg ${
            filter === "Owner"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Owner
        </button>
        <button
          onClick={() => setFilter("Rented")}
          className={`px-4 py-2 rounded-lg ${
            filter === "Rented"
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Rented
        </button>
      </div>

      {/* Shop List */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShops.map((shop) => (
          <Link
            key={shop.id}
            to={`/shopDetail/${shop.id}`}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition block"
          >
            <p className="font-semibold text-gray-800">Shop No: {shop.id}</p>
            <p className="text-gray-600">Name: {shop.name}</p>
            <p
              className={`text-sm font-medium ${
                shop.type === "Owner" ? "text-green-600" : "text-blue-600"
              }`}
            >
              Type: {shop.type}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
