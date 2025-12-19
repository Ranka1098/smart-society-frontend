import React, { useEffect } from "react";
import axios from "axios";
import {
  FaUsers,
  FaHome,
  FaStore,
  FaUserFriends,
  FaMoneyBill,
  FaBell,
  FaExclamationTriangle,
} from "react-icons/fa";

const RightSideDashboard = () => {
  const members = [
    {
      name: "Flat Owners",
      count: 40,
      color: "from-blue-400 to-blue-600",
      icon: <FaHome />,
    },
    {
      name: "Flat Renters",
      count: 25,
      color: "from-green-400 to-green-600",
      icon: <FaUserFriends />,
    },
    {
      name: "Shop Owners",
      count: 15,
      color: "from-purple-400 to-purple-600",
      icon: <FaStore />,
    },
    {
      name: "Shop Renters",
      count: 8,
      color: "from-orange-400 to-orange-600",
      icon: <FaUsers />,
    },
  ];

  const budget = [
    {
      name: "Total Expected Balance",
      amount: "3,00,000",
      icon: <FaMoneyBill />,
    },
    { name: "Total Collection", amount: "1,80,000", icon: <FaMoneyBill /> },
    {
      name: "Total Pending (This Month)",
      amount: "70,000",
      icon: <FaExclamationTriangle />,
    },
    {
      name: "Society Remaining Balance",
      amount: "1,10,000",
      icon: <FaMoneyBill />,
    },
  ];

  const notices = [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 9 },
    { month: "Mar", count: 15 },
    { month: "Apr", count: 11 },
    { month: "May", count: 18 },
    { month: "Jun", count: 7 },
  ];

  const complaints = [
    { month: "Jan", count: 6 },
    { month: "Feb", count: 3 },
    { month: "Mar", count: 8 },
    { month: "Apr", count: 4 },
    { month: "May", count: 10 },
    { month: "Jun", count: 2 },
  ];

  const getAllSocietyMembers = async () => {
    const res = await axios.get("http://localhost:5000/allMembersList");
    console.log("res all society members", res.data);
  };

  useEffect(() => {
    getAllSocietyMembers();
  }, []);

  return (
    <div className="p-4 w-full bg-gray-100 h-screen overflow-hidden">
      {/* Society Balance */}
      <div className="flex justify-center mb-2">
        <p className="text-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl shadow">
          Society Remaining Balance :
          <span className="font-bold"> ₹ 1,10,000</span>
        </p>
      </div>

      {/* Members */}
      <h2 className="text-2xl font-bold mb-2 text-gray-700">Total Members</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {members.map((item) => (
          <div
            key={item.name}
            className="bg-white bg-opacity-80 backdrop-blur-xl border border-gray-200 shadow rounded-xl p-4"
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-700 text-sm font-semibold">{item.name}</p>
              <div className="text-2xl text-gray-600">{item.icon}</div>
            </div>

            <p className="text-3xl font-bold mt-2">{item.count}</p>

            <div
              className={`mt-3 w-full h-2 rounded-full bg-gradient-to-r ${item.color}`}
            ></div>
          </div>
        ))}
      </div>

      {/* Budget */}
      <h2 className="text-2xl font-bold mb-2 text-gray-700">
        Society Budget Overview
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {budget.map((item) => (
          <div
            key={item.name}
            className="bg-gradient-to-br from-gray-50 to-gray-100 shadow rounded-xl p-4 border border-gray-200"
          >
            <div className="flex items-center gap-2">
              <div className="text-2xl text-green-600">{item.icon}</div>
              <p className="text-gray-700 text-sm font-semibold">{item.name}</p>
            </div>

            <p className="text-xl mt-2 font-bold text-green-700">
              ₹ {item.amount}
            </p>
          </div>
        ))}
      </div>

      {/* Notices */}
      <h2 className="text-2xl font-bold mb-2 text-gray-700">
        Notices (Month Wise)
      </h2>
      <div className="bg-white shadow rounded-xl p-4 border border-gray-200 mb-4">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {notices.map((n) => (
            <div
              key={n.month}
              className="text-center p-3 bg-blue-50 rounded-lg"
            >
              <p className="text-gray-700 text-sm">{n.month}</p>
              <p className="text-xl font-bold text-blue-600">{n.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Complaints */}
      <h2 className="text-2xl font-bold mb-2 text-gray-700">
        Complaints (Month Wise)
      </h2>
      <div className="bg-white shadow rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {complaints.map((c) => (
            <div key={c.month} className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-gray-700 text-sm">{c.month}</p>
              <p className="text-xl font-bold text-red-600">{c.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSideDashboard;
