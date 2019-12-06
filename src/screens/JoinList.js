import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList }  from 'react-native';
import { withNavigation } from 'react-navigation';
import { f, database, auth, storage } from '../../config/config.js'

import GroupEntry from '../components/GroupEntry';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

const hardcodedGroups = [
  { name: 'Nathan\'s Group', time: '7:00PM', distance: '0.5 miles'},
  { name: 'Matt\'s Group', time: '7:00PM', distance: '0.5 miles'},
  { name: 'JC\'s Group', time: '7:00PM', distance: '0.5 miles'},
  { name: 'Sidd\'s Group', time: '7:00PM', distance: '0.5 miles'},
];

const JoinList = ({ navigation }) => {
  const [groups, updateGroups] = useState([]);

  const getGroups = () => {
    let {currentUser} = auth;
    database.ref('/groups/').once('value', function(snapshot) {
      let data = snapshot.val();
      for(var groupData in data) {
        var groupObj = data[groupData];
        groupObj.gid = groupData;
        if (currentUser) {
          // if user is already part of group
          if(groupObj) {
            if(groupObj.members) {
              if(groupObj.members[currentUser.uid]) {
                continue;
              }
            }
          }
        }
        updateGroups(groups => groups.concat(groupObj));
      }

    }, function(error) {
      console.log(error.code);
    });
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <View style={styles.backgroundStyle}>
      <FilterBar />
      <FlatList
        keyExtractor={ (group, index) => index.toString() }
        data= { groups }
        renderItem = { ({ item }) => {
            return (
                <GroupEntry info={item} />
            );
          }
        }
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
