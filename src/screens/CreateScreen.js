import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image }  from 'react-native';
import GroupEntry from '../components/GroupEntry';
import SearchBar from '../components/SearchBar';
import { withNavigation } from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { f, database, auth, storage } from '../../config/config.js'

// Status 1 = group started
export default class CreateScreen extends React.Component {

  static navigationOptions = {
      title: "Create Group",
      headerLeft: null
  };

  state = {
    username: 'TestEntry\'s group',
    timeChosen: '',
    location: '',
    ingredientsPick: false,
    cookPick: false,
    numCooks: '',
    ingredient: '',
    quantity: '',
    groupInfo: []
  }
  switchIngredients = () => {
    this.state.ingredientsPick ? this.setState({ingredientsPick:false}) : this.setState({ingredientsPick:true});
  }
  switchCook = () => {
    this.state.cookPick ? this.setState({cookPick:false}) : this.setState({cookPick:true});
  }

  getActiveCook = () => {
    return this.state.cookPick ? 'darkgrey' : 'lightgrey'
  }
  getActiveIngredients = () => {
      return this.state.ingredientsPick ? 'darkgrey' : 'lightgrey'
  }

  handleSubmit = () => {
    console.log("handling submit ");

    if ((!this.state.ingredientsPick && !this.state.cookPick) || !this.state.timeChosen || !this.state.location) {
      console.log("Request illformed");
      return;
    }
    var entry = {};
    var memberInfo = {}; // cooking food owner approved
    var { currentUser } = auth;
    entry = {name:this.state.username,...entry};
    entry = {time:this.state.timeChosen,...entry};
    entry = {distance:'0.0 miles', ...entry};
    if (this.state.ingredientsPick) {
      if (this.state.ingredient && this.state.quantity) {
        var ingredients = new Object();
        ingredients[this.state.ingredient] = this.state.quantity
        memberInfo = {ingredients:ingredients, food:"true", ...memberInfo};
        var ingredientString = this.state.quantity + " " + this.state.ingredient;
        entry = {ingredients:ingredientString,...entry}
      } else {
        console.log("malformed ingredient entry");
        return;
      }
    } else {
      memberInfo = {food:"false",...memberInfo};
    }
    if (this.state.cookPick) {
      memberInfo = {cooking:"true",...memberInfo};
      entry = {numCooks:this.state.numCooks, ...entry};

    } else {
      memberInfo = {cooking:"false", ... memberInfo};
    }
    memberInfo = {approved:true, ...memberInfo};


    memberInfo = {owner:true, ...memberInfo};
    var memberEntry = {};
    memberEntry[currentUser.uid] = memberInfo;
    entry = {globalState:0, ...entry};
    entry = {members:memberEntry,...entry};
    var pushRef = database.ref(`/groups/`).push()
    var pushKey = pushRef.key

    pushRef.set(entry)
    .catch(error => console.log(error.message));

    console.log("unique key is ")
    console.log(pushKey)

    //delete entry[globalState];
    entry = {gid:pushKey, ...entry};
    console.log(entry.members);
    delete entry.members;
    userEntry = memberInfo;
    userEntry = {info:entry,...userEntry};
    userEntry = {status:1,...userEntry};



    database.ref(`/users/${currentUser.uid}/groups/`)
            .child(pushKey)
            .set(userEntry)
            .catch(error => console.log(error.message));

  }

  componentDidMount() {
    this.setState({groupInfo:this.props.navigation.getParam('group')});
    var { currentUser } = auth;
    database.ref(`/users/${currentUser.uid}/info/name`).once('value', snapshot => {
      var groupName = snapshot.val() + '\'s group'
      console.log("NAME SET ");
      console.log(groupName);
      this.setState({username:groupName})
    })
  }
  //console.log(navigation);
  render() {
    return (
      <View style={styles.fullViewStyle}>
        <View style={styles.containerStyle}>
        </View>
        <View style={styles.expandedStyle}>
          <View>
            <Text style={styles.expandedTitleStyle}> When do you want to eat? </Text>
            <SearchBar
            term={this.state.timeChosen}
            onTermChange={(timeChosen) => this.setState({timeChosen})}/>
            <Text style={styles.expandedTitleStyle}> Where do you want to eat?</Text>
            <SearchBar
            term={this.state.location}
            onTermChange={(location) => this.setState({location})}/>
            <Text style={styles.expandedTitleStyle}> Which role can you fill? </Text>

            <View style={styles.rolesStyle}>
              <TouchableOpacity onPress={this.switchCook}>
                <Image
                  source={require('../../assets/Chef.png')}
                  fadeDuration={0}
                  style={{tintColor: this.getActiveCook(), width: 50, height: 50}}
                />
              </TouchableOpacity>
                <Text style={[styles.rolesTextStyle, {color: this.getActiveCook()}]}> Cook </Text>
              <TouchableOpacity onPress={this.switchIngredients}>
                <Image
                  source={require('../../assets/Ingredient.png')}
                  fadeDuration={0}
                  style={{tintColor: this.getActiveIngredients(), width: 50, height: 50}}
                />
              </TouchableOpacity>
                <Text style={[styles.rolesTextStyle, {color: this.getActiveIngredients()}]}>  Ingredients </Text>
            </View>
            { this.state.ingredientsPick &&
            <View>
            <Text style={styles.expandedTitleStyle}> What ingredients can you bring? </Text>
              <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                <View>
                  <Text> Quantity </Text>
                  <SearchBar
                  term={this.state.quantity}
                  onTermChange={(quantity) => this.setState({quantity})}/>
                </View>
                <View>
                  <Text> Ingredient </Text>
                  <SearchBar
                  term={this.state.ingredient}
                  onTermChange={(ingredient) => this.setState({ingredient})}/>
                </View>

              </View>
            </View>
            }
            { this.state.cookPick &&
            <View>
            <Text style={styles.expandedTitleStyle}> How many other cooks can join? </Text>
              <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
                <View>
                  <Text> Number </Text>
                  <SearchBar
                  term={this.state.numCooks}
                  onTermChange={(numCooks) => this.setState({numCooks})}/>
                </View>
              </View>
            </View>
            }
          </View>

        </View>
        <View style={styles.bottomBarStyle}>
          <View style={styles.bottomSpacingStyle}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
              <View style={styles.cancelButtonStyle}>
                <Text style={styles.requestTextStyle}> Cancel </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleSubmit}>
              <View style={styles.submitButtonStyle}>
                <Text style={styles.requestTextStyle}> Submit </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  fullViewStyle: {
    flex: 1
  },
  containerStyle: {
    backgroundColor: '#F0F0F0',
    flexDirection: 'row'
  },
  expandedStyle : {
    backgroundColor: '#F0F0F0'
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
    color: 'grey',
  },
  ingredientsLineStyle: {
    paddingBottom: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    margin: 5
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
    backgroundColor: '#00bc74',
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
  },
  rolesStyle: {
    flexDirection: 'row',
    marginHorizontal: 40
  },
  rolesTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 45
  },
  bottomBarStyle: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40
  },
  bottomSpacingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15
  },
  cancelButtonStyle: {
    backgroundColor: 'lightgrey',
    height: 40,
    borderRadius: 5,
  },
  submitButtonStyle: {
    backgroundColor: '#00bc74',
    height: 40,
    borderRadius: 5,
  }
});
