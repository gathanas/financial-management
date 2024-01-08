// src/reduxToolkitSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestExpenses } from './apis/baseRequest'
import { Expense } from './types'

export const getExpenses = createAsyncThunk(
  'GET_EXPENSES',
  async () => {
    const [data,error] = await requestExpenses()
    return [data?.data,error] as [any,Error]
  }
)

const initialState = {
  expenses: [] as Expense[],
  loading:true,
  error:false
}

export const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {

      console.log(state);

      //Sort by date and add at proper position
      const expense = action.payload as Expense;
      const expenses = state.expenses as Expense[];
      //Add expense to expenses based on date
      const index = expenses.findIndex((expense) => expense.date > action.payload.date)

      console.log("index",index)

      if(index === -1){
        return {...state,expenses:[...expenses,expense]}
      }
      else{
        return {...state,expenses:[...expenses.slice(0,index),expense,...expenses.slice(index)]}
        // expenses.splice(index,0,expense);
      }

    },
    removeExpense: (state, action) => {


      console.log("state",state);

      const id = action.payload
      const expenses = state.expenses

      return {...state,expenses:expenses.filter((expense) => expense.id !== id)}
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getExpenses.fulfilled, (state, action) => {
      // Add user to the state array

      const [expenseData,error] = action.payload

      if(error){
        return {
          ...state,
          error:true,
          loading:false
        }
      }
      else{

        return {
          ...state,
          expenses: expenseData === null?[]:expenseData,
          loading:false
        }
      }

    })
  },
})

export const { addExpense, removeExpense } = expenseSlice.actions

export default expenseSlice.reducer