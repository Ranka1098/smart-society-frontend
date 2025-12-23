import { useLocation, useNavigate } from "react-router-dom";
import Timer from "../../../component/Timer";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const AdminOtp = () => {
  const [otpfiled, setOptfiled] = useState(new Array(6).fill(""));
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const location = useLocation();
  const phone = location.state?.phone;

  // protect OTP page
  useEffect(() => {
    if (!phone) {
      navigate("/login", { replace: true });
    }
  }, [phone, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value.trim())) {
      return;
    }

    const copyOtp = [...otpfiled];
    copyOtp[index] = value.slice(-1);
    setOptfiled(copyOtp);
    if (value && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleKeydown = (e, index) => {
    const key = e.key;
    if (key === "ArrowLeft" && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (key === "ArrowRight" && index < otpfiled.length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (key === "Backspace") {
      const copyOtp = [...otpfiled];
      // If current input is empty, go to previous field
      if (copyOtp[index] === "") {
        if (index > 0) {
          inputRef.current[index - 1]?.focus();
        }
      } else {
        copyOtp[index] = "";
        setOptfiled(copyOtp);
      }
    }
  };

  const handleverifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/verifyAdminOtp", {
        phone: phone,
        otp: otpfiled.join(""),
      });

      if (res.status === 200) {
        alert(
          "Verification Successful! Building Code: " + res.data.buildingCode
        );
        navigate("/");
      }
    } catch (error) {
      // Reset OTP array
      setOptfiled(["", "", "", "", "", ""]);

      // Force UI update + focus
      setTimeout(() => {
        inputRef.current[0]?.focus();
      }, 10);
      alert(error.response?.data?.message || "Something went wrong");

      console.error(error);
    }
  };

  const handleResendClear = () => {
    setOptfiled(["", "", "", "", "", ""]);

    setTimeout(() => {
      inputRef.current[0]?.focus();
    }, 10);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="bg-white p-8 sm:p-7 md:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md">
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-blue-600 hover:underline"
        >
          Back
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-5 sm:mb-6">
          Verify OTP
        </h1>

        <div className="flex justify-center gap-2 sm:gap-3">
          {otpfiled.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleChange(e, index)}
              ref={(currentInput) => {
                inputRef.current[index] = currentInput;
              }}
              onKeyDown={(e) => handleKeydown(e, index)}
              className="
  w-10 h-10 
  sm:w-12 sm:h-12 
  md:w-14 md:h-14 
  border border-gray-300 
  rounded-md 
  text-center 
  text-lg sm:text-xl 
  font-semibold 
  focus:outline-none 
  focus:ring-2 
  focus:ring-purple-600 
  transition
"
            />
          ))}
        </div>
        <Timer phone={phone} onResend={handleResendClear} />

        <p className="text-center text-gray-600 mt-4">
          Enter the 6-digit OTP sent to your phone.
        </p>

        <button
          onClick={handleverifyOtp}
          className="w-full mt-6 bg-purple-700 text-white py-2 rounded-md font-semibold hover:bg-purple-800 transition-all duration-300"
        >
          Verify OTP
        </button>

        <p className="text-center text-sm text-gray-500 mt-3 ">
          not Logged in ?
          <span
            className="text-purple-700 ml-1 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            SignUp
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminOtp;
