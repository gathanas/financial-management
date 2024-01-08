import React, { useEffect } from "react";
import { Expense } from "../../types";
import ExpensesList from "../layout/ExpensesList";
import { useSelector, useDispatch } from 'react-redux'
import { getExpenses } from "../../expensesSlice";

interface ExpenseDateGroupProps {
  // Define the props for your component here
}

const ExpenseDateGroup: React.FC<ExpenseDateGroupProps> = () => {

    const {expenses,loading,error} = useSelector((state:any) => state.expenses)
    const dispatch = useDispatch()


    useEffect(()=>{

        dispatch<any>(getExpenses())

    },[])
    


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;



  //@ts-ignore groupBy is not suported by TS
  const groupedExpensesObject = Object.groupBy(
    expenses,
    ({ date }: Expense) => date.split('T')[0]
  );

  const groupedExpensesArray: [string, Expense[]][] = Object.entries(
    groupedExpensesObject
  );

  return (
    <div className="expenses-info">
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
