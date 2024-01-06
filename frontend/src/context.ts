import React from 'react';
import { ExpenseListProps } from './types';

export const ExpensesListContext = React.createContext<ExpenseListProps[]>([]);