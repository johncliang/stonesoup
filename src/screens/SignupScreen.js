import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { f, database, auth, storage } from '../../config/config.js'

export default class SignupScreen extends React.Component {
  state = { email: '', password: '', errorMessage: null }


  handleSignUp = () => {
    const { email, password } = this.state
    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      let { currentUser } = auth;
      database.ref(`/users/${currentUser.uid}`)
              .set({email, password})
              .catch(error => console.log(error.message));
      this.props.navigation.navigate('SignupDetails');
    })
    .catch(error => this.setState({ errorMessage: error.message }));


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
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Home')}
        />
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
