import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { f, database, auth, storage } from '../../config/config.js'
import _ from 'lodash';

import GroupEntryHome from '../components/GroupEntryHome';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
// navigation given from it being called by stack navigator
export default class HomeScreen extends React.Component {

  state = {
    hasGroups: false,
    loading: true,
    userGroups: []
  }

  componentDidMount() {
    let { currentUser } = auth;
    // FOR DEBUG PORPOISES

    if (!currentUser) {
      auth.signOut().then(function() {
      }).catch(function(error) {
        console.log(error.message);
      });
      currentUser = auth.signInWithEmailAndPassword('test@test.com', 'testtest')
      .catch(function(error) {
        console.log(error.message);
      });

      database.ref(`/users/e9MULM7ew0PBeCk6YhzNqT4qqCN2/groups`).on('value', snapshot => {
        let data = snapshot.val();
        //  iterating through joined groups
        const groups = _.map(data, (item) => {
          return item;
        });
        console.log(groups.length);
        if (groups.length) {
          this.setState({hasGroups:true})
        }
        this.setState({userGroups:groups, loading:false})

      }, function(error) {
        console.log(error.code);
      });

    } else {
      console.log('in valid user');
      database.ref(`/users/${currentUser.uid}/groups`).on('value', function(snapshot) {
        let data = snapshot.val();
        //  iterating through joined groups
        const groups = _.map(data, (item) => {
          return item;
        });
        if (groups.length) {
          this.setState({hasGroups:true})
        }
        this.setState({userGroups:groups, loading:false})
      }, function(error) {
        console.log(error.code);
      });
    }
  }


  render() {
    if (this.state.loading) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )
    }
    // default behavior
    if (!this.state.hasGroups) {
      return (
        <View style={styles.fullViewStyle}>
          <View style={[styles.titleBoxStyle, {opacity: 1}]}>
            <Text style={styles.headerStyle}>Welcome to Stone Soup</Text>
            <Text style={styles.bodyStyle}>When you create or join a group, you'll see the group appear here</Text>
          </View>
          <View style={styles.bottomBarStyle}>
            <View style={styles.bottomSpacingStyle}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Create')}>
                <View style={styles.requestButtonStyle}>
                  <Text style={styles.requestTextStyle}> Create Group </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Join')}>
                <View style={styles.requestButtonStyle}>
                  <Text style={styles.requestTextStyle}> Join Group </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    // joined groups
    return (
      <View style={styles.fullViewStyle}>
        <FlatList
          keyExtractor={ (group, index) => index.toString() }
          data= { this.state.userGroups }
          renderItem = { ({ item }) => {
              return (
                  <GroupEntryHome info={item} navigation={this.props.navigation} />
              );
            }
          }
        />
        <View style={styles.bottomBarStyle}>
          <View style={styles.bottomSpacingStyle}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Create')}>
              <View style={styles.requestButtonStyle}>
                <Text style={styles.requestTextStyle}> Create Group </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Join')}>
              <View style={styles.requestButtonStyle}>
                <Text style={styles.requestTextStyle}> Join Group </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

  }
};

HomeScreen.navigationOptions = () => {
  return {
    title: "Home",
    headerLeft: null,
    gesturesEnabled: false
  };
};




const styles = StyleSheet.create({
    fullViewStyle: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#F0F0F0'
    },
    titleBoxStyle: {
      paddingTop: 250,
      justifyContent: 'center',
      backgroundColor: '#F0F0F0',
      alignSelf: 'center'
    },
    headerStyle: {
      fontWeight: 'bold',
      alignSelf: 'center',
      fontSize: 35
    },
    bodyStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 20,
      marginHorizontal: 10,
      paddingTop: 20
    },
    bottomBarStyle: {
      backgroundColor: '#F0F0F0',
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 40,
      marginHorizontal: 10
    },
    bottomSpacingStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: 15
    },
    requestButtonStyle: {
      marginTop: 15,
      backgroundColor: '#00bc74',
      height: 40,
      borderRadius: 5,
      justifyContent: 'center',
      alignSelf: 'center',
      marginHorizontal: 15
    },
    requestTextStyle: {
      color: 'white',
      fontSize: 18,
      justifyContent: 'center',
      marginHorizontal: 40
    }
});
