import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import HomeScreen from './src/screens/HomeScreen';
import ComponentsScreen from './src/screens/ComponentsScreen';
import CreateScreen from './src/screens/CreateScreen';
import JoinList from './src/screens/JoinList';
import ImageScreen from './src/screens/ImageScreen';
import CounterScreen from './src/screens/CounterScreen';
import JoinFormScreen from './src/screens/JoinFormScreen';
import JoinSentScreen from './src/screens/JoinSentScreen';
//import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SignupDetailsScreen from './src/screens/SignupDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import GroupChatScreen from './src/screens/GroupChatScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Signup: SignupScreen,
    SignupDetails: SignupDetailsScreen,
    Components: ComponentsScreen,
    Create: CreateScreen,
    Join: JoinList,
    JoinForm: JoinFormScreen,
    JoinSent: JoinSentScreen,
    Image: ImageScreen,
    Counter: CounterScreen,
    Profile: ProfileScreen,
    GroupChat: GroupChatScreen

  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Stone Soup',
      headerStyle: {
        backgroundColor: '#00bc74',
      },
      headerTintColor: '#fff',

    }
  }
);

export default createAppContainer(navigator);
