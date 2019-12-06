import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image }  from 'react-native';
import GroupEntry from '../components/GroupEntry';
import SearchBar from '../components/SearchBar';
import { withNavigation } from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { f, database, auth, storage } from '../../config/config.js'

const JoinFormScreen = ({ navigation }) => {

  const [ingredientsPick, toggleIngredients] = useState(false);
  const [cookPick, toggleCook] = useState(false)
  const [ingredientsAmount, addIngredients] = useState(1);
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');



  switchIngredients = () => {
    ingredientsPick ? toggleIngredients(false) : toggleIngredients(true);
  };
  switchCook = () => {
    cookPick ? toggleCook(false) : toggleCook(true);
  }

  const getActiveCook = () => {
    return cookPick ? 'darkgrey' : 'lightgrey'
  }
  const getActiveIngredients = () => {
      return ingredientsPick ? 'darkgrey' : 'lightgrey'
  }

  const getActiveIngredientsSection = () => {
    return ingredientsPick ? 'black' : '#F0F0F0'
  }
  const getActiveIngredientsSectionOpacity = () => {
    return ingredientsPick ? 1 : 0
  }

  const handleSubmit = () => {
    console.log("handling submit ");
    var { currentUser } = auth;

    var entry = {};

    if (!ingredientsPick && !cookPick) {
      console.log("No roles chosen");
      return;
    }
    if (ingredientsPick) {
      if (ingredient && quantity) {
        var ingredients = new Object();
        ingredients[ingredient] = quantity
        entry = {ingredients:ingredients, food:"true", ...entry};
      } else {
        console.log("malformed ingredient entry");
        return;
      }
    } else {
      entry = {food:"false",...entry};
    }
    if (cookPick) {
      entry = {cooking:"true", ... entry};

    } else {
      entry = {cooking:"false", ... entry};
    }
    entry = {approved:false, ...entry};
    console.log(entry);

    database.ref(`/groups/${info.gid}/members/`)
            .child(currentUser.uid)
            .set(entry)
            .catch(error => console.log(error.message));

    entry = {status:0, ...entry};
    console.log('group info is');
    console.log(navigation.state.params.group);
    var groupInfo = navigation.state.params.group;
    entry = {info:groupInfo, ...entry};
    console.log(groupInfo);
    database.ref(`/users/${currentUser.uid}/groups/`)
            .child(info.gid)
            .set(entry)
            .catch(error => console.log(error.message));
    navigation.navigate("JoinSent", params={group: info})


  }

  //console.log(navigation);
  const info = navigation.getParam('group');
  return (
    <View style={styles.fullViewStyle}>
      <View style={styles.containerStyle}>
        <MaterialCommunityIcons name="face" style={styles.profileIconStyle} />
        <Text style={styles.groupTitleStyle}> {info.name} </Text>
        <MaterialCommunityIcons name="clock" style={styles.infoIconStyle} />
        <Text style={styles.groupInfoStyle}> {info.time} </Text>
        <MaterialIcons name="location-on" style={styles.infoIconStyle} />
        <Text style={styles.groupInfoStyle}> {info.distance}  </Text>
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
          <Text style={styles.expandedTitleStyle}> Ingredients Contributed </Text>
          <Text style={styles.expandedIngredientsStyle}> Carrots, potatoes, corn </Text>
        </View>
        <View  style={styles.ingredientsLineStyle}>
        </View>
        <View>
          <Text style={styles.expandedTitleStyle}> What role can you fill? </Text>

          <View style={styles.rolesStyle}>
            <TouchableOpacity onPress={switchCook}>
              <Image
                source={require('../../assets/Chef.png')}
                fadeDuration={0}
                style={{tintColor: getActiveCook(), width: 50, height: 50}}
              />
            </TouchableOpacity>
              <Text style={[styles.rolesTextStyle, {color: getActiveCook()}]}> Cook </Text>
            <TouchableOpacity onPress={switchIngredients}>
              <Image
                source={require('../../assets/Ingredient.png')}
                fadeDuration={0}
                style={{tintColor: getActiveIngredients(), width: 50, height: 50}}
              />
            </TouchableOpacity>
              <Text style={[styles.rolesTextStyle, {color: getActiveIngredients()}]}>  Ingredients </Text>
          </View>

          <Text style={[styles.expandedTitleStyle, {color: getActiveIngredientsSection()}]}> What ingredients can you bring? </Text>
          <View style={{flexDirection: 'row', justifyContent:'space-around', opacity:getActiveIngredientsSectionOpacity()}}>
            <View>
              <Text> Quantity </Text>
              <SearchBar
                term={quantity}
                onTermChange={setQuantity}
              />
            </View>
            <View>
              <Text> Ingredient </Text>
              <SearchBar
                term={ingredient}
                onTermChange={setIngredient}
              />
            </View>

          </View>
        </View>

      </View>
      <View style={styles.bottomBarStyle}>
        <View style={styles.bottomSpacingStyle}>
          <TouchableOpacity onPress={() => navigation.navigate("Join")}>
            <View style={styles.cancelButtonStyle}>
              <Text style={styles.requestTextStyle}> Cancel </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.submitButtonStyle}>
              <Text style={styles.requestTextStyle}> Submit </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

JoinFormScreen.navigationOptions = () => {
  return {
    title: "Group Request",
    headerLeft: null
  };
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

export default withNavigation(JoinFormScreen);
