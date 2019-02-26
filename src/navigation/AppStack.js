import React, { Component } from 'react'
import { View, Text, Platform, ToastAndroid } from 'react-native'
import styled from 'styled-components'
import { Button } from 'react-native-elements'
import client, { signOut, queries } from '../client'
import { Query } from 'react-apollo'

class HomeScreen extends Component {

  state = {
    username: '',
    email: '',
    role: []
  }
  
  componentDidMount = async () => {
    // try {
    //   const { data: { session }} = await client.query({query: queries.GET_LOCAL_SESSION})
    //   if(session && session.me){
    //     const { username, email, role } = session.me
    //     this.setState({ username, email, role })
    //   }
    // } catch (error) {
    //   if(Platform.OS === 'android'){
    //     ToastAndroid.show('Error while fetching user information',ToastAndroid.LONG, ToastAndroid.BOTTOM)
    //   }
    // }
  }

  render() {
    return (
      <Query query={queries.GET_LOCAL_SESSION}>
        {({ data, loading }) => {
          const { session } = data
          if(session && session.me){
            const { username, email ,role } = session.me
            
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <Text>Username: {username}</Text>
                <Text>Email: {email}</Text>
                <Text>Role: {JSON.stringify(role)}</Text>
              </View>
            )
          }
          else{
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
              </View>
            )
          }
        }}
      </Query>
    )
  }
}

class SettingsScreen extends Component {
  handleLogout = async () => {
    await signOut()
    this.props.navigation.navigate('Auth')
  }

  render() {
    const { handleLogout } = this

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ButtonStyled title='Log out' onPress={handleLogout} />
      </View>
    )
  }
}

const ButtonStyled = styled(Button)`
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 5px;
  height: 45px;
  margin-top: 10px;
`

export { HomeScreen, SettingsScreen }
