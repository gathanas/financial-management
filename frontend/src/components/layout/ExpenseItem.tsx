import React from "react";
import { Expense } from "../../types";

const ExpenseItem: React.FC<{ expense: Expense }> = ({ expense }) => {

  console.log(expense,'expense');

  return (
    <div className="expense-item">
      <div>{expense.description}</div>
      <div>{expense.amount}</div>
    </div>
  );
};

export default ExpenseItem;
