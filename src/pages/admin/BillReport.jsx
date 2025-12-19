import React, { useState } from "react";

const BillMemo = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    number: "",
    month: "",
    amount: "",
    status: "Paid",
  });

  const [generatedBill, setGeneratedBill] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateBill = () => {
    if (
      !form.name ||
      !form.number ||
      !form.amount ||
      !form.month ||
      !form.type
    ) {
      alert("⚠️ Please fill all required fields!");
      return;
    }
    setGeneratedBill({ ...form, date: new Date().toLocaleDateString() });
  };

  const downloadBill = () => {
    alert("📄 Bill PDF Download Hoga (future me)");
  };

  const shareOnWhatsApp = () => {
    const text = `🧾 Society Maintenance Bill
Name: ${generatedBill.name}
${generatedBill.type} No: ${generatedBill.number}
Month: ${generatedBill.month}
Amount: ₹${generatedBill.amount}
Status: ${generatedBill.status}
Date: ${generatedBill.date}`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const resetForm = () => {
    setGeneratedBill(null);
    setForm({
      name: "",
      type: "",
      number: "",
      month: "",
      amount: "",
      status: "Paid",
    });
  };

  return (
    <div className="h-screen flex justify-center items-center mt-[-5rem]">
      <div className="p-6  w-[800px]     bg-white shadow-2xl rounded-2xl border">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🏢 Generate Maintenance Bill
        </h1>

        {/* Bill Form */}
        {!generatedBill ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Member Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Member Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter member name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              >
                <option value="">Select Type</option>
                <option value="Flat">Flat</option>
                <option value="Shop">Shop</option>
              </select>
            </div>

            {/* Number */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Flat/Shop Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="number"
                placeholder="Enter flat/shop number"
                value={form.number}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Month */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Month <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                name="month"
                value={form.month}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            {/* Button full width */}
            <div className="md:col-span-2">
              <button
                onClick={generateBill}
                className="w-full py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-all"
              >
                ✅ Generate Bill
              </button>
            </div>
          </div>
        ) : (
          /* Bill Preview (Memo) */
          <div className="border p-6 rounded-xl shadow-lg bg-gray-50">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
              🧾 Society Maintenance Bill
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              <p>
                <b>Name:</b> {generatedBill.name}
              </p>
              <p>
                <b>{generatedBill.type} No:</b> {generatedBill.number}
              </p>
              <p>
                <b>Month:</b> {generatedBill.month}
              </p>
              <p>
                <b>Amount:</b> ₹{generatedBill.amount}
              </p>
              <p>
                <b>Status:</b> {generatedBill.status}
              </p>
              <p>
                <b>Date:</b> {generatedBill.date}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              <button
                onClick={downloadBill}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
              >
                📥 Download PDF
              </button>
              <button
                onClick={shareOnWhatsApp}
                className="px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                📲 Share on WhatsApp
              </button>
              <button
                onClick={resetForm}
                className="px-5 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition"
              >
                🔄 New Bill
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillMemo;
