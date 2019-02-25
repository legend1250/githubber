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
    const { navigate } = this.props.navigation

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
        navigate('App')
      } else {
        navigate('Auth')
      }
    } catch (error) {
      console.log('error: ', error)
      navigate('Auth')
    }
  }

  render() {
    return <Loading />
  }
}

export default AuthLoadingScreen
