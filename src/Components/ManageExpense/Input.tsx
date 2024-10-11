import {StyleSheet, Text, TextInput, View} from 'react-native';
import {GlobalColors} from '../../constants/colors';

function Input({Header, textInputConfig, invalid}) {
  const inputStyle = [styles.TextInput];

  if (textInputConfig && textInputConfig.multiLine) {
    inputStyle.push(styles.multiLine);
  }
  if (invalid) {
    inputStyle.push(styles.invalidInput);
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.Text, invalid && styles.invalidLabel]}>
        {Header}
      </Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 6,
    marginVertical: 8,
    flex: 1,
  },
  TextInput: {
    borderWidth: 1.5,
    borderRadius: 8,
    fontSize: 18,
    padding: 8,
    borderColor: 'black',
    backgroundColor: '#d1cfbd',
  },
  Text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  multiLine: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: 'red',
  },
  invalidInput: {
    backgroundColor: '#e9d1d1',
  },
});

export default Input;
