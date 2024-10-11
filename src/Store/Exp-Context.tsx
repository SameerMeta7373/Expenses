import {Children, createContext, useReducer} from 'react';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
  setExpense: () => {},
});

function expensesReducer(state: Expense[], action: any) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];

    case 'SET':
      return action.payload;

    case 'UPDATE':
      const updateExpenseId = state.findIndex(
        expense => expense.id === action.payload.id,
      );

      const updatableExpense = state[updateExpenseId];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updateExpenseId] = updatedItem;
      return updatedExpenses;

    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);

    default:
      return state;
  }
}

export const ExpensesContextProvider = ({children}) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }

  function setExpenses(expenses) {
    console.log('Expenses from set Ex', expenses);

    dispatch({type: 'SET', payload: expenses});
  }

  function deleteExpense(id: Expense[]) {
    dispatch({type: 'DELETE', payload: id});
  }
  function updateExpense(id: Expense[], expenseData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  }

  const values = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
  );
};
