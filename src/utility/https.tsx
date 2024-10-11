import axios from 'axios';
import {Expense} from '../Store/Exp-Context';

const URL = 'https://react-native-d910f-default-rtdb.firebaseio.com/';

export async function storeExpense(expenseData: Expense) {
  const response = await axios.post(URL + '/expenses.json', expenseData);
  const id = response.data.name;
  return id;
}

export async function GetExpense() {
  try {
    const response = await axios.get(URL + '/expenses.json');
    const expenses = [];

    for (const key in response.data) {
      const expensesObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };

      expenses.push(expensesObj);

      return expenses;
    }
  } catch (error) {
    console.log('Error :: ', error);
    return false;
  }
}

export function UpdateExpense(id, expenseData) {
  return axios.put(URL + `/expenses/${id}.json`, expenseData);
}

export function DeleteExpense(id) {
  return axios.delete(URL + `/expenses/${id}.json`);
}
