import { useEffect, useState } from "react";
import axios from "axios";

const Notice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notices, setNotices] = useState([]); // ✅ NEW STATE
  const [isAdmin, setIsAdmin] = useState(null);

  // ✅ Create Notice
  const createNotice = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/createNotice",
        {
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        alert("Notice created successfully ✅");
        setTitle("");
        setDescription("");

        // ✅ refresh notices after create
        fetchNotices();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error creating notice ❌");
    }
  };

  const submitNotice = (e) => {
    e.preventDefault();
    createNotice();
  };

  // ✅ Get Notices
  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/getNotice", {
        withCredentials: true,
      });

      setNotices(res.data.notices); // ✅ backend se aaya data
      console.log("notice detail", res.data);
    } catch (error) {
      console.log("Get Notice Error:", error);
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/deleteNotice/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Notice deleted ✅");
        fetchNotices(); // refresh list
      }
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed ❌");
    }
  };
  const getadmin = async () => {
    const res = await axios.get("http://localhost:5000/getAdminDetails", {
      withCredentials: true,
    });
    setIsAdmin(res);
  };
  // ✅ Load on page open
  useEffect(() => {
    getadmin();
    fetchNotices();
  }, []);

  return (
    <div className="p-6 mx-auto space-y-6">
      {/* ✅ Add Notice Form */}
      <form onSubmit={submitNotice} className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Add Notice</h2>

        <input
          className="border p-3 w-full mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border p-3 w-full mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add Notice
        </button>
      </form>

      {/* ✅ Notices List */}
      <div className="grid md:grid-cols-2 gap-4 mt-3 latest-notice-wrapper">
        {notices.map((notice, index) => (
          <div
            key={notice._id}
            className="relative bg-white p-4 rounded shadow border"
          >
            {/* 🔥 LATEST TAG */}
            {index === 0 && (
              <span
                className="absolute -top-3 left-3 bg-blue-500 text-white 
text-[10px] font-semibold px-3 py-1 rounded-full shadow-md border border-white"
              >
                LATEST
              </span>
            )}

            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-base md:text-lg text-gray-800">
                  {notice.title}
                </h3>

                <p className="text-[11px] text-gray-400 mt-1">
                  {new Date(notice.createdAt).toLocaleString("en-IN")}
                </p>
              </div>

              {/* ✅ ADMIN DELETE BUTTON */}
              {isAdmin && (
                <button
                  onClick={() => deleteNotice(notice._id)}
                  className="text-red-500 text-xs font-medium hover:text-red-600"
                >
                  Delete
                </button>
              )}
            </div>

            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Message:</span>{" "}
              {notice.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
