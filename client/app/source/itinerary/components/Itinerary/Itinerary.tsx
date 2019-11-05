import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon, Subtitle, Card, CardItem, Radio} from 'native-base';
import styles from './ItineraryStyles';
import { View , Text, Image, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { withNavigation, NavigationEvents } from 'react-navigation';
import newItinerary from './../CreateItinerary/CreateItinerary';
import { GestureHandlerGestureEvent } from 'react-native-gesture-handler';
//App stack to go from list of itineraries --> specific itinerary

const itineraries=require("./../../models/MockItineraryList.json");

export default function Itinerary(props) {
    
    const [locationDetailsOpen, setLocationDetailsOpen] = useState(false);
    const [locationsLoaded, setlocationsLoaded] = useState(false);
    const {navigate} = props.navigation;    // Handle navigations

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
                    <Button transparent onPress={() => navigate('NewItinerary')}>
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
                    <CardItem header button onPress={() => navigate("ViewItineraryEvents", {data: element})}>
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