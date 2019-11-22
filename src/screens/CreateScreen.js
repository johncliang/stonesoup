import React from 'react';
import { View, Text, StyleSheet, FlatList }  from 'react-native';

const JoinScreen = () => {
  const groups = [
    { name: 'Group1'},
    { name: 'Group2'},
    { name: 'Group3'},
    { name: 'Group4'},
  ];

  return (
    <FlatList
      keyExtractor={ (group) => group.name }
      data= { groups }
      renderItem = { ({ item }) => {
        return <Text style={styles.textStyle}> {item.name} </Text>;
      }}
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 50
  }
});

export default JoinScreen;
