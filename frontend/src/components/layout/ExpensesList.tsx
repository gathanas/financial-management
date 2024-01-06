import React from 'react';
import { Expense } from '../../types';
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
    expenses:Expense[];
    error:string;
    loading:boolean;
}

const ExpensesList: React.FC<ExpensesListProps> = ({expenses,error,loading}) => {
    // Implement your component logic here

    if(loading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    if (!expenses || expenses.length===0) return <div>No expenses</div>

    return (
        <div className="expenses">
        {expenses.map((expense) => {
          return <ExpenseItem key={expense.id} expense={expense} />;
        })}
      </div>
    );
};

export default ExpensesList;
