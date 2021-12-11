import { useContext } from "react";
import { ExpensetrackerContext } from './context/context.js';
import { incomeCategories, expenseCategories, resetCategories } from './constants/categories.js';

export const useTransactions = (title) => {
    
    resetCategories();

    const { transactions } = useContext(ExpensetrackerContext);
    const transactionPerType = transactions.filter(transaction => transaction.type === title);
    const total = transactionPerType.reduce((total, currTransaction) => total += currTransaction.amount, 0);
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    transactionPerType.forEach(transaction => {
        const category = categories.find(c => c.type === transaction.category);
        if (category) category.amount += transaction.amount;
    })

    const filteredCategories = categories.filter(c => c.amount > 0);

    const chartData = {
        labels: filteredCategories.map(c => c.type),
        datasets: [
            {
                data: filteredCategories.map(c => c.amount),
                backgroundColor: filteredCategories.map(c => c.color),
            }

        ],
    }

    return { total, chartData };
}