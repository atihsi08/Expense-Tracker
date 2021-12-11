//Reducer => function that takes in the old state and action => new state (action => how we want to change the state and it is a plane object which has two things -> type of action and payload(additional data to pass over with action))

const contextReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            const transactions = [action.payload, ...state];
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions;
        case 'DELETE_TRANSACTION':
            const newTransactions = state.filter((transaction) => transaction.id !== action.payload);
            localStorage.setItem('transactions', JSON.stringify(newTransactions));
            return newTransactions;
        default:
            return state;
    }
}

export default contextReducer;