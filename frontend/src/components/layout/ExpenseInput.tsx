import React, { useState } from "react";
import { priceUIToStorage } from "../../functions/handleNumbersForAccuracy";
import { Button } from "react-bootstrap";
import NumberInput from "../inputs/NumberInput";
import { DateInput } from "../inputs/DateInput";
import {
  ExpenseInputChangeProps,
  NewExpense,
} from "../../types";
import TextInput from "../inputs/TextInput";
import useCreateExpense from "../../hooks/useCreateExpense";

const initialState = {
  description: "",
  amount: 0,
  price: 0,
  date: null,
};

const ExpenseInput: React.FC = () => {
  const [inputData, setInputData] = useState<NewExpense>(initialState);


  const { createExpense } = useCreateExpense()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { description, amount, date, price } = inputData;

    const newExpense: NewExpense = {
      description: description,
      amount: priceUIToStorage(amount),
      date: date,
      price: price,
    };

    const success = await createExpense(newExpense);

    if (success) {
      setInputData(initialState);
    }
  };

  const onInputChange: ExpenseInputChangeProps = ({ value, name }) => {
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <TextInput
        label={"Description"}
        placeholder="Description"
        value={inputData.description}
        onChange={onInputChange}
        name={"description"}
      />
      <div className="details-fields">
        <NumberInput
          label={"Price"}
          value={inputData.price}
          onChange={onInputChange}
          name={"price"}
        />
        <NumberInput
          label={"Amount"}
          style={{ width: "80px" }}
          placeholder="Amount"
          value={inputData.amount}
          step={1}
          min={1}
          max={100}
          type={"number"}
          onChange={onInputChange}
          name={"amount"}
        />
        <DateInput
          label={"Date"}
          name={"date"}
          onChange={onInputChange}
          value={inputData.date}
        />
      </div>
      <Button className="mt-4" type="submit">
        Add Expense
      </Button>
    </form>
  );
};

export default ExpenseInput;
