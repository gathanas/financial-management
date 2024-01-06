import { useState } from 'react';
import { requestCreateExpense } from '../apis/baseRequest';
import { NewExpeseAction } from '../types';

const useCreateExpense = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createExpense:NewExpeseAction = async (expense) => {

        setLoading(true);
        setError(null);


        const [response,error] = await requestCreateExpense(expense);

        setLoading(false);
        if(response?.data !== undefined){
            //setExpenses(response.data);
            return true;
        }

        if(typeof error === "string"){
            setError(error)
            return false
        }

        return false;
       
    };

    return {  loading, error, createExpense };
};

export default useCreateExpense;
