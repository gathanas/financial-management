import React from "react";
import { Expense } from "../../types";
import useExpenses from "../../hooks/useExpenses";
import ExpensesList from "../layout/ExpensesList";

interface ExpenseDateGroupProps {
  // Define the props for your component here
}

const ExpenseDateGroup: React.FC<ExpenseDateGroupProps> = () => {
  const { expenses, loading, error } = useExpenses();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  
  const groupedExpensesObject = Object.groupBy(
    expenses,
    ({ date }: Expense) => date
  );

  const groupedExpensesArray: [string, Expense[]][] = Object.entries(
    groupedExpensesObject
  );

  return (
    <div>
      {groupedExpensesArray.map(([date, expenses]) => {

        const dateObject = new Date(date);

        const dateString = dateObject.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <div key={date}>
            <h2>{dateString}</h2>
            <ExpensesList expenses={expenses} error={error} loading={loading} />
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseDateGroup;
