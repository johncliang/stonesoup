import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const FilterBar = ({ term, onTermChange, onTermSubmit}) => {

  return (
    <View style={styles.backgroundStyle}>
      <Text style={styles.textStyle}> Current Location </Text>
      <Feather name="filter" style={styles.iconStyle}/>
    </View>

  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#f8f8f8',
    height: 35,
    flexDirection: 'row'
  },
  textStyle: {
    flex: 1,
    fontSize: 15,
    color: 'blue',
    marginHorizontal: 15,
    marginTop: 10
  },
  iconStyle: {
    fontSize: 18,
    color:'blue',
    alignSelf: 'center',
    marginHorizontal: 15
  }
});

export default FilterBar;
