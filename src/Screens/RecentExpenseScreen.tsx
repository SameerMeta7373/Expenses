import {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import ExpensesOutput from '../Components/Expenses/ExpensesOutput';
import Loading from '../Components/UI/Loading';
import {ExpenseContext} from '../Store/Exp-Context';
import {getRecent} from '../utility/date';
import {GetExpense} from '../utility/https';
import ErrorOverlay from '../Components/UI/ErrorOverLay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | number | any>();

  const expensesCtx = useContext(ExpenseContext);
  // const [fetchedExpense, setFetchedExpense] = useState<Expense[]>([]);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await GetExpense();
        expensesCtx.setExpense(expenses);
      } catch (error) {
        setError('Could Not Get Data ! ');
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <Loading />;
  }

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const Days7Ago = getRecent(today, 7);

    return expense?.date >= Days7Ago && expense?.date <= today;
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 Days"
        message="No Recent Expenses"
      />
    </View>
  );
}
export default RecentExpenses;
