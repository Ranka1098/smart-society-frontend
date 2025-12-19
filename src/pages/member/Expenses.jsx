import React, { useState, useMemo } from "react";

const Expenses = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedDate, setSelectedDate] = useState(""); // ✅ Single date filter

  // ----------------------------
  // Get unique months from data
  // ----------------------------
  const months = useMemo(() => {
    const monthSet = new Set();
    data.forEach((item) => {
      const date = new Date(item.billDate);
      const month = date.toLocaleString("en-IN", {
        month: "short",
        year: "2-digit",
      });
      monthSet.add(month);
    });
    return [
      "All",
      ...Array.from(monthSet).sort((a, b) => new Date(a) - new Date(b)),
    ];
  }, [data]);

  // ----------------------------
  // Filter data based on selected month & selected date
  // ----------------------------
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const date = new Date(item.billDate);

      // Month filter
      const month = date.toLocaleString("en-IN", {
        month: "short",
        year: "2-digit",
      });
      if (selectedMonth !== "All" && month !== selectedMonth) return false;

      // Single date filter
      if (selectedDate && date.toISOString().split("T")[0] !== selectedDate)
        return false;

      return true;
    });
  }, [data, selectedMonth, selectedDate]);

  // ----------------------------
  // Total Summary by Type (filtered data)
  // ----------------------------
  const expenseSummary = filteredData.reduce(
    (acc, curr) => {
      switch (curr.billType) {
        case "Water":
          acc.water += Number(curr.amount);
          break;
        case "Electricity":
          acc.electricity += Number(curr.amount);
          break;
        case "Cleaning":
          acc.cleaning += Number(curr.amount);
          break;
        case "Repair":
          acc.damage += Number(curr.amount);
          break;
        case "Event":
          acc.event += Number(curr.amount);
          break;
        default:
          acc.other += Number(curr.amount);
          break;
      }
      return acc;
    },
    { water: 0, electricity: 0, cleaning: 0, damage: 0, event: 0, other: 0 }
  );

  const totalExpense = Object.values(expenseSummary).reduce((a, b) => a + b, 0);

  const typeCards = [
    { title: "Water Bill", value: `₹${expenseSummary.water}` },
    { title: "Electricity Bill", value: `₹${expenseSummary.electricity}` },
    { title: "Cleaning", value: `₹${expenseSummary.cleaning}` },
    { title: "Damage/Repair", value: `₹${expenseSummary.damage}` },
    { title: "Event", value: `₹${expenseSummary.event}` },
    { title: "Other", value: `₹${expenseSummary.other}` },
    { title: "Total Expense", value: `₹${totalExpense}` },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Society Expenses
      </h1>

      {/* --------------------- */}
      {/* Top Filter Bar */}
      {/* --------------------- */}
      <div className="flex flex-col md:flex-row justify-end items-center mb-6 gap-4">
        {/* Month Filter */}
        <select
          className="border px-4 py-2 rounded-lg"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month, idx) => (
            <option key={idx} value={month}>
              {month}
            </option>
          ))}
        </select>

        {/* Single Date Filter */}
        <input
          type="date"
          className="border px-4 py-2 rounded-lg"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* --------------------- */}
      {/* Total Summary Cards */}
      {/* --------------------- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {typeCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition"
          >
            <p className="text-gray-600 font-medium">{card.title}</p>
            <p className="text-lg font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* --------------------- */}
      {/* Expense Table */}
      {/* --------------------- */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700 text-sm">
            <tr>
              <th className="p-3 border">Expense Type</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Mode</th>
              <th className="p-3 border">Remarks</th>
              <th className="p-3 border">Proof</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr
                key={i}
                className="text-center text-sm hover:bg-gray-50 transition"
              >
                <td className="p-3 border">{row.billType}</td>
                <td className="p-3 border">₹{row.amount}</td>
                <td className="p-3 border">
                  {new Date(row.billDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })}
                </td>
                <td className="p-3 border">{row.paymentMethod}</td>
                <td className="p-3 border">{row.description || "-"}</td>
                <td className="p-3 border">
                  {row.billProof ? (
                    <a
                      href={`http://localhost:5000/${row.billProof.replace(
                        /\\/g,
                        "/"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;
