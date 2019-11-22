import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
//  onChangeText={newTerm => onTermChange(newTerm)}
//  onEndEditing={() => onTermSubmit()}
const SearchBar = ({ term, onTermChange, onTermSubmit}) => {

  return (
    <View style={styles.backgroundStyle}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search"

      />
    </View>

  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 15,
    backgroundColor: 'lightgrey',
    height: 30,
    width: 150,
    borderRadius: 5
  },
  inputStyle: {
    flex: 1,
    fontSize: 18
  },

});

export default SearchBar;
