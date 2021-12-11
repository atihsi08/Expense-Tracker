import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer.js';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpensetrackerContext = createContext(initialState);

export const Provider = ({ children }) => {

    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    const balance = transactions.reduce((acc, currVal) => currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount, 0);

    return (
        <ExpensetrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance,
        }}>
            {children}
        </ExpensetrackerContext.Provider>
    )
}