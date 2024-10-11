import {Pressable, StyleSheet, Text, View} from 'react-native';
import { GlobalColors } from '../../../constants/colors';
import {FC} from 'react';

interface IButton {
  children: string;
  onPress: () => void;
  mode: any;
}

const Buttons: FC<IButton> = ({children, onPress, mode}) => {
  return (
    <View>
      <Pressable
        style={({pressed}) => pressed && styles.pressed}
        onPress={onPress}>
        <View style={[styles.buttonContainer]}>
          <Text style={[styles.buttonText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 6,
    paddingHorizontal: 32,
    // marginVertical : 10,
    marginBottom : 20,
    
    paddingVertical: 11,
    marginHorizontal: 16,
    backgroundColor: GlobalColors.primaryTab,
  },
  //   flat: {
  //     backgroundColor: 'transparent',
  //   },
  buttonText: {
    color: GlobalColors.primaryWhite,
    textAlign: 'center',
  },
  //   flatText: {
  //     color: GlobalColors.PrimaryBackGround,
  //   },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
    // margin : 4
  },
});
export default Buttons;
