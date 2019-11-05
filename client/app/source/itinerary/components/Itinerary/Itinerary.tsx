import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Button, Icon, Subtitle, Card, CardItem, Spinner } from 'native-base';

//import styles from './ItineraryStyles';
import { Itinerary as ItineraryModel } from './../../models/location';
import { View, Text, Image, ScrollView } from 'react-native';
import { getItinerarySigned } from '../../api/itineraryAPI';

export function Itinerary(props) {
    const [itineraries, setItineraries] = useState(null);
    const [itineraryLoaded, setItineraryLoaded] = useState(false);
    const navigate = props.navigation;    // Handle navigations

    getItinerarySigned().then(res => {
        if (!itineraries) {
            console.log(res);
            setItineraries(res);
            setItineraryLoaded(true);
        }
    });


    const goToItineraryViews = () => {
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
                {!itineraries && <Spinner color='blue'/>}
                {itineraries && itineraries.map((element: ItineraryModel) => {
                    return (<Card>
                        <CardItem header button onPress={() => navigate("ViewItineraryEvents", { data: element })}>
                            <Text> {element.name} </Text>
                        </CardItem>
                        <CardItem button onPress={() => console.log(`Clicked the description of ${element.name}!`) /* carlos replace with yours*/}>
                            <Body>
                                {element.events && <Text>Number of Events: {element.events.length}</Text>}
                                {element.last_edit_time && <Text>Last Edited: {element.last_edit_time.toLocaleString()}</Text>}
                            </Body>
                        </CardItem>
                    </Card>);
                })}
            </ScrollView>

        </Container>
    );
}