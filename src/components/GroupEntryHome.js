import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { f, database, auth, storage } from '../../config/config.js'

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';


//when passed in, we can call navigation.getparam

const statusMessagesJoin = ['Waiting for host\'s approval', 'Waiting for host to finalize group', 'Voting on Recipes', 'Delivering Ingredients', 'Food Cooking', 'Meal Finished']
const statusMessagesOwner = ['Group Finalized', 'Voting Finished', '{Ingredients} Delivered', 'Cooking Completed', 'Meal Finished']
export default class GroupEntryHome extends React.Component {


  state = {
    statusMessage: 0,
    details: [],
    requestButtonText: 'Cancel Request',
    recipeMsg: 'Recommended Recipes',
    isOwner: false,
  }
  componentDidMount() {
    console.log("PREPS ARE");
    console.log(this.props);
    this.setState({details:this.props.info.info, statusMessage:this.props.info.status, isOwner:this.props.info.owner});
  }


  handleRequest = () => {
    let { currentUser } = auth;
    database.ref(`users/${currentUser.uid}/groups/`)
    .child(this.props.info.info.gid).remove()
    .catch(function(error) {
      console.log(error.message);
    });
    database.ref(`groups/${this.props.info.info.gid}/`)
    .child(currentUser.uid).remove()
    .catch(function(error) {
      console.log(error.message);
    });
    database.ref(`groups/${this.props.info.info.gid}/members/`)
    .child(currentUser.uid).remove()
    .catch(function(error) {
      console.log(error.message);
    });

  };

  handleAdvanceJoin  = () => {
    let { currentUser } = auth;
    if (this.state.statusMessage >= 5) return;
    database.ref(`/users/${currentUser.uid}/groups/${this.props.info.info.gid}`)
    .child('status').set(this.state.statusMessage+1)
    .catch(error => console.log(error.message));

    this.setState({statusMessage:this.state.statusMessage+1})
    if (this.state.statusMessage <= 1) {
      this.setState({recipeMsg:'Recommended Recipes'})
    } else {
      this.setState({recipeMsg:'Recipe'})
    }

    let payload = {}
    database.ref(`/groups/${this.props.info.info.gid}/members/${currentUser.uid}`)
    .child('approved').set(true)
    .catch(error=>console.log(error.message));

    this.forceUpdate();


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

  render() {
    return (
      //<TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <View>
        <View style={styles.containerStyle}>
          <MaterialCommunityIcons name="face" style={styles.profileIconStyle} />
          <Text style={styles.groupTitleStyle}> {this.state.details.name} </Text>
          <MaterialCommunityIcons name="clock" style={styles.infoIconStyle} />
          <Text style={styles.groupInfoStyle}> {this.state.details.time} </Text>
          <MaterialIcons name="location-on" style={styles.infoIconStyle} />
          <Text style={styles.groupInfoStyle}> {this.state.details.distance}  </Text>
        </View>

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
            <Text style={styles.expandedTitleStyle}> Your Role </Text>
            <View style={{flexDirection: 'row'}}>
            { this.props.info.cooking === "true" &&
            <Image
              source={require('../../assets/Chef.png')}
              fadeDuration={0}
              style={{tintColor: 'black', width: 40, height: 40, marginHorizontal:5}}
            />
            }
            { this.props.info.food === "true" &&
            <Image
              source={require('../../assets/Ingredient.png')}
              fadeDuration={0}
              style={{tintColor: 'black', width: 40, height: 40, marginHorizontal:5}}
            />
            }

            </View>
          </View>
          <View>
            <Text style={styles.expandedTitleStyle}> Status </Text>
            { !this.state.isOwner &&
              <Text style={styles.expandedIngredientsStyle}> {statusMessagesJoin[this.state.statusMessage]} </Text>
            }
          </View>
          { this.state.statusMessage >= 2 && this.state.statusMessage <= 4 &&
            <View>
              <Text style={styles.expandedTitleStyle}> {this.state.recipeMsg} </Text>
            </View>
          }

          { this.state.statusMessage <= 4 && !this.state.isOwner &&
          <TouchableOpacity onPress={this.handleAdvanceJoin}>
            <View style={styles.requestButtonStyle}>
              <Text style={styles.requestTextStyle}> #testing# Advance State! </Text>
            </View>
          </TouchableOpacity>
          }
          { this.state.statusMessage >= 1 && this.state.statusMessage <= 4 && !this.state.isOwner &&
          <TouchableOpacity onPress={() => this.props.navigation.navigate('GroupChat')}>
            <View style={[styles.requestButtonStyle, {backgroundColor:'#00bc74'} ]}>
              <Text style={styles.requestTextStyle}> Open Group Chat </Text>
            </View>
          </TouchableOpacity>
          }
          { this.state.statusMessage == 0 && !this.state.isOwner &&
          <TouchableOpacity onPress={this.handleRequest}>
            <View style={styles.requestButtonStyle}>
              <Text style={styles.requestTextStyle}> {this.state.requestButtonText} </Text>
            </View>
          </TouchableOpacity>
          }
          { this.state.statusMessage >= 1 && this.state.statusMessage <= 4 && !this.state.isOwner &&
          <TouchableOpacity onPress={this.handleRequest}>
            <View style={styles.requestButtonStyle}>
              <Text style={styles.requestTextStyle}> Leave Group </Text>
            </View>
          </TouchableOpacity>
          }
          { this.state.statusMessage >= 5 && !this.state.isOwner &&
          <TouchableOpacity onPress={this.handleRequest}>
            <View style={[styles.requestButtonStyle, {backgroundColor:'#00bc74'} ]}>
              <Text style={styles.requestTextStyle}> Review Group</Text>
            </View>
          </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 15,
    backgroundColor: 'white',
    height: 100,
    flexDirection: 'row'
  },
  expandedStyle : {
    backgroundColor: 'white',
    flex:1,
    paddingBottom: 15
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
    backgroundColor: 'darkgrey',
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



//<TouchableOpacity onPress={() => navigation.navigate('JoinForm', params={group: info})}>
