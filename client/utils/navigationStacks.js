/*React navigation */
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/*Screens for each page */
import Login from '../screens/Login';
import Home from '../screens/Home';

// App stack to go from Auth --> Home
export const AppStack = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        header: null, // Remove all headers
      }
    }
});

// Auth stack handle authentication flow
export const AuthStack = createStackNavigator({ 
    SignIn: {
      screen: Login,
      navigationOptions: {
        header: null,   // Remove all headers
      }
    } 
});