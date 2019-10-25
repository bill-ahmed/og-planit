import React from 'react';
/*React navigation */
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/*Auth Pages */
import Login from '../app/source/login/component/Login';
import { Text, Icon } from 'native-base';

/* Main app pages */
import Home from '../app/source/home/components/Home';
import Itinerary from '../app/source/itinerary/components/Itinerary';
import Ratings from '../app/source/itinerary/components/ratings/CreateRating';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// App stack to go from Auth --> Home and other tabs in bottom navigation
export const AppStack = createBottomTabNavigator(
  {
      Home: Home,
      Itinerary: Itinerary,
      Ratings: Ratings
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) =>
            getTabBarIcons(navigation, focused, tintColor),
        }),
      tabBarOptions: {
          activeTintColor: '#1977B5',
          inactiveTintColor: 'gray',
          style: {
              marginBottom: 5
          }
      },
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
    } 
});

/**Return props to render for each section of bottom navigation */
function getTabBarIcons(navigation, focused:boolean, tintColor): JSX.Element {
  const { routeName } = navigation.state;

  switch(routeName){
      case 'Home':
          return <Icon name="home" color={tintColor}/>
      case 'Itinerary':
          return <Icon name='ios-planet' color={tintColor}/>
      case 'Ratings':
          return <Icon name='ios-star-outline' color={tintColor}/>
      default:
          return <Text>N/A</Text>
  }
}