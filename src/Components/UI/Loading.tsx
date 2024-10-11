import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GlobalColors} from '../../constants/colors';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white"></ActivityIndicator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalColors.PrimaryFont,
  },
});
export default Loading;
