import React from 'react'
import styled from 'styled-components'
import { Heading1 } from '../../components/Headings'
import { PrimaryButton } from '../../components/Buttons'
import routes from '../../navigation/routes'
import client, { signOut, queries } from '../../client'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }

  componentDidMount = async () => {
    const {
      data: { session }
    } = await client.query({ query: queries.GET_LOCAL_SESSION })
    console.log('session: ', session)
  }

  handleLogout = async () => {
    await signOut()
    await this.props.refetch()
  }

  render() {
    const { handleLogout } = this

    return (
      <StyledView>
        <Logo>Githubber</Logo>
        {/* <PrimaryButton
          title='Most Popular Repos'
          onPress={() => this.props.navigation.navigate(routes.REPO_SELECTION)}
        /> */}
        <PrimaryButton onPress={() => this.props.navigation.navigate(routes.COUNTER_MOBX)}>
          <ButtonText>MobX Stores</ButtonText>
        </PrimaryButton>
        <PrimaryButton onPress={handleLogout} size='large'>
          <ButtonText>Log out</ButtonText>
        </PrimaryButton>
      </StyledView>
    )
  }
}

const StyledView = styled.View`
  background-color: powderblue;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`

const Logo = styled(Heading1)`
  padding: 10px;
`

const ButtonText = styled.Text`
  font-family: 'Roboto';
  color: white;
  font-size: 16px;
  text-align: center;
`

export default HomeScreen
