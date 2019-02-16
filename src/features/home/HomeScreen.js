import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Text } from 'react-native';
import { Heading1 } from '../../components/Headings';
import { PrimaryButton } from '../../components/Buttons';
import routes from '../../navigation/routes';

@inject('stores')
@observer
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount = () => {
    // const { stores } = this.props;
    // console.log('stores: ', stores);
  }

  handleChangeStore = () => {
    const { settings } = this.props.stores;
    settings.counter += 1;
  }

  render() {
    const { counter, counterTen } = this.props.stores.settings;
    // console.log('counter: ', counter);

    return (
      <StyledView>
        <Logo>Githubber</Logo>
        <PrimaryButton
          title="Most Popular Repos"
          onPress={() => this.props.navigation.navigate(routes.REPO_SELECTION)}
        />
        <PrimaryButton
          title="Test MobX"
          onPress={this.handleChangeStore}
        />
        <Text>Counter: {counter}</Text>
        <Text>Counter: {counterTen}</Text>
      </StyledView>
    );
  }
}

const StyledView = styled.View`
  background-color: powderblue;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const Logo = styled(Heading1)`
  padding: 10px;
`;

export default HomeScreen;
