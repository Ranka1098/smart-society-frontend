import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyForgetPasswordOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // role, phone
  const { role, phone } = state || {};

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRef = useRef([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);

  // 🔄 Timer
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ❌ Direct access protection
  useEffect(() => {
    if (!role || !phone) {
      navigate("/forget-password");
    }
  }, [role, phone, navigate]);

  // 🔢 OTP change
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  // ⬅ Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  // ✅ VERIFY OTP
  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Enter complete OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/verify-otp", {
        role,
        phone,
        otp: enteredOtp,
      });

      if (res.status === 200) {
        alert("OTP verified successfully");

        navigate("/resetpassword", {
          state: { role, phone },
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND OTP
  const handleResend = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/resend-forgetpassword-otp", {
        role,
        phone,
      });

      setOtp(new Array(6).fill(""));
      setTimeLeft(60);
      inputRef.current[0].focus();

      alert("OTP resent successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          🔐 Verify OTP
        </h2>

        <p className="text-center text-gray-600 mb-4">
          OTP sent to <span className="font-semibold">{phone}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-center text-sm text-gray-600 mb-4">
          {timeLeft > 0 ? (
            <>
              OTP expires in{" "}
              <span className="font-semibold text-red-500">{timeLeft}s</span>
            </>
          ) : (
            <span className="text-red-500">OTP expired</span>
          )}
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={timeLeft === 0 || loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Please wait..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <p
          onClick={timeLeft === 0 && !loading ? handleResend : undefined}
          className={`text-center text-sm mt-4 ${
            timeLeft === 0
              ? "text-blue-500 cursor-pointer hover:underline"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Resend OTP
        </p>

        <p
          onClick={() => navigate("/forget-password")}
          className="text-center text-sm text-blue-500 hover:underline cursor-pointer mt-3"
        >
          Back
        </p>
      </div>
    </div>
  );
};

export default VerifyForgetPasswordOtp;
