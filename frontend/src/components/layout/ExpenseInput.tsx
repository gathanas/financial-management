import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NumberInput from "../inputs/NumberInput";
import { DateInput } from "../inputs/DateInput";
import { Expense, ExpenseInputChangeProps, NewExpense } from "../../types";
import TextInput from "../inputs/TextInput";
import useCreateExpense from "../../hooks/useCreateExpense";
import { addExpense } from "../../expensesSlice";
import { useDispatch } from "react-redux";
import PriceInput from "../inputs/PriceInput";
import Select from "react-select";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { InputLabel, Radio } from "@mui/material";
const initialState = {
  description: "",
  amount: 1,
  price: 1,
  date: new Date(),
  category: "other",
  mediaOfPayment: "card",
} as Expense;

const ExpenseInput: React.FC = () => {
  const [inputData, setInputData] = useState<NewExpense>(initialState);

  const dispatch = useDispatch();

  const { createExpense } = useCreateExpense();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [data, error] = await createExpense(inputData);

    console.log(data,!error);

    if (!error) {
      setInputData(initialState);
      dispatch(addExpense(data));
    }
  };

  const onInputChange: ExpenseInputChangeProps = ({ value, name }) => {
    setInputData({ ...inputData, [name]: value });
  };

  const onPaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputData({ ...inputData, mediaOfPayment: event.target.value });
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
        <PriceInput
          max={400}
          step={0.01}
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
          max={99}
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
      <div>
        <div className="payment-method--section">
          <InputLabel htmlFor="age-native-simple">
            Card
            <CreditCardIcon />
          </InputLabel>
          <Radio
            checked={inputData.mediaOfPayment === "card"}
            onChange={onPaymentMethodChange}
            value="card"
            name="radio-buttons"
            inputProps={{ "aria-label": "card" }}
          />
          <InputLabel htmlFor="age-native-simple">
            Cash
            <LocalAtmIcon />
          </InputLabel>
          <Radio
            checked={inputData.mediaOfPayment === "cash"}
            onChange={onPaymentMethodChange}
            value="cash"
            name="radio-buttons"
            inputProps={{ "aria-label": "B" }}
          />
        </div>
        <Select options={[{ label: "Other", value: "other" }]} />
      </div>
      <Button className="mt-4" type="submit">
        Add Expense
      </Button>
    </form>
  );
};

export default ExpenseInput;
