import { useEffect, useState } from "react";
import axios from "axios";

const CalculateMaintenance = () => {
  const [month, setMonth] = useState("");
  const [flatExpense, setFlatExpense] = useState("");
  const [shopExpense, setShopExpense] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [members, setMembers] = useState([]);

  const formatMonth = (monthValue) => {
    if (!monthValue) return "";
    const [year, m] = monthValue.split("-");
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return `${months[Number(m) - 1]}-${year}`;
  };

  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/allMembersList", {
          withCredentials: true,
        });

        const data = res.data.members.map((m) => ({
          id: m._id,
          number: m.memberType === "Flat" ? m.flatNo : m.shopNo,
          type: m.memberType,
          name:
            m.memberType === "Flat"
              ? m.status === "Owner"
                ? m.flatOwnerName
                : m.flatRenterName
              : m.status === "Owner"
              ? m.shopOwnerName
              : m.shopRenterName,
        }));

        setMembers(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllMembers();
  }, []);

  const flats = members.filter((m) => m.type === "Flat");
  const shops = members.filter((m) => m.type === "Shop");

  const calculateShare = (m) => {
    if (m.type === "Flat")
      return flats.length ? (flatExpense / flats.length).toFixed(2) : 0;
    return shops.length ? (shopExpense / shops.length).toFixed(2) : 0;
  };

  const handleCalculate = () => {
    if (!month || !flatExpense || !shopExpense) {
      alert("Month, Flat expense & Shop expense required");
      return;
    }
    setCalculated(true);
  };

  const sendNotifications = async () => {
    const payload = {
      month: formatMonth(month),
      members: members.map((m) => ({
        id: m.id,
        amount: calculateShare(m),
      })),
    };

    await axios.post(
      "http://localhost:5000/sendMaintenanceNotification",
      payload
    );

    alert("✅ Bills sent successfully");
    setCalculated(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        🏢 Society Maintenance Calculation
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Flat Expense ₹"
          value={flatExpense}
          onChange={(e) => setFlatExpense(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Shop Expense ₹"
          value={shopExpense}
          onChange={(e) => setShopExpense(e.target.value)}
          className="border p-2"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Calculate
      </button>

      {calculated && (
        <>
          <h2 className="text-md md:text-xl font-bold my-2 text-center">
            Maintenance List for {formatMonth(month)}
          </h2>
          {/* ✅ FLATS TABLE */}
          <h3 className="text-lg font-bold  mb-2">
            🏠 Flats <span> = {flats.length}</span>
          </h3>
          <table className="w-full border mb-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Flat No</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Maintenance Amount</th>
              </tr>
            </thead>
            <tbody>
              {flats.map((m) => (
                <tr key={m.id} className="text-center">
                  <td className="border p-2">{m.number}</td>
                  <td className="border p-2">{m.name}</td>
                  <td className="border p-2 font-semibold">
                    ₹{calculateShare(m)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* ✅ SHOPS TABLE */}
          <h3 className="text-lg font-bold mb-2">
            🏪 Shops <span> = {shops.length}</span>
          </h3>
          <table className="w-full border mb-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Shop No</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Maintenance Amount</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((m) => (
                <tr key={m.id} className="text-center">
                  <td className="border p-2">{m.number}</td>
                  <td className="border p-2">{m.name}</td>
                  <td className="border p-2 font-semibold">
                    ₹{calculateShare(m)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={sendNotifications}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            ✅ Approve & Send Bills
          </button>
        </>
      )}
    </div>
  );
};

export default CalculateMaintenance;
