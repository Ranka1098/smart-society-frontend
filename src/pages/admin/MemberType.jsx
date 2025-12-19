import React, { useEffect, useState } from "react";
import axios from "axios";
import FlatOwnerCard from "../../component/FlatOwnerCard";
import FlatRenterCard from "../../component/FlatRenterCard";
import ShopOwnerCard from "../../component/ShopOwnerCard";
import ShopRenterCard from "../../component/ShopRenterCard";

const MemberType = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [activeCategory, setActiveCategory] = useState("FlatOwner");

  // 🔥 Fetch all members
  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/allMembersList", {
          withCredentials: true,
        });
        console.log("all member list", res);
        setAllMembers(res.data.members);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMembers();
  }, []);

  const sortedMembers = [...allMembers].sort((a, b) => {
    const getSortValue = (item) => item.flatNo || item.shopNo || 0;
    return Number(getSortValue(a)) - Number(getSortValue(b));
  });

  // ✅ MEMBERS (residencyStatus REMOVED)
  const flatOwners = sortedMembers.filter(
    (m) => m.memberType === "Flat" && m.status === "Owner"
  );

  const flatRenters = sortedMembers.filter(
    (m) => m.memberType === "Flat" && m.status === "Rent"
  );

  const shopOwners = sortedMembers.filter(
    (m) => m.memberType === "Shop" && m.status === "Owner"
  );

  const shopRenters = sortedMembers.filter(
    (m) => m.memberType === "Shop" && m.status === "Rent"
  );

  // 🔍 SEARCH
  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResult(null);
      return;
    }

    const timer = setTimeout(() => {
      const result = allMembers.find(
        (m) => m.flatNo == searchText.trim() || m.shopNo == searchText.trim()
      );
      setSearchResult(result || "not_found");
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, allMembers]);

  // 🔹 Deleted member ko state se remove karne ke liye
  const handleMemberDelete = (id) => {
    setAllMembers((prevMembers) =>
      prevMembers.filter((member) => member._id !== id)
    );
    if (searchResult && searchResult._id === id) setSearchResult(null);
  };

  // 🔹 ACTIVE CATEGORY MEMBERS
  const getActiveMembers = () => {
    switch (activeCategory) {
      case "FlatOwner":
        return flatOwners;
      case "FlatRent":
        return flatRenters;
      case "ShopOwner":
        return shopOwners;
      case "ShopRent":
        return shopRenters;
      default:
        return [];
    }
  };

  return (
    <div className="p-6 h-screen overflow-auto">
      {/* 🔍 SEARCH */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Member</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Flat No or Shop No..."
          className="p-2 border rounded-lg w-72"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* 🔎 SEARCH RESULT */}
      {searchResult && searchResult !== "not_found" && (
        <div className="mb-6 bg-white shadow-md rounded-xl p-4 border w-[340px]">
          <h3 className="font-bold text-lg mb-2">Member Details</h3>

          {searchResult.memberType === "Flat" &&
            searchResult.status === "Owner" && (
              <FlatOwnerCard
                item={searchResult}
                onDelete={handleMemberDelete}
              />
            )}

          {searchResult.memberType === "Flat" &&
            searchResult.status === "Rent" && (
              <FlatRenterCard
                item={searchResult}
                onDelete={handleMemberDelete}
              />
            )}

          {searchResult.memberType === "Shop" &&
            searchResult.status === "Owner" && (
              <ShopOwnerCard
                item={searchResult}
                onDelete={handleMemberDelete}
              />
            )}

          {searchResult.memberType === "Shop" &&
            searchResult.status === "Rent" && (
              <ShopRenterCard
                item={searchResult}
                onDelete={handleMemberDelete}
              />
            )}
        </div>
      )}

      {searchResult === "not_found" && (
        <p className="text-red-500 font-semibold mb-4">No member found.</p>
      )}

      {/* 🔘 CATEGORY BUTTONS (STYLE SAME) */}
      <div className="flex gap-3 mb-6 sticky top-0 bg-gray-100 z-10 p-2">
        <button
          onClick={() => setActiveCategory("FlatOwner")}
          className={`px-4 py-2 rounded ${
            activeCategory === "FlatOwner"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Flat Owner ({flatOwners.length})
        </button>

        <button
          onClick={() => setActiveCategory("FlatRent")}
          className={`px-4 py-2 rounded ${
            activeCategory === "FlatRent"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Flat Rent ({flatRenters.length})
        </button>

        <button
          onClick={() => setActiveCategory("ShopOwner")}
          className={`px-4 py-2 rounded ${
            activeCategory === "ShopOwner"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Shop Owner ({shopOwners.length})
        </button>

        <button
          onClick={() => setActiveCategory("ShopRent")}
          className={`px-4 py-2 rounded ${
            activeCategory === "ShopRent"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Shop Rent ({shopRenters.length})
        </button>
      </div>

      {/* 🔵 MEMBERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {getActiveMembers().map((item) =>
          activeCategory === "FlatOwner" ? (
            <FlatOwnerCard
              key={item._id}
              item={item}
              onDelete={handleMemberDelete}
            />
          ) : activeCategory === "FlatRent" ? (
            <FlatRenterCard
              key={item._id}
              item={item}
              onDelete={handleMemberDelete}
            />
          ) : activeCategory === "ShopOwner" ? (
            <ShopOwnerCard
              key={item._id}
              item={item}
              onDelete={handleMemberDelete}
            />
          ) : (
            <ShopRenterCard
              key={item._id}
              item={item}
              onDelete={handleMemberDelete}
            />
          )
        )}
      </div>
    </div>
  );
};

export default MemberType;
