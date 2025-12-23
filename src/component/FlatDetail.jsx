import { useNavigate } from "react-router-dom";

const FlatDetail = () => {
  const flatDetails = {
    flatId: "A-101",
    residentType: "Rented", // Owner / Rented
    fullName: "Rajesh Kumar",
    phone: "9876543210",
    staySince: "01 Jan 2022",
    family: {
      total: 5,
      men: 2,
      women: 2,
      kids: 1,
    },
  };

  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="p-6 w-full flex flex-col items-center bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
        {/* Back Button */}
        <div className="w-full max-w-lg mb-4">
          <button
            onClick={() => navigate("/")} // 👈 homepage par le jayega
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            ← Back
          </button>
        </div>

        {/* Card */}
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 space-y-4">
          {/* Flat ID & Resident */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-bold text-gray-800">
              Flat ID: {flatDetails.flatId}
            </h2>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                flatDetails.residentType === "Owner"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {flatDetails.residentType}
            </span>
          </div>

          {/* Name & Phone */}
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">Full Name:</span>{" "}
              {flatDetails.fullName}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> {flatDetails.phone}
            </p>
            {flatDetails.residentType === "Rented" && (
              <p className="text-gray-700">
                <span className="font-semibold">Staying Since:</span>{" "}
                {flatDetails.staySince}
              </p>
            )}
          </div>

          {/* Family Details */}
          <div className="border-t pt-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Family Details
            </h3>
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <p>
                <span className="font-semibold">Total Members:</span>{" "}
                {flatDetails.family.total}
              </p>
              <p>
                <span className="font-semibold">Men:</span>{" "}
                {flatDetails.family.men}
              </p>
              <p>
                <span className="font-semibold">Women:</span>{" "}
                {flatDetails.family.women}
              </p>
              <p>
                <span className="font-semibold">Kids:</span>{" "}
                {flatDetails.family.kids}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatDetail;
