import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// All the screens we want in bottom navigation
import Home from '../app/source/home/components/Home';
import Itinerary from '../app/source/itinerary/components/Itinerary';
import Ratings from '../app/source/itinerary/components/ratings/CreateRating';
import { View } from 'react-native';
import { Text, Icon } from 'native-base';

/**A component to control navigating between the main screens */
const BottomNavigation = createAppContainer(createBottomTabNavigator(
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
    )
);

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
    return(
        <View>
            <Text>
                Some tab
            </Text>
        </View>
    );
}

export default BottomNavigation;