import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaHome,
  FaStore,
  FaUserFriends,
  FaMoneyBill,
  FaExclamationTriangle,
} from "react-icons/fa";

const RightSideDashboard = () => {
  const [membersData, setMembersData] = useState([]);
  const [allExpense, setAllExpense] = useState([]);
  const [allMaintenance, setAllMaintenance] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7) // yyyy-mm
  );

  // ------------------ FETCH MEMBERS ------------------
  const getAllSocietyMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/allMembersList", {
        withCredentials: true,
      });
      setMembersData(res.data.members || []);
    } catch (err) {
      console.error("Error fetching members:", err);
      setMembersData([]);
    }
  };

  // ------------------ FETCH EXPENSE ------------------
  const getAllSocietyExpense = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/getExpense", {
        withCredentials: true,
      });
      setAllExpense(res.data.expenses || []);
      console.log("all society expense", res.data.expenses);
    } catch (err) {
      console.error("Error fetching expense:", err);
      setAllExpense([]);
    }
  };

  // ------------------ FETCH MAINTENANCE ------------------
  // ------------------ FETCH MAINTENANCE (FIXED) ------------------
  const getAllSocietyMaintenance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/getAllMemberMaintenancePaymentList?month=${currentMonth}`,
        { withCredentials: true }
      );
      console.log("maintenance", res.data.data);

      setAllMaintenance(res.data.data || []);
    } catch (err) {
      console.error("Error fetching maintenance:", err);
      setAllMaintenance([]);
    }
  };

  useEffect(() => {
    getAllSocietyMembers();
    getAllSocietyMaintenance(); // maintenance API ko currentMonth ke saath call karenge
  }, []);
  useEffect(() => {
    getAllSocietyExpense();
  }, [currentMonth]);

  // ------------------ MEMBERS SUMMARY ------------------
  const membersSummary = [
    {
      name: "Flat Owners",
      count: membersData.filter(
        (m) => m.memberType === "Flat" && m.status === "Owner"
      ).length,
      color: "from-blue-400 to-blue-600",
      icon: <FaHome />,
    },
    {
      name: "Flat Renters",
      count: membersData.filter(
        (m) => m.memberType === "Flat" && m.status === "Rent"
      ).length,
      color: "from-green-400 to-green-600",
      icon: <FaUserFriends />,
    },
    {
      name: "Shop Owners",
      count: membersData.filter(
        (m) => m.memberType === "Shop" && m.status === "Owner"
      ).length,
      color: "from-purple-400 to-purple-600",
      icon: <FaStore />,
    },
    {
      name: "Shop Renters",
      count: membersData.filter(
        (m) => m.memberType === "Shop" && m.status === "Rent"
      ).length,
      color: "from-orange-400 to-orange-600",
      icon: <FaUsers />,
    },
  ];

  // ------------------ BUDGET LOGIC (FIXED) ------------------

  // ✅ Current month expenses (FIXED)
  // Current month expenses
  // Current month expenses (fix for correct total)
  console.log("all expence", allExpense);
  const monthExpenses = allExpense.filter(
    (e) => e.billDate && e.billDate.slice(0, 7) === currentMonth
  );
  console.log("month expense ", monthExpenses);
  const totalExpected = monthExpenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  // ✅ Current month collection
  const totalCollection = allMaintenance
    .filter((m) => m.month === currentMonth && m.status === "Paid")
    .reduce((sum, m) => sum + (m.amount || 0), 0);

  // ✅ Pending (never negative)
  const totalPending =
    totalExpected > totalCollection ? totalExpected - totalCollection : 0;

  // ✅ Remaining balance (safe logic)
  const societyRemainingBalance = totalCollection - totalExpected;

  const budget = [
    {
      name: " Is mahine ka Total kharcha",
      amount: totalExpected.toLocaleString(),
      icon: <FaMoneyBill />,
    },
    {
      name: "Is mahine Total Collection",
      amount: totalCollection.toLocaleString(),
      icon: <FaMoneyBill />,
    },
    {
      name: "society ki pending amount",
      amount: totalPending.toLocaleString(),
      icon: <FaExclamationTriangle className="text-red-600" />,
    },
    {
      name:
        societyRemainingBalance > 0
          ? "Profit"
          : societyRemainingBalance < 0
          ? "Loss"
          : "No Profit No Loss",

      amount: Math.abs(societyRemainingBalance).toLocaleString(),

      icon: (
        <FaMoneyBill
          className={
            societyRemainingBalance > 0
              ? "text-green-600"
              : societyRemainingBalance < 0
              ? "text-red-600"
              : "text-red-500"
          }
        />
      ),

      textColor:
        societyRemainingBalance > 0
          ? "text-green-700"
          : societyRemainingBalance < 0
          ? "text-red-700"
          : "text-gray-700",
    },
  ];

  // ------------------ UI ------------------
  return (
    <div className="p-3 sm:p-4 w-full bg-gray-100 min-h-screen overflow-y-auto">
      {/* Society Balance */}
      <div className="flex justify-center mb-2">
        <p
          className={`text-sm sm:text-base md:text-xl font-semibold px-3 sm:px-4 py-2 rounded-xl shadow text-center text-white
    ${
      societyRemainingBalance < 0
        ? "bg-gradient-to-r from-red-500 to-red-700"
        : "bg-gradient-to-r from-green-500 to-emerald-600"
    }`}
        >
          Society Remaining Balance :
          <span className="font-bold">
            {" "}
            ₹ {societyRemainingBalance.toLocaleString()}
          </span>
        </p>
      </div>

      {/* Members */}
      <h2 className="text-lg text-center sm:text-xl md:text-2xl font-bold mb-2 text-gray-700">
        Society Members
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {membersSummary.map((item) => (
          <div
            key={item.name}
            className="bg-white  border shadow rounded-xl p-4"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">{item.name}</p>
              <div className="text-2xl">{item.icon}</div>
            </div>
            <p className="text-2xl font-bold mt-2">{item.count}</p>
            <div
              className={`mt-3 h-2 rounded-full bg-gradient-to-r ${item.color}`}
            ></div>
          </div>
        ))}
      </div>

      {/* Budget */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-700">
        Society Budget Overview ({currentMonth})
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {budget.map((item) => (
          <div
            key={item.name}
            className="bg-white shadow rounded-xl p-4 border"
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl text-green-600">{item.icon}</div>
              <p className="text-sm font-semibold">{item.name}</p>
            </div>
            <p className="text-xl font-bold mt-2 text-green-700">
              ₹ {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideDashboard;
