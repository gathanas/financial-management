import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ExpensesScreen} from './components/screens/ExpensesScreen';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ExpensesScreen/>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
