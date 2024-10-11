import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {GlobalColors} from '../../constants/colors';
import Buttons from './Buttons/Buttons';
import Loading from './Loading';


function ErrorOverlay({message, onConfirm}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occured</Text>
      <Text style={styles.text}>{message}</Text>
      <Buttons onPress={onConfirm}>Okay</Buttons>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalColors.PrimaryBackGround,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
export default ErrorOverlay;
