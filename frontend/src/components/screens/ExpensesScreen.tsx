import React from "react";
import { PageWrapper } from "../PageWrapper";
import ExpenseInput from "../layout/ExpenseInput";
import ExpenseDateGroup from "../expense_list/ExpenseDateGroup";
import BaseChart from "../charts/BaseChart";
import CategoriesChart from "../charts/CategoriesChart";
import TypeOfPaymentChart from "../charts/TypeOfPaymentChart";

export const ExpensesScreen: React.FC = () => {
  return (
    <PageWrapper>
      <div>
        <h1>Expenses Screen</h1>
        <div className="expense-wrapper">
          <div>
            <ExpenseInput />
            <div>
              <TypeOfPaymentChart />
              <CategoriesChart />
            </div>
          </div>
          <ExpenseDateGroup />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ExpensesScreen;
