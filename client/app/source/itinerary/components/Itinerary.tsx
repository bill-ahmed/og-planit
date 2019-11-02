import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon } from 'native-base';

import styles from './ItineraryStyles';
import { View , Text, Image, ScrollView} from 'react-native';
import { Card, ListItem} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import CreateViews from './card_list_views_events/CreateViews';
import GMap from './GMap';
import LocationDetails from './LocationDetails';
import FilterEvents from './filtering/FilterEvents';
import { getLocations } from '../api/locationsAPI';
import { withNavigation, NavigationEvents } from 'react-navigation';

// App stack to go from list of itineraries --> specific itinerary
const EventStack = createAppContainer(createStackNavigator({
        Itinerary: {
            screen: Itinerary, 
            navigationOptions: {
            header: null,   // Remove all headers
          }},
        CreateViews: {
            screen: CreateViews,
            navigationOptions: {
                header: null,   // Remove all headers
              }
        },
        FilterEvents: {
            screen: FilterEvents,
            navigationOptions: {
                header: null,
            }
        }
    }, 
    {
        initialRouteName: "Itinerary",
    }));

export function Itinerary(props) {
    
    const [locationDetailsOpen, setLocationDetailsOpen] = useState(false);
    const [locationsLoaded, setlocationsLoaded] = useState(false);
    const {navigate} = props.navigation;    // Handle navigations

    let locations = null;
    getLocations().then(res => {
        locations = res;
        setlocationsLoaded(true);
        console.log(locations);
    });

    const goToItineraryViews = () =>{
        navigate('CreateViews');
    }

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        Itinerary Page
                    </Title>
                </Body>
                <Right />
            </Header>

            <ScrollView>
                <Button style={styles.button} onPress={() => goToItineraryViews()}>
                    <Text>Itinerary 1</Text>
                </Button>

                <Button style={styles.button} onPress={() => navigate('FilterEvents')}>
                    <Text>Filter Events Screen</Text>
                </Button>
            </ScrollView>

        </Container>
    );
}

export default function ItineraryContainer(props){
    return (
        <EventStack/>
    );
}