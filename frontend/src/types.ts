import { AxiosResponse } from "axios";
import { InputHTMLAttributes } from "react";

export type Category = 'food' | 'transport' | 'housing' | 'other';

export interface Expense {
  id: number;
  description: string;
  amount: number;
  price: number;
  date: Date | string;
  category: Category;
  mediaOfPayment: string;
}

export interface Expenses {
  expenses: Expense[];
}

export interface ExpenseInputChangeProps<Value = any> {
  (input: { value: Value; label?: string; name: string }): void;
}

export interface ExpenseInputProps<Value = any>
  extends Omit<FieldInputProps, "onChange" | "value" | "defaultValue"> {
  onChange: ExpenseInputChangeProps<Value>;
  name:string;
  value:Value;
  defaultValue?:Value;
}

export interface FieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  darkMode?: boolean;
  label?: string;
}

export interface NewExpenseSectionProps {
  onSubmit: NewExpeseAction;
}

export type NewExpense = Omit<Expense, "id">;

export type NewExpeseAction = (expense: NewExpense) => Promise<[any,boolean]>;

export type RequestExpenses<Input = any> = (input?:Input) => ReturnType<BaseRequest<Expense[]>>;

export type BaseRequest<Data = any[]> = (url: string, method?: string, data?: any) => Promise<[AxiosResponse<Data>, null] | [null,Error]>


export interface ExpenseListProps {
    expenses: Expense[];
    month: string;
}
export interface NumberInputProps extends ExpenseInputProps {
  min?: number;
  max?: number;
  step?: number;
  name:string;
}