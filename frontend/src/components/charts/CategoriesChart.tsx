import React from 'react';
import BaseChart from './BaseChart';
import { useSelector } from 'react-redux';
import { Expense } from '../../types';

interface Props {
    // Define the props for your component here
}

const CategoriesChart: React.FC<Props> = (props) => {

    const {expenses,loading}  = useSelector((state:any) => state.expenses);

    if(loading) return <div>Loading...</div>

    //Get unique categories from expenses

    //Get the total amount for each category
    const groupedExpensesObject = Object.groupBy(
        expenses,
        ({ category }: Expense) => category
      );

    const groupedExpensesArray: [string, Expense[]][] = Object.entries(
        groupedExpensesObject
      );

    const categoryTotals = groupedExpensesArray.map(([category, expenses]) => {
        return {
            name:category,
            y: expenses.reduce((acc, expense) => acc + expense.amount, 0),
        };
      });

    return <BaseChart data={categoryTotals} title={'Spending By Category'}/>
};

export default CategoriesChart;
