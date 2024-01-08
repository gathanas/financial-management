// src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import expensesReducer from './expensesSlice.ts'

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
})