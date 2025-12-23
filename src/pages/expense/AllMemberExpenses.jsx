import { useState, useMemo, useEffect } from "react";
import axios from "axios";

const AllMemberExpenses = () => {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedDate, setSelectedDate] = useState(""); // ✅ Single date filter
  const [allExpenses, setAllExpenses] = useState([]);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/member/getExpense", {
          withCredentials: true,
        });

        if (res.status === 200 && res.data.success) {
          setAllExpenses(res.data.expenses);
          console.log("Expenses:", res.data.expenses);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    getExpenses();
  }, []);

  // ----------------------------
  // Get unique months from data
  // ----------------------------
  const months = useMemo(() => {
    const monthSet = new Set();
    allExpenses.forEach((item) => {
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
  }, [allExpenses]);

  // ----------------------------
  // Filter data based on selected month & selected date
  // ----------------------------
  const filteredData = useMemo(() => {
    return allExpenses.filter((item) => {
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
  }, [allExpenses, selectedMonth, selectedDate]);

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
      {/* Top Filter Bar (responsive) */}
      {/* --------------------- */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center mb-6 gap-4 flex-wrap">
        {/* Month Filter */}
        <select
          className="border px-4 py-2 rounded-lg w-full sm:w-auto"
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
          className="border px-4 py-2 rounded-lg w-full sm:w-auto"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* --------------------- */}
      {/* Total Summary Cards (responsive) */}
      {/* --------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
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
      {/* Expense Table (responsive) */}
      {/* --------------------- */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
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

export default AllMemberExpenses;
