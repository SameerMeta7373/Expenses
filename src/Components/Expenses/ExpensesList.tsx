import {Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ExpenseItem from './ExpenseItem';

function RenderExpense(itemdata : any) {
  
  return <ExpenseItem {...itemdata.item}/>
}

function ExpensesList({expenses}: any) {
  return (
    <FlatList
      data={expenses}
      renderItem={RenderExpense}
      keyExtractor={itemdata => itemdata.id}
      
    />
  );
}
export default ExpensesList;
