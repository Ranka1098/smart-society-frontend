import React, { useEffect, useState } from "react";
import axios from "axios";

const Maintenance = () => {
  const [tableData, setTableData] = useState([]);
  const [filterType, setFilterType] = useState("All"); // All | F | S
  const [filterStatus, setFilterStatus] = useState("All"); // All | Paid | Pending
  const [filterMonth, setFilterMonth] = useState("2025-12");
  const [searchNo, setSearchNo] = useState(""); // ✅ Flat / Shop No search

  // ✅ API CALL
  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/getAllMemberMaintenancePaymentList?month=${filterMonth}`,
          { withCredentials: true }
        );
        setTableData(res.data.data || []);
      } catch (error) {
        console.error("Maintenance fetch error:", error);
      }
    };

    fetchMaintenance();
  }, [filterMonth]);

  // ✅ Month format: 2025-12 → DEC-2025
  const formatMonth = (monthStr) => {
    const date = new Date(monthStr + "-01");
    return date
      .toLocaleString("en-US", { month: "short", year: "numeric" })
      .toUpperCase();
  };

  // ✅ Date format: yyyy-mm-dd → dd-mm-yyyy
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  // ✅ FILTERS (Type + Status + Search No)
  const filteredData = tableData.filter((row) => {
    const typeMatch =
      filterType === "All" ||
      (filterType === "F" && row.memberType === "Flat") ||
      (filterType === "S" && row.memberType === "Shop");

    const statusMatch = filterStatus === "All" || row.status === filterStatus;

    const searchMatch = searchNo === "" || String(row.No).includes(searchNo);

    return typeMatch && statusMatch && searchMatch;
  });

  // ✅ SORT BY Flat / Shop No (Ascending)
  const sortedData = [...filteredData].sort(
    (a, b) => Number(a.No) - Number(b.No)
  );

  // ✅ SUMMARY
  const totalCollected = tableData
    .filter((d) => d.status === "Paid")
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  const totalPending = tableData.filter((d) => d.status === "Pending").length;

  const flatsPaid = tableData.filter(
    (d) => d.memberType === "Flat" && d.status === "Paid"
  ).length;

  const flatsPending = tableData.filter(
    (d) => d.memberType === "Flat" && d.status === "Pending"
  ).length;

  const shopsPaid = tableData.filter(
    (d) => d.memberType === "Shop" && d.status === "Paid"
  ).length;

  const shopsPending = tableData.filter(
    (d) => d.memberType === "Shop" && d.status === "Pending"
  ).length;

  const cards = [
    { title: "Total Collection", value: `₹${totalCollected}` },
    { title: "Pending Members", value: totalPending },
    { title: "Flats Paid", value: flatsPaid },
    { title: "Flats Pending", value: flatsPending },
    { title: "Shops Paid", value: shopsPaid },
    { title: "Shops Pending", value: shopsPending },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold text-center mb-6">
        Maintenance Summary
      </h1>

      {/* ✅ SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {cards.map((c, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-600">{c.title}</p>
            <p className="font-bold text-lg">{c.value}</p>
          </div>
        ))}
      </div>

      {/* ✅ TOP CONTROLS */}
      <div className="flex flex-wrap  gap-4 mb-6">
        {/* Month */}
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="border p-2 rounded-lg"
        />

        {/* Search Flat / Shop No */}
        <input
          type="text"
          placeholder="Flat / Shop No"
          value={searchNo}
          onChange={(e) => setSearchNo(e.target.value)}
          className="border p-2 rounded-lg"
        />
      </div>

      {/* ✅ FILTER BUTTONS */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Type */}
        {["All", "F", "S"].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-2 rounded border ${
              filterType === t ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {t === "All" ? "All" : t === "F" ? "Flats" : "Shops"}
          </button>
        ))}

        {/* Status */}
        {["All", "Paid", "Pending"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded border ${
              filterStatus === s ? "bg-green-600 text-white" : "bg-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ✅ TABLE */}
      {/* ✅ TABLE WRAPPER */}
      <div className="bg-white rounded-xl shadow border max-h-[65vh] overflow-y-auto">
        <table className="w-full border-collapse">
          {/* ✅ FIXED HEADER */}
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="border p-3">Flat / Shop No</th>
              <th className="border p-3">Member Name</th>
              <th className="border p-3">Type</th>
              <th className="border p-3">Amount</th>
              <th className="border p-3">Month</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Paid Date</th>
              <th className="border p-3">Payment Mode</th>
            </tr>
          </thead>

          {/* ✅ BODY (NO HACK) */}
          <tbody>
            {sortedData.length ? (
              sortedData.map((row, i) => (
                <tr
                  key={i}
                  className={`text-center hover:bg-gray-50 transition
    ${
      row.residencyStatus === "Vacant" || row.residencyStatus === "Inactive"
        ? "opacity-50 blur-[1px]"
        : ""
    }
  `}
                >
                  <td className="border p-3">{row.No}</td>
                  <td className="border p-3">{row.memberName}</td>
                  <td className="border p-3">
                    {row.memberType === "Flat" ? "F" : "S"}
                  </td>
                  <td className="border p-3">
                    {row.amount ? `₹${row.amount}` : "—"}
                  </td>
                  <td className="border p-3">{formatMonth(filterMonth)}</td>
                  <td
                    className={`border p-3 font-semibold ${
                      row.status === "Paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {row.status}
                  </td>
                  <td className="border p-3">{formatDate(row.paidDate)}</td>
                  <td className="border p-3">{row.paymentMode || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Maintenance;
