import React, { Component } from 'react'
import Loading from '../components/Loading'
import client, { queries } from '../client'
import gql from 'graphql-tag'

const setSession = gql`
  mutation($session: Session) {
    setSession(session: $session) @client
  }
`

class AuthLoadingScreen extends Component {
  componentDidMount = async () => {
    try {
      const { data } = await client.query({
        query: queries.GET_ME,
        fetchPolicy: 'network-only'
      })
      // console.log('session: ', data)
      if (data && data.me) {
        await client.mutate({
          mutation: setSession,
          variables: { session: data }
        })
        this.props.navigation.navigate('App')
      } else {
        this.props.navigation.navigate('Auth')
      }
    } catch (error) {
      console.log('error: ', error)
      this.props.navigation.navigate('Auth')
    }
  }

  render() {
    return <Loading />
  }
}

export default AuthLoadingScreen
