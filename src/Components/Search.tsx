import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

function Search({searchItem, onSearch}) {
  return (
    <View >
      <TextInput
      style={styles.textInput}
        placeholder="Search"
        value={searchItem}
        onChangeText={onSearch}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    margin: 12,
    marginBottom: 20,
    fontSize: 20,
  },
});

export default Search;
