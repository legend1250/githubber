import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { Button } from 'react-native-elements'
import client, { signOut, queries } from '../client'
import { Query } from 'react-apollo'

class HomeScreen extends Component {
  componentDidMount = () => {
    // client
    //   .query({
    //     query: queries.GET_LOCAL_SESSION
    //   })
    //   .then(({ data }) => {
    //     console.log('data: ', data)
    //   })
  }

  render() {
    return (
      <Query query={queries.GET_LOCAL_SESSION}>
        {({ data }) => {
          console.log('data: ', data)
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Home!</Text>
            </View>
          )
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
