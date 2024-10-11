import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FC} from 'react';
import {GlobalColors} from '../../constants/colors';
import GetFormatDate from '../../utility/date';
import {NavigationAction, useNavigation} from '@react-navigation/native';

interface IExpenseItem {
  description: string;
  date: Date;
  amount: number;
  route: any;
  navigation: NavigationAction;
  props: any;
  id: number;
}

const ExpenseItem: FC<IExpenseItem> = ({id, description, date, amount}) => {
  const navigation = useNavigation();

  const PressHandler = () => {
    navigation.navigate('ManageExpenses', {
      expenseId: id,
    });
  };

  return (
    <Pressable
      style={({pressed}) => pressed && styles.Pressed}
      onPress={PressHandler}>
      <View style={styles.expenseItem}>
        <View style={{flex: 1}}>
          <Text style={[styles.description, styles.text]}>{description}</Text>
          <Text style={styles.text}>{GetFormatDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount?.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 4,
    margin: 8,
  },

  text: {
    color: GlobalColors.PrimaryFont,
  },
  description: {
    fontSize: 18,
    marginBottom: 5,
    padding: 10,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#379e37',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    minWidth: 80,
    elevation: 14,
  },
  amount: {
    color: GlobalColors.primaryWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
  Pressed: {
    opacity: 0.75,
  },
});
export default ExpenseItem;
