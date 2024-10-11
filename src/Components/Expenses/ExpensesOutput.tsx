import {StyleSheet, Text, TextInput, View} from 'react-native';
import ExpenseSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import {GlobalColors} from '../../constants/colors';
import {useContext, useState} from 'react';
import {Expense, ExpenseContext} from '../../Store/Exp-Context';
import Search from '../Search';

function ExpensesOutput({expenses, expensesPeriod, message}: any) {
  let content = <Text style={styles.message}>{message}</Text>;

  const contextExp = useContext(ExpenseContext);

  const [searchItem, setSearchItem] = useState('');

  let searchExpense: Expense[] = [];

  if (searchItem !== '') {
    searchExpense = contextExp.expenses.filter(expenses =>
      expenses.description.toLowerCase().includes(searchItem.toLowerCase()),
    );
  }

  if (expenses.length > 0) {
    content = (
      <ExpensesList
        expenses={searchExpense.length > 0 ? searchExpense : expenses}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} PeriodName={expensesPeriod} />
      <Search searchItem={searchItem} onSearch={setSearchItem} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: GlobalColors.PrimaryBackGround,
    flex: 1,
  },
  message: {
    color: GlobalColors.PrimaryFont,
    fontSize: 24,
    textAlign: 'center',
    marginTop: '50%',
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    margin: 8,
    marginBottom: 20,
    fontSize: 20,
  },
});
export default ExpensesOutput;
