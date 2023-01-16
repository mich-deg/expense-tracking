import React from "react";

import useInput from "../hooks/useInput";
import "./ExpenseForm.css";
import axios from "axios";

// const axios = require("axios").default;

const ExpenseForm = (props) => {
  //Checking Input for Title field
  const {
    value: enteredTitle,
    isValid: enteredTitleisValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "");

  //Checking Input for Amount field
  const {
    value: enteredAmount,
    isValid: enteredAmountisValid,
    hasError: amountInputHasError,
    valueChangeHandler: amountChangeHandler,
    valueBlurHandler: amountBlurHandler,
    reset: resetAmountInput,
  } = useInput((value) => value.trim() !== "");

  //Checking Input for Date field
  const {
    value: enteredDate,
    isValid: enteredDateisValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangeHandler,
    valueBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (enteredTitleisValid && enteredAmountisValid && enteredDateisValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    //double check overall form validity
    if (!formIsValid) {
      return;
    }

    console.log("submitted");
    // //expense data

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    axios
      .post("http://localhost:3005/expenses/add", expenseData)
      .then(() => {
        alert("Success");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(expenseData);
    props.onSaveExpenseData(expenseData);
    resetTitleInput();
    resetAmountInput();
    resetDateInput();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Item-Name</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
            />
            {titleInputHasError && (
              <p className="error__text">Title must not be empty.</p>
            )}
          </div>
          <div className="new-expense__control">
            <label>Total-Price</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
              onBlur={amountBlurHandler}
            />
            {amountInputHasError && (
              <p className="error__text">Amount must not be empty.</p>
            )}
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2019-01-01"
              step="2022-12-31"
              value={enteredDate}
              onChange={dateChangeHandler}
              onBlur={dateBlurHandler}
            />
            {dateInputHasError && (
              <p className="error__text">Date must not be empty.</p>
            )}
          </div>
        </div>
        <div className="new-expense__actions">
          <button disabled={!formIsValid} typpe="submit">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
