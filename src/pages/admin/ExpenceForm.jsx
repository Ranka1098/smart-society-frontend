import React, { useState } from "react";
import axios from "axios";

const ExpenceForm = () => {
  const [form, setForm] = useState({
    billType: "",
    date: "",
    amount: "",
    paidTo: "",
    paymentMode: "",
    description: "",
    buildingCode: "",
    billProof: null, // ✅ initialize as null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // ✅ file input
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.billProof) {
      alert("Please upload a bill proof file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("billType", form.billType);
      formData.append("billDate", form.date);
      formData.append("amount", form.amount);
      formData.append("paidTo", form.paidTo);
      formData.append("paymentMethod", form.paymentMode);
      formData.append("description", form.description);
      formData.append("buildingCode", form.buildingCode);
      formData.append("billProof", form.billProof); // ✅ file

      const res = await axios.post(
        "http://localhost:5000/createExpense",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 201 || res.data.success) {
        alert("Expense Added Successfully ✔");
        setForm({
          billType: "",
          date: "",
          amount: "",
          paidTo: "",
          paymentMode: "",
          description: "",
          buildingCode: "",
          billProof: null,
        });
      }
    } catch (error) {
      console.log(error);
      alert("Error adding expense ❌");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Add Expense Bill
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md border grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Bill Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Bill Type
          </label>
          <select
            name="billType"
            value={form.billType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">-- Select Bill Type --</option>
            <option value="Water">Water Bill</option>
            <option value="Electricity">Electricity Bill</option>
            <option value="Security">Security Guard</option>
            <option value="Cleaning">Society Cleaning</option>
            <option value="Event">Society Event</option>
            <option value="Repair">Repair</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Bill Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Bill Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Paid To */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Paid To
          </label>
          <input
            type="text"
            name="paidTo"
            value={form.paidTo}
            onChange={handleChange}
            placeholder="Enter person/company name"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Payment Mode
          </label>
          <select
            name="paymentMode"
            value={form.paymentMode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">-- Select Mode --</option>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank Transfer</option>
            <option value="UPI">UPI</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Description / Notes
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write some details (optional)"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Bill Proof */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">
            Bill Proof
          </label>
          <input
            type="file"
            name="billProof"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png,.pdf"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Add Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenceForm;
