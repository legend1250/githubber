import React, { Component } from 'react'
import client, { mutations } from '../../client'
import HomeScreen from './HomeScreen'
import LoginScreen from '../login/LoginScreen'
import withSession from './withSession'
import gql from 'graphql-tag'

const setSession = gql`
  mutation($session: Session) {
    setSession(session: $session) @client {
      me {
        id
        username
      }
    }
  }
`

class HomeContainer extends Component {
  componentDidMount = async () => {
    // const { session } = this.props
    // console.log('session: ', session)
    // client.mutate({ mutation: setSession, variables: { session } })
  }

  render() {
    const { session, refetch, navigation } = this.props
    // console.log('props: ', this.props)
    // console.log('session: ', this.props.session)

    if (session && session.me) {
      return <HomeScreen navigation={navigation} />
    }

    return <LoginScreen refetch={refetch} />
  }
}

export default withSession(HomeContainer)
