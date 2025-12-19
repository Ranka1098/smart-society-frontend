import { useEffect, useState } from "react";
import axios from "axios";
import Expenses from "../member/Expenses";

const ExpenceDetail = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getExpense", {
          withCredentials: true, // 🟢 Send adminToken cookie
        });

        if (res.status === 200 && res.data.success) {
          setExpenses(res.data.expenses);
          console.log("Expenses:", res.data.expenses);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    getExpenses();
  }, []);

  return (
    <div>
      <Expenses data={expenses} />
    </div>
  );
};

export default ExpenceDetail;
