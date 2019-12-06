import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { f, database, auth, storage } from '../../config/config.js'

export default class SignupDetailsScreen extends React.Component {
  state = { name: '', bio: '', diet: '', prefs: '', errorMessage: null }


  handleSubmit = () => {
    const { name, bio, diet, prefs } = this.state
    if (auth.currentUser !== null) {
      let { currentUser } = auth;
      database.ref(`/users/${currentUser.uid}`)
      .child('info')
      .set({name, bio, diet, prefs})
      .catch(error => console.log(error.message));
    } else {
    }
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Full Name"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <Text>Bio</Text>
        <TextInput
          placeholder="Tell us more about yourself"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={bio => this.setState({ bio })}
          value={this.state.bio}
        />
        <Text>Dietary Restrictions</Text>
        <TextInput
          placeholder="Vegetarian, nut allergy, etc"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={diet => this.setState({ diet })}
          value={this.state.diet}
        />
        <Text>Food Preferences</Text>
        <TextInput
          placeholder="Vegetarian, nut allergy, etc"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={prefs => this.setState({ prefs })}
          value={this.state.prefs}
        />
        <Text>Who can view my profile</Text>
        <Button
          title="Cancel"
          onPress={() => this.props.navigation.navigate('Signup')} // add props to not allow for backgwards nav
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
