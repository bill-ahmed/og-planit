/*React navigation */
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/*Auth Pages */
import Login from '../app/source/login/component/Login';

/* Main app pages */
import BottomNavigation from './BottomNavigation';
import Home from '../app/source/home/Home';
import Itinerary from '../app/source/itinerary/components/Itinerary';
import CreateRating from '../app/source/itinerary/components/ratings/CreateRating';

// App stack to go from Auth --> Home
export const AppStack = createStackNavigator({
    Home: {
      screen: <BottomNavigation/>,
      navigationOptions: {
        header: null, // Remove all headers
      }
    },
    Itinerary: {
      screen: Itinerary,
      navigationOptions: {
        header: null,
      }
    },
    CreateRating: {
      screen: CreateRating,
      navigationOptions: {
        header: null,
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