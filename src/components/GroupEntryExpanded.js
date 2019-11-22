import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

//when passed in, we can call navigation.getparam

const GroupEntryExpanded = ({info, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="face" style={styles.profileIconStyle} />
        <Text style={styles.groupTitle}> {info.name} </Text>
        <MaterialCommunityIcons name="clock" style={styles.infoIconStyle} />
        <Text style={styles.groupInfo}> {info.time} </Text>
        <MaterialIcons name="location-on" style={styles.infoIconStyle} />
        <Text style={styles.groupInfo}> {info.distance}  </Text>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: '#F0F0F0',
    height: 100,
    flexDirection: 'row'
  },
  textContainer: {
    borderColor: 'black',
    borderWidth: 1
  },
  groupTitle: {
    marginTop: 20,
    fontSize: 20,
    flex: 1
  },
  groupInfo: {
    fontSize: 14,
    marginTop: 75
  },
  profileIconStyle: {
    fontSize: 50,
    alignSelf: 'center',
    marginHorizontal: 15
  },
  infoIconStyle: {
    fontSize: 16,
    marginTop: 75,
  }
});

export default withNavigation(GroupEntryExpanded);
