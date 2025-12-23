import React, { useState } from "react";
import axios from "axios";

const Complaint = () => {
  // State for complaints
  const [complaints, setComplaints] = useState([]);

  // New complaint form state
  const [form, setForm] = useState({
    type: "",
    number: "",
    name: "",
    category: "Water",
    description: "",
  });

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new complaint
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/createComplaint",
        {
          unitType: form.type,
          unitNo: form.number,
          memberName: form.name,
          category: form.category,
          description: form.description,
        },
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Complaint raised successfully");

        // optional reset
        setForm({
          type: "",
          number: "",
          name: "",
          category: "Water",
          description: "",
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // Mark complaint resolved
  const markResolved = (id) => {
    setComplaints(
      complaints.map((c) => (c.id === id ? { ...c, status: "Resolved" } : c))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Complaint Management
      </h1>

      {/* Complaint Form */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Submit a Complaint</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Flat / Shop</option>
            <option value="Flat">Flat</option>
            <option value="Shop">Shop</option>
          </select>

          <input
            type="text"
            name="number"
            placeholder="Flat/Shop No"
            value={form.number}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Resident Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Lift">Lift</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Security">Security</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="description"
            placeholder="Describe your complaint"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded col-span-1 md:col-span-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 col-span-1 md:col-span-2"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
