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
import { Mutation } from 'react-apollo'
import { mutations } from '../../client'
import deviceStorage from '../../services/deviceStorage'
import styles from './styles'

class LoginScreen extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChangeUsername = (username) => {
    this.setState({ username })
  }

  handleChangePwd = (password) => {
    this.setState({ password })
  }

  onLoginPress = async (signIn) => {
    try {
      const {
        data: {
          signIn: { token }
        }
      } = await signIn()
      await deviceStorage.saveKey('auth.token', token)
      await this.props.refetch()
    } catch (error) {
      console.log('error: ', error)
    }
  }

  render() {
    const { username, password } = this.state
    const { handleChangeUsername, handleChangePwd, onLoginPress } = this

    return (
      <Mutation
        mutation={mutations.SIGN_IN}
        variables={{ username, password }}
        fetchPolicy='no-cache'
      >
        {(signIn, { data, loading, error }) => (
          <KeyboardAvoidingView style={styles.containerView} behavior='padding'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                  <Text style={styles.logoText}>Event App</Text>
                  <TextInput
                    placeholder='Username'
                    placeholderColor='#c4c3cb'
                    style={styles.loginFormTextInput}
                    name='username'
                    onChangeText={handleChangeUsername}
                  />
                  <TextInput
                    placeholder='Password'
                    placeholderColor='#c4c3cb'
                    style={styles.loginFormTextInput}
                    secureTextEntry={true}
                    name='password'
                    onChangeText={handleChangePwd}
                  />
                  <Button
                    buttonStyle={styles.loginButton}
                    onPress={() => onLoginPress(signIn)}
                    title='Login'
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        )}
      </Mutation>
    )
  }
}

export default LoginScreen