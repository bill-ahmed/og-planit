import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon, Subtitle, Card, CardItem} from 'native-base';

import styles from './ItineraryStyles';
import { View , Text, Image, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import GMap from './GMap';
import LocationDetails from './LocationDetails';
import { getLocations } from '../api/locationsAPI';
import { withNavigation, NavigationEvents } from 'react-navigation';
import newItinerary from './CreateItinerary';



//App stack to go from list of itineraries --> specific itinerary
const itineraries=require("./MockItineraryList.json");

const EventStack = createAppContainer(createStackNavigator({
    Itinerary: {
        screen: Itinerary, 
        navigationOptions: {
        header: null,   // Remove all headers
      }},
    NewItinerary:{
        screen: newItinerary,
        navigationOptions: {
            header: null,}
        
    }

}, 
{
    initialRouteName: "Itinerary",
}));
export default function Itinerary(props) {
    
    const [locationDetailsOpen, setLocationDetailsOpen] = useState(false);
    const [locationsLoaded, setlocationsLoaded] = useState(false);
    const [locations, setLocations] = useState(null);
    const {navigate} = props.navigation;    // Handle navigations

    getLocations().then(res => {
        setLocations(res);
        setlocationsLoaded(true);
    });

    const goToItineraryViews = () =>{
        navigate(/* carlos' part */);
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

                <Right>
                    <Button transparent onPress={() => {navigate(newItinerary)}}>
                        <Icon name="ios-add"/>
                        <Text> Create New Itinerary</Text>
                    </Button>
                </Right>
              
            </Header>
  
            <ScrollView>
            {/* <Title> <Text>{element.name}</Text> </Title>
                        <Subtitle> <Text>{element.events.length}</Text></Subtitle>
                        <Subtitle> <Text>{element.last_edit_time}</Text> </Subtitle>
                        <Text> {element.time} </Text>  */}
                {itineraries.map(element => {
                return(<Card>
                    <CardItem header button onPress={() => console.log(`Clicked the button ${element.name}!`)/* carlos replace with yours*/}>
                    <Text> {element.name} </Text>
                    </CardItem>
                    <CardItem button onPress={() => console.log(`Clicked the description of ${element.name}!`)/* carlos replace with yours*/}>
                        <Body>
                        <Text>Number of Events:  {element.events.length}</Text>
                        <Text>Last Edited:  {element.last_edit_time}</Text>
                        </Body>
                    </CardItem>
                </Card>);
                 })}
            </ScrollView>

        </Container>
    );
}
export function ItineraryContainer(props){
    return (
        <EventStack/>
    );
}