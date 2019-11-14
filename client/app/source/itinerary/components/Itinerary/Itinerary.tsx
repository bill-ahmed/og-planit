import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Button, Icon, Subtitle, Card, CardItem, Radio, Spinner } from 'native-base';

//import styles from './ItineraryStyles';
import { View, Text, Image, ScrollView } from 'react-native';
import { getItinerarySigned } from '../../api/itineraryAPI';
import { Itinerary as ItineraryModel } from './../../models/location';
import CreateNewItinerary from '../CreateItinerary/components/CreateItineraryStepper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

//App stack to go from list of itineraries --> specific itinerary
// const itineraries=require("./../../models/MockItineraryList.json");

export function Itinerary(props) {
    const { navigate } = props.navigation;    // Handle navigations
    const [itineraries, setItineraries] = useState(null);
    const [selected, setSelected] = useState(-1);
    const [newItineraryModalOpen, setNewItinerayModal] = useState(false);

    getItinerarySigned().then(res => {
        if (!itineraries && res != undefined) {
            setItineraries(res);
        }
    });

    const goToItineraryViews = () => {
        navigate(/* carlos' part */);
    }

    const handleRadioButtonChange = (newRadioButtonValue: number) => {
        setSelected(newRadioButtonValue);
        console.log("User selected " + newRadioButtonValue);
    }

    return (
        <Container>
            <Header>
                <Body>
                    <Title>
                        Itinerary Page
                    </Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => setNewItinerayModal(true)}>
                        <Icon name="ios-add" />
                    </Button>
                </Right>
            </Header>

            <ScrollView>
                {!itineraries && <Spinner color='blue' />}
                {itineraries && itineraries.map((element: ItineraryModel, index) => {
                    return (<Card key={index}>
                        <CardItem header button onPress={() => navigate("ViewItineraryEvents", { data: element })}>
                            <Text> {element.name} </Text>
                        </CardItem>
                        <CardItem button onPress={() => console.log(`Clicked the description of ${element.name}!`) /* carlos replace with yours*/}>
                            <Body>
                                {element.events && <Text>Number of Events: {element.events.length}</Text>}
                                {element.last_edit_time && <Text>Last Edited: {element.last_edit_time.toLocaleString()}</Text>}
                                <Right>
                                    <Radio selected={selected === index} onPress={() => handleRadioButtonChange(index)} />
                                </Right>
                            </Body>
                        </CardItem>
                    </Card>);
                })}
            </ScrollView>

            {newItineraryModalOpen && <CreateNewItinerary open={newItineraryModalOpen} close={() => setNewItinerayModal(false)}/>}
        </Container>
    );
}