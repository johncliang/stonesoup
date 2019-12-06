import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImageDetail from '../components/ImageDetail';
import { f, database, auth, storage } from '../../config/config.js'


const ProfileScreen = () => {
  let { currentUser } = f.auth();
  console.log(currentUser);
  // TODO - HARDCODED
  database.ref('/users/5nSuAeiFQmSpJae5GNQ5ldt3VZa2').on('value', function(snapshot) {
    let data = snapshot.val();
    console.log(data);

  }, function(error) {
    console.log(error.code);
  });
  return (
    <View>
      <ImageDetail title="A"/>
      <ImageDetail title="B"/>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
