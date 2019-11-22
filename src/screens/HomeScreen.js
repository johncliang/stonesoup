import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
// navigation given from it being called by stack navigator
const HomeScreen = (props) => {
  // NEED TO CHECK USER GROUPS
  return (
    <View style={styles.fullViewStyle}>
      <View style={styles.titleBoxStyle}>
        <Text style={styles.headerStyle}>Welcome to Stone Soup</Text>
        <Text style={styles.bodyStyle}>When you create or join a group, you'll see the group appear here</Text>
      </View>

      <View style={styles.bottomBarStyle}>
        <View style={styles.bottomSpacingStyle}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Join')}>
            <View style={styles.requestButtonStyle}>
              <Text style={styles.requestTextStyle}> Join Group </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
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
      justifyContent: 'center'
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
      paddingBottom: 40
    },
    bottomSpacingStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: 15
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

export default HomeScreen;
