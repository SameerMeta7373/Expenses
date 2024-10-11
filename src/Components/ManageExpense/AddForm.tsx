import {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {GlobalColors} from '../../constants/colors';
import getFormatDate from '../../utility/date';
import Buttons from '../UI/Buttons/Buttons';
import Input from './Input';

function AddForm({cancel, submitButton, onSubmit, defaultValue}) {
  const [description, setDescription] = useState({
    value: defaultValue ? defaultValue.description : '',
    isValid: true,
  });
  const [date, setDate] = useState({
    value: defaultValue ? getFormatDate(defaultValue?.date) : '',
    isValid: true,
  });
  const [amount, setAmount] = useState({
    value: defaultValue ? defaultValue?.amount?.toString() : '',
    isValid: true,
  });

  function DescriptionHandler(enteredText) {
    setDescription({
      value: enteredText,
      isValid: true,
    });
  }

  function DateHandler(enteredText) {
    setDate({
      value: enteredText,
      isValid: true,
    });
  }
  function AmountHandler(enteredText) {
    setAmount({
      value: enteredText,
      isValid: true,
    });
  }
  function SubmitHandler() {
    const expenseData = {
      amount: +amount.value,
      date: new Date(date.value),
      description: description.value,
    };

    const validAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const validDate = expenseData.date.toString() !== 'Invalid Date';
    const validDescription = expenseData.description?.trim().length > 0;

    if (!validAmount || !validDate || !validDescription) {
      setDescription(currVal => ({
        value: currVal.value,
        isValid: validDescription,
      })),
        setDate(currVal => ({
          value: currVal.value,
          isValid: validDate,
        }));
      setAmount(currVal => ({
        value: currVal.value,
        isValid: validAmount,
      }));

      return;
    }
    onSubmit(expenseData);
  }
  const formIsInValid =
    !amount.isValid || !description.isValid || !date.isValid;
  return (
    <View>
      <View>
        <Text style={styles.title}>Your Expenses</Text>
      </View>
      <View>
        <Input
          Header="Description"
          invalid={!description.isValid}
          textInputConfig={{
            placeholder: 'Enter Description',
            multiline: true,
            onChangeText: DescriptionHandler,
            value: description.value,
          }}
        />
        <View style={styles.row}>
          <Input
            Header="Date"
            invalid={!date.isValid}
            textInputConfig={{
              placeholder: 'YYYY-MM-DD',
              maxLength: 10,
              onChangeText: DateHandler,
              value: date.value,
            }}
          />
          <Input
            Header="Amount"
            invalid={!amount.isValid}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: AmountHandler,
              placeholder: '00.00',
              value: amount.value,
            }}
          />
        </View>
        {formIsInValid && <Text style={styles.errorStyle}>Invalid Input</Text>}
      </View>
      <View style={styles.buttons}>
        <Buttons mode="flat" onPress={cancel}>
          Cancel
        </Buttons>
        <Buttons mode={() => {}} onPress={SubmitHandler}>
          {submitButton}
        </Buttons>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    color: GlobalColors.PrimaryFont,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  buttons: {
    marginBottom : 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop : 1,
    marginTop: '70%',
  },
  errorStyle: {
    textAlign: 'center',
    color: 'red',
    margin: 10,
    // marginTop : 10
    fontSize  : 18
  },
});

export default AddForm;
