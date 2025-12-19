import { useState, useEffect } from "react";
import axios from "axios";

const Timer = ({ phone, onResend }) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) return;

    const oneMinuteTimer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(oneMinuteTimer);
  }, [timer]);

  const handleResend = async () => {
    setTimer(60);

    const res = await axios.post("http://localhost:5000/resendOtp", { phone });

    if (res.status === 200) {
      alert("OTP resent successfully");
      onResend(); // 🔥 parent ko bol do — clear OTP input
    }
  };

  return (
    <div className="text-center py-5 font-bold text-xl">
      {timer > 0 ? (
        <p className="text-gray-700 font-semibold">{timer} seconds remaining</p>
      ) : (
        <button
          onClick={handleResend}
          className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default Timer;
