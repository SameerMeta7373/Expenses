import {FC, useContext, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import IconButton from '../Components/UI/Buttons/IconButton';
import AddForm from '../Components/ManageExpense/AddForm';
import {GlobalColors} from '../constants/colors';
import {ExpenseContext} from '../Store/Exp-Context';
import {DeleteExpense, storeExpense, UpdateExpense} from '../utility/https';
import Loading from '../Components/UI/Loading';
import ErrorOverlay from '../Components/UI/ErrorOverLay';

interface IManageExpenses {
  route: any;
  navigation: any;
}

const ManageExpenses: FC<IManageExpenses> = ({route, navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | number | any>();

  const expensesCtx = useContext(ExpenseContext);
  const editedId = route?.params?.expenseId;
  const isEditing = !!editedId;

  const selectedItem = expensesCtx.expenses.find(
    expense => expense?.id === editedId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit' : 'Add',
    });
  }, [navigation, isEditing]);

  function deleteExpense() {
    setIsSubmitting(true);
    try {
      DeleteExpense(editedId);
      expensesCtx.deleteExpense(editedId);
      navigation.goBack();
    } catch (error) {
      setError('An error Occured Could Not Delete !');
      setIsSubmitting(false);
    }
  }
  function cancelButton() {
    navigation.goBack();
  }
  async function confirmButton(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedId, expenseData);
        UpdateExpense(editedId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      setError('An error Occured Could Not Save !');
      setIsSubmitting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }
  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.rootConatiner}>
      <View style={styles.container}>
        <View>
          <AddForm
            submitButton={isEditing ? 'Update' : 'Add'}
            onSubmit={confirmButton}
            cancel={cancelButton}
            defaultValue={selectedItem}
          />
        </View>
        {isEditing ? (
          <View style={styles.deleteContainer}>
            <IconButton
              name="trash"
              color="red"
              size={35}
              onPress={deleteExpense}
            />
          </View>
        ) : (
          <View style={styles.deleteContainer}>
            <IconButton
              name="close"
              color="red"
              size={30}
              onPress={() => navigation.navigate('AllExpenses')}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootConatiner: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  container: {
    margin: 30,
    padding: 20,
    backgroundColor: GlobalColors.PrimaryBackGround,
  },
  deleteContainer: {
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: GlobalColors.primaryHeader,
    alignItems: 'center',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100%',
    marginBottom: 40,
  },
});
export default ManageExpenses;
