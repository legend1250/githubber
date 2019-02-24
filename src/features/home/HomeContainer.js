import React, { Component } from 'react'
import client, { mutations } from '../../client'
import HomeScreen from './HomeScreen'
import LoginScreen from '../login/LoginScreen'
import withSession from './withSession'

class HomeContainer extends Component {
  componentDidMount = async () => {
    // const { session } = this.props
    // console.log('session: ', session)
    // await client.mutate({
    //   mutation: mutations.SET_LOCAL_SESSION,
    //   variables: { session }
    // })
  }

  render() {
    const { session, refetch } = this.props
    console.log('session: ', this.props.session)

    if (session && session.me) {
      return <HomeScreen />
    }

    return <LoginScreen refetch={refetch} />
  }
}

export default withSession(HomeContainer)
