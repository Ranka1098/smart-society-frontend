import React, { useEffect, useState } from "react";
import axios from "axios";

const MemberMaitenancePaymet = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const getMaitenancePaymentDetail = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/singleMemberMaintenanceDetail",
          {
            withCredentials: true,
          }
        );
        setPayments(res.data.history);
      } catch (error) {
        console.error(error);
      }
    };

    getMaitenancePaymentDetail();
  }, []);

  const formatMonth = (month) => {
    const [year, m] = month.split("-");
    return new Date(year, m - 1).toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Maintenance Payment History
      </h2>

      {payments?.length === 0 ? (
        <p className="text-gray-500">No payment records found</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {payments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border p-5"
            >
              {/* Month */}
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-500">Month</span>
                <span className="font-medium">{formatMonth(item.month)}</span>
              </div>

              {/* Amount */}
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold text-lg">₹ {item.amount}</span>
              </div>

              {/* Payment Mode */}
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-500">Payment Mode</span>
                <span className="font-medium">{item.paymentMode || "-"}</span>
              </div>

              {/* Paid Date */}
              <div className="flex justify-between mb-4 text-sm">
                <span className="text-gray-500">Paid Date</span>
                <span className="font-medium">{formatDate(item.paidDate)}</span>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Status</span>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold
                    ${
                      item.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberMaitenancePaymet;
