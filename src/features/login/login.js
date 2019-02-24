import React, { Component } from 'react'
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native'
import { Button } from 'react-native-elements'
import styles from './styles'

export default class LoginScreen extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  onLoginPress() {}

  onFbLoginPress() {}

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior='padding'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Event App</Text>
              <TextInput
                placeholder='Username'
                placeholderColor='#c4c3cb'
                style={styles.loginFormTextInput}
              />
              <TextInput
                placeholder='Password'
                placeholderColor='#c4c3cb'
                style={styles.loginFormTextInput}
                secureTextEntry={true}
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title='Login'
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}
