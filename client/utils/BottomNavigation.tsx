import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// All the screens we want in bottom navigation
import Home from '../app/source/home/Home';
import Itinerary from '../app/source/itinerary/components/Itinerary';
import Ratings from '../app/source/itinerary/components/ratings/CreateRating';
import { View } from 'react-native';
import { Text } from 'native-base';

/**A component to control navigating between the main screens */
export default function BottomNavigation(props){
    return (
        createAppContainer(createBottomTabNavigator(
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
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }
        }
        )
        )
    );
}

/**Return props to render for each section of bottom navigation */
function getTabBarIcons(navigation, focused:boolean, tintColor): JSX.Element {
    return(
        <View>
            <Text>
                Some tab
            </Text>
        </View>
    );
}