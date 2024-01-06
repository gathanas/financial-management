import { useEffect, useState } from 'react';
import { Expense, NewExpeseAction } from '../types';
import { requestCreateExpense, requestExpenses } from '../apis/baseRequest';

export const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string>('');

    const getExpenses = async () => {
        
        const [response,error] = await requestExpenses();

        setLoading(false);
        if(typeof error === "string"){setError(error)}; 
        setExpenses(response?.data as Expense[]);
    };

    useEffect(() => {
        getExpenses();
    },[])

    return { expenses,loading,error };
};

export default useExpenses;
