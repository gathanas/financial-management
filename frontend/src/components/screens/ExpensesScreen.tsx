import React from "react";
import { PageWrapper } from "../PageWrapper";
import ExpenseInput from "../layout/ExpenseInput";
import ExpenseDateGroup from "../expense_list/ExpenseDateGroup";

export const ExpensesScreen: React.FC = () => {

  return (
    <PageWrapper>
      <div>
        <h1>Expenses Screen</h1>
        <div className="expense-wrapper">
        <ExpenseInput/>
        <ExpenseDateGroup/>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ExpensesScreen;
