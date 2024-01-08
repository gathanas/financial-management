import React from "react";
import { Expense } from "../../types";
import { removeExpense } from "../../expensesSlice";
import { useDispatch } from "react-redux";
import useDeleteExpense from "../../hooks/useDeleteExpense";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const ExpenseItem: React.FC<{ expense: Expense }> = ({ expense }) => {
  const { deleteExpense, loading } = useDeleteExpense();

  const dispatch = useDispatch();

  const onRemove = async () => {
    const [_, error] = await deleteExpense(expense.id);

    if (!error) {
      dispatch(removeExpense(expense.id));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="expense-item">
      <div className="mr-3" style={{display:"flex",width:'100%',justifyContent:"space-between"}}>
        <div>{expense.description}</div>
        <span>{` - `}</span>
        <div>{expense.amount}</div>
        <span> - </span>
        <div>{expense.price / 100}€</div>
      </div>
      <button onClick={onRemove}>
        <DeleteForeverIcon />
      </button>
    </div>
  );
};

export default ExpenseItem;
