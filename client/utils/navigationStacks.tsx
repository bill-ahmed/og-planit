import React from 'react';

/*React navigation */
import { createStackNavigator } from 'react-navigation-stack';

/*Auth Pages */
import Login from '../app/source/login/component/Login';

/* Main app pages */
import Home from '../app/source/home/components/Home';
import ItineraryContainer from '../app/source/itinerary/navigation';
import GMap from '../app/source/maps/navigation';
import Ratings from '../app/source/profile/UserProfile';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Text, Icon } from 'native-base';

// App stack to go from Auth --> Home and other tabs in bottom navigation
export const AppStack = createMaterialBottomTabNavigator(
  {
      Home: Home,
      Itinerary: ItineraryContainer,
      Map: GMap,
      Profile: Ratings,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcons(navigation, focused, tintColor),
    }),
    activeColor: "#1977B5",
    barStyle: {backgroundColor: "white"},
    initialRouteName: "Home",
  }
);

// Auth stack handle authentication flow
export const AuthStack = createStackNavigator({ 
    SignIn: {
      screen: Login,
      navigationOptions: {
        header: null,   // Remove all headers
      }
    } ,
});


/**Return props to render for each section of bottom navigation */
function getTabBarIcons(navigation, focused: boolean, tintColor): JSX.Element {
  const { routeName } = navigation.state;

  switch (routeName) {
    case 'Home':
      return <Icon name="home" style={{color: tintColor}} />
    case 'Itinerary':
      return <Icon name='ios-planet' style={{color: tintColor}} />
    case 'Profile':
      return <Icon name='person' style={{color: tintColor}} />
    case 'Map':
      return <Icon name='map' style={{color: tintColor}} />
    default:
      return <Text>N/A</Text>
  }
}