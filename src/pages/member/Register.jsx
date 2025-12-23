import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4 sm:px-6">
      <div
        className="
        w-full 
        max-w-sm 
        sm:max-w-md 
        md:max-w-lg 
        bg-white 
        shadow-2xl 
        rounded-2xl 
        p-6 
        sm:p-8 
        md:p-10 
        flex 
        flex-col 
        items-center
      "
      >
        {/* Logo / Title */}
        <h1
          className="
          text-2xl 
          sm:text-3xl 
          md:text-4xl 
          font-extrabold 
          text-gray-800 
          mb-4 
          sm:mb-6 
          text-center
        "
        >
          🏢 Smart Society
        </h1>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full">
          <Link to="/societyMemberForm">
            <button
              className="
              w-full 
              py-3 
              sm:py-3.5 
              md:py-4
              rounded-xl 
              font-semibold 
              text-sm 
              sm:text-base 
              md:text-lg 
              text-white 
              bg-blue-500 
              hover:bg-blue-600 
              transition-all 
              duration-300 
              shadow-md 
              hover:shadow-lg
            "
            >
              Society Member Join Building
            </button>
          </Link>

          <Link to="/buildingForm">
            <button
              className="
              w-full 
              py-3 
              sm:py-3.5 
              md:py-4
              rounded-xl 
              font-semibold 
              text-sm 
              sm:text-base 
              md:text-lg 
              text-white 
              bg-green-500 
              hover:bg-green-600 
              transition-all 
              duration-300 
              shadow-md 
              hover:shadow-lg
            "
            >
              Admin Create Building
            </button>
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-gray-500 text-xs sm:text-sm mt-5 sm:mt-6">
          Select an option to continue 🚀
        </p>

        <p className="text-center text-xs sm:text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
