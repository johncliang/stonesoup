import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

import SearchBar from './SearchBar';

//when passed in, we can call navigation.getparam

const GroupEntry = ({info, navigation}) => {

  const [activeSectionss, setSectionss] = useState([]);
  const [collapsed, toggleCollapsed] = useState(true);

  toggleExpanded = () => {
    collapsed ? toggleCollapsed(false) : toggleCollapsed(true);
  };


  renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
      duration={400}
      style={[styles.content, isActive ? styles.active : styles.inactive]}
      transition="backgroundColor"
      >
      <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
      {section.content}
      </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    //<TouchableOpacity onPress={() => navigation.navigate('Home')}>
    <View>
      <TouchableOpacity onPress={toggleExpanded}>
        <View style={styles.containerStyle}>
          <MaterialCommunityIcons name="face" style={styles.profileIconStyle} />
          <Text style={styles.groupTitleStyle}> {info.name} </Text>
          <MaterialCommunityIcons name="clock" style={styles.infoIconStyle} />
          <Text style={styles.groupInfoStyle}> {info.time} </Text>
          <MaterialIcons name="location-on" style={styles.infoIconStyle} />
          <Text style={styles.groupInfoStyle}> {info.distance}  </Text>
        </View>
        <Collapsible collapsed={collapsed} align="center">
          <View style={styles.expandedStyle}>
            <View>
              <Text style={styles.expandedTitleStyle}> Group Members </Text>
            </View>
            <View style={styles.expandedViewMembersStyle}>
              <MaterialCommunityIcons name="face" style={styles.memberIconStyle} />
              <MaterialCommunityIcons name="face" style={styles.memberIconStyle} />
              <MaterialCommunityIcons name="face" style={styles.memberIconStyle} />
            </View>
            <View>
              <Text style={styles.expandedTitleStyle}> Ingredients Contributed </Text>
              <Text style={styles.expandedIngredientsStyle}> Carrots, potatoes, corn </Text>
          </View>
            <TouchableOpacity onPress={() => navigation.navigate('JoinForm', params={group: info})}>
              <View style={styles.requestButtonStyle}>
                <Text style={styles.requestTextStyle}> Request to Join </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Collapsible>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 15,
    backgroundColor: '#F0F0F0',
    height: 100,
    flexDirection: 'row'
  },
  expandedStyle : {
    backgroundColor: '#F0F0F0',
    height: 230
  },
  expandedViewMembersStyle: {
    flexDirection: 'row'
  },
  textContainerStyle: {
    borderColor: 'black',
    borderWidth: 1
  },
  groupTitleStyle: {
    marginTop: 20,
    fontSize: 20,
    flex: 1
  },
  groupInfoStyle: {
    fontSize: 14,
    marginTop: 75
  },
  expandedTitleStyle: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10
  },
  expandedIngredientsStyle: {
    fontSize: 16,
    marginTop: 10,
    color: 'grey'
  },
  profileIconStyle: {
    fontSize: 50,
    alignSelf: 'center',
    marginHorizontal: 15
  },
  memberIconStyle: {
    fontSize: 40,
    marginHorizontal: 5
  },
  infoIconStyle: {
    fontSize: 16,
    marginTop: 75,
  },
  requestButtonStyle: {
    marginTop: 15,
    backgroundColor: '#53da90',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  requestTextStyle: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
    marginHorizontal: 40
  }
});

export default withNavigation(GroupEntry);
