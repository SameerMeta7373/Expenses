import { useContext } from 'react';
import { View } from 'react-native';
import ExpensesOutput from '../Components/Expenses/ExpensesOutput';
import { ExpenseContext } from '../Store/Exp-Context';

function AllExpenses() {
  const expensesCtx = useContext(ExpenseContext);

  return (
    <View style={{flex: 1}}>
      <ExpensesOutput
        expenses={expensesCtx.expenses}
        expensesPeriod="Total"
        message="No Expenses Found "
      />
    </View>
  );
}
export default AllExpenses;
