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
import HomeScreenWithGroup from './src/screens/HomeScreenWithGroup';


const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen,
    Create: CreateScreen,
    Join: JoinList,
    JoinForm: JoinFormScreen,
    JoinSent: JoinSentScreen,
    Image: ImageScreen,
    Counter: CounterScreen,
    HomeGroup: HomeScreenWithGroup

  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Stone Soup',
      headerStyle: {
        backgroundColor: '#53da90',
      },
      headerTintColor: '#fff',

    }
  }
);

export default createAppContainer(navigator);
