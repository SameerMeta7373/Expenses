import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GlobalColors} from '../../constants/colors';

interface IExpenseSummary {
  PeriodName: string;
  expenses: [];
}

const ExpenseSummary: FC<IExpenseSummary> = ({expenses, PeriodName}) => {
  const ExpenseSum = expenses.reduce((sum, expense) => {
    return (sum + expense.amount);
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.Period}>{PeriodName}</Text>
      <Text style={styles.sum}>${ExpenseSum.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginBottom : 16,
    backgroundColor: GlobalColors.primaryHeader,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  Period: {
    fontSize: 16,
    color: GlobalColors.PrimaryFont,
  },
  sum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalColors.PrimaryFont,
    marginLeft: '50%',
  },
});
export default ExpenseSummary;
