import React from "react";
import {
  FaBroom,
  FaTrash,
  FaVolumeMute,
  FaCar,
  FaUserCheck,
  FaUserShield,
  FaDog,
  FaTint,
  FaMoneyBillWave,
  FaBan,
  FaHandshake,
  FaSmile,
} from "react-icons/fa";

const SocietyRules = () => {
  const rules = [
    { text: "Society ke common areas ko saaf rakhein.", icon: <FaBroom /> },
    { text: "Kachra sirf dustbin me hi daalein.", icon: <FaTrash /> },
    {
      text: "Raat 10 baje ke baad loud music ya noise na karein.",
      icon: <FaVolumeMute />,
    },
    {
      text: "Apni gaadi sirf assigned parking me park karein.",
      icon: <FaCar />,
    },
    {
      text: "Visitors ka entry record security me karayein.",
      icon: <FaUserCheck />,
    },
    {
      text: "Unknown logon ko bina verify kiye entry na dein.",
      icon: <FaUserShield />,
    },
    {
      text: "Pets ko leash ke saath rakhein aur unka waste clean karein.",
      icon: <FaDog />,
    },
    {
      text: "Paani aur bijli ka misuse na karein.",
      icon: <FaTint />,
    },
    {
      text: "Maintenance time par pay karein.",
      icon: <FaMoneyBillWave />,
    },
    {
      text: "Society property ko nuksaan pahunchana mana hai.",
      icon: <FaBan />,
    },
    {
      text: "Kisi se bhi badtameezi ya ladai-jhagda na karein.",
      icon: <FaHandshake />,
    },
    {
      text: "Society ka mahaul shaant aur friendly rakhein.",
      icon: <FaSmile />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🏢 Society Rules & Guidelines
      </h2>

      {/* Rules Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <div className="text-blue-600 text-xl mt-1">{rule.icon}</div>

            <p className="text-gray-700 leading-relaxed">{rule.text}</p>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-sm text-blue-700">
          ⚠️ Ye rules sabhi members aur unke guests ke liye lagu hain. Society
          ka mahaul safe, clean aur peaceful rakhne ke liye sabka sahyog zaroori
          hai.
        </p>
      </div>
    </div>
  );
};

export default SocietyRules;
