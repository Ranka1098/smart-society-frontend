import { Link } from "react-router-dom";
import { useState } from "react";

const Flat = () => {
  // Dummy data
  const summary = {
    total: 44,
    owner: 34,
    rented: 10,
  };

  const flats = [
    { id: "101", name: "Rajesh Kumar", type: "Owner" },
    { id: "102", name: "Suresh Patel", type: "Rented" },
    { id: "103", name: "Amit Sharma", type: "Owner" },
    { id: "104", name: "XYZ", type: "Rented" },
    { id: "105", name: "Sunil Verma", type: "Owner" },
  ];

  const [filter, setFilter] = useState("All"); // 👈 filter state

  // Flats ko filter karna
  const filteredFlats =
    filter === "All" ? flats : flats.filter((flat) => flat.type === filter);

  return (
    <div className="p-6 w-full bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Flat Details
      </h1>

      {/* Summary */}
      <div className="max-w-4xl mx-auto mb-6 bg-white shadow-md rounded-xl p-4 flex justify-around">
        <p className="font-semibold text-gray-700">
          Total Flats: <span className="text-blue-600">{summary.total}</span>
        </p>
        <p className="font-semibold text-gray-700">
          Owner Flats: <span className="text-green-600">{summary.owner}</span>
        </p>
        <p className="font-semibold text-gray-700">
          Rented Flats:{" "}
          <span className="text-orange-600">{summary.rented}</span>
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-center gap-4">
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded-lg font-medium shadow 
            ${filter === "All" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Owner")}
          className={`px-4 py-2 rounded-lg font-medium shadow 
            ${filter === "Owner" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          Owner
        </button>
        <button
          onClick={() => setFilter("Rented")}
          className={`px-4 py-2 rounded-lg font-medium shadow 
            ${
              filter === "Rented" ? "bg-orange-600 text-white" : "bg-gray-200"
            }`}
        >
          Rented
        </button>
      </div>

      {/* Flat List */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFlats.map((flat) => (
          <Link
            key={flat.id}
            to={`/flatDetail/${flat.id}`}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition block"
          >
            <p className="font-semibold text-gray-800">Flat No: {flat.id}</p>
            <p className="text-gray-600">Name: {flat.name}</p>
            <p
              className={`text-sm font-medium ${
                flat.type === "Owner" ? "text-green-600" : "text-blue-600"
              }`}
            >
              Type: {flat.type}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Flat;
