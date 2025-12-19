import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="w-[400px] bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          🏢 Smart Society
        </h1>

        <div className="flex flex-col gap-4 w-full">
          <Link to={"/societyMemberForm"}>
            <button className="w-full py-3 rounded-xl font-semibold text-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
              Society member Join Building
            </button>
          </Link>

          <Link to={"/buildingForm"}>
            <button className="w-full py-3 rounded-xl font-semibold text-lg text-white bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg">
              Admin Create Building
            </button>
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          Select an option to continue 🚀
        </p>
        <p className="text-center text-sm text-gray-600 mt-4">
          Allready have account.{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
