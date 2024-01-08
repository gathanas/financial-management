import { useState } from 'react';
import { requestDeleteExpense } from '../apis/baseRequest';

const useDeleteExpense = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteExpense = async (expenseId: number) => {
        setIsLoading(true);
        setError(null);
        const [response, error] = await requestDeleteExpense(expenseId);

        setIsLoading(false);

        if (typeof error === "string") {
            setError(error)
            return [undefined, true]
        }
    
        return [response?.data, false];
    };

    return { loading:isLoading, error, deleteExpense };
};

export default useDeleteExpense;
