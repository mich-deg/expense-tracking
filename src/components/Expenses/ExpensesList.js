import React from "react";
import axios from "axios";

import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = (props) => {
  axios.get("http://localhost:3005/");
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }
  return (
    <ul className="expense-list">
      {props.items.map((expense) => (
        <ExpenseItem
          // key={expense.insertId}
          //id={expense.insertId}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
