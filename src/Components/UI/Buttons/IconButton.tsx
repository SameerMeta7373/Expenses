import {FC} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IButton {
  name: string;
  size: number;
  color: any;
  onPress: () => void;
}

const IconButton: FC<IButton> = ({name, size, color, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => pressed && styles.pressed}
      onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Icon name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 10,
    margin: 10,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.6,
  },
});
export default IconButton;
