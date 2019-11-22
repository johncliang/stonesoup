import React from 'react';
import { View, Text, StyleSheet, FlatList }  from 'react-native';
import { withNavigation } from 'react-navigation';

import GroupEntry from '../components/GroupEntry';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';


const JoinList = ({ navigation }) => {
  const groups = [
    { name: 'Nathan\'s Group', time: '7:00PM', distance: '0.5 miles'},
    { name: 'Matt\'s Group', time: '7:00PM', distance: '0.5 miles'},
    { name: 'JC\'s Group', time: '7:00PM', distance: '0.5 miles'},
    { name: 'Sidd\'s Group', time: '7:00PM', distance: '0.5 miles'},
  ];
  const filters = [ {distance: '0.5 miles'}];

  const applyFilter = (groupInfo) => {
    return results.filter( result => {
      groupInfo.distance === '0.5 miles';
    });
  };

  return (
    <View style={styles.backgroundStyle}>
      <FilterBar />
      <FlatList
        keyExtractor={ (group) => group.name }
        data= { groups }
        renderItem = { ({ item }) => {
          return (
              <GroupEntry info={item} />
          );
        }}
      />
    </View>
  );
};

JoinList.navigationOptions = () => {
  return {
    title: "Join Group"
  };
};
const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 50
  },
  backgroundStyle: {
    backgroundColor: '#c0c1bf',
    flex: 1
  }
});

export default JoinList;
