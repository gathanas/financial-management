import React from 'react';
import {useExpenses} from '../hooks/useExpenses';
import { ExpensesListContext } from '../context';

interface MenuWrapperProps {
    children: React.ReactNode;
}

const MenuWrapper: React.FC<MenuWrapperProps> = ({ children }) => {

    const { expenses, loading,error } = useExpenses();

    return (
        <ExpensesListContext.Provider value={{expenses,loading,error}}>
        <div className="menu-wrapper">
            {children}
        </div>
        </ExpensesListContext.Provider>
    );
};

export default MenuWrapper;
