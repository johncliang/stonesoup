import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image }  from 'react-native';
import GroupEntry from '../components/GroupEntry';
import SearchBar from '../components/SearchBar';
import { withNavigation } from 'react-navigation';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const HomeScreenWithGroup = ({ navigation }) => {

  const [ingredientsPick, toggleIngredients] = useState(false);
  const [cookPick, toggleCook] = useState(false)
  const [ingredientsAmount, addIngredients] = useState(1);

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
          <Text style={styles.expandedTitleStyle}> Your Role </Text>
          <View style={styles.expandedViewMembersStyle}>
            <Image
              source={require('../../assets/Ingredient.png')}
              fadeDuration={0}
              style={{tintColor: getActiveIngredients(), width: 50, height: 50}}
            />
          </View>
          <Text style={styles.expandedTitleStyle}> Status </Text>
          <Text style={styles.expandedIngredientsStyle}> Waiting for host approval </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={[styles.requestButtonStyle, {backgroundColor: 'red', marginBottom:15}]}>
              <Text style={styles.requestTextStyle}> Cancel </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomBarStyle}>
        <View style={styles.bottomSpacingStyle}>
          <TouchableOpacity onPress={() => navigation.navigate('Join')}>
            <View style={styles.requestButtonStyle}>
              <Text style={styles.requestTextStyle}> Join Group </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

HomeScreenWithGroup.navigationOptions = () => {
  return {
    title: "Home",
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
    backgroundColor: 'lightgrey',
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
    backgroundColor: '#53da90',
    height: 40,
    borderRadius: 5,
  }
});

export default withNavigation(HomeScreenWithGroup);
