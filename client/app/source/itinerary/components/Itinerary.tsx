import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon } from 'native-base';

import styles from './ItineraryStyles';
import { View , Text, Image, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import GMap from './GMap';
import LocationDetails from './LocationDetails';
import { getLocations } from '../api/locationsAPI';
import { withNavigation, NavigationEvents } from 'react-navigation';


//App stack to go from list of itineraries --> specific itinerary
const itineraries=require("./MockItineraryList.json");

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
        navigate();
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
                itineraries.forEach(element => {
                <Button style={styles.button} onPress={() => goToItineraryViews()}>
                    <Text>element.name</Text>
                </Button>
                 });
            </ScrollView>

        </Container>
    );
}
