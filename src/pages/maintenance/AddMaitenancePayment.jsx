import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMaitenancePayment = ({ onSuccess }) => {
  const [form, setForm] = useState({
    no: "", // 🔥 FIXED
    amount: "",
    month: "",
    paidDate: "",
    paymentMode: "Cash",
    buildingCode: "", // Admin se aayega
  });

  const [paymentId, setPaymentId] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/addMemberMaitenancePayment",
        {
          no: form.no.trim(),
          amount: Number(form.amount),
          month: form.month,
          paidDate: form.paidDate,
          paymentMode: form.paymentMode,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        const paymentId = res.data.paymentId;

        alert(res.data.message || "Maintenance payment added");

        // ✅ ✅ ✅ OPEN BILL POPUP WINDOW
        const billUrl = `http://localhost:5000/generate-maintenance-bill/${paymentId}`;
        window.open(billUrl, "_blank", "width=900,height=650");

        // ✅ Reset form
        setForm({
          no: "",
          amount: "",
          month: "",
          paidDate: "",
          paymentMode: "Cash",
        });

        onSuccess && onSuccess();
      }
    } catch (error) {
      console.error("Add Maintenance Error:", error);
      alert(
        error?.response?.data?.message || "Failed to add maintenance payment"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto  bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Maintenance Payment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* No (Flat/Shop No) */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Flat/Shop No
          </label>
          <input
            type="text"
            name="no"
            value={form.no}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        {/* Month */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Month</label>
          <input
            type="month"
            name="month"
            value={form.month}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        {/* Payment Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Payment Date
          </label>
          <input
            type="date"
            name="paidDate"
            value={form.paidDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
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
            className="w-full border border-gray-300 rounded-lg p-3"
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Add Payment
        </button>
      </form>
    </div>
  );
};

export default AddMaitenancePayment;
