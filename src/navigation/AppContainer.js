import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from '../features/home/HomeScreen'
import RepoSelectionScreen from '../features/repos/RepoSelectionScreen'
import RepoListScreen from '../features/repos/RepoListScreen'
import CounterScreen from '../features/mobx/CounterScreen'
import LoginScreen from '../features/login/LoginScreen'
import HomeContainer from '../features/home/HomeContainer'
import routes from './routes'

const RootStack = createStackNavigator(
  {
    [routes.HOME_CONTAINER]: HomeContainer,
    [routes.HOME]: HomeScreen,
    [routes.LOGIN]: LoginScreen,
    [routes.REPO_SELECTION]: RepoSelectionScreen,
    [routes.REPO_LIST]: RepoListScreen,
    [routes.COUNTER_MOBX]: CounterScreen
  },
  {
    initialRouteName: routes.HOME_CONTAINER
  }
)

export default createAppContainer(RootStack)
