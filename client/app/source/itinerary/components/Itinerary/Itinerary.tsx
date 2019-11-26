import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Button, Icon, Subtitle, Card, CardItem, Radio, Spinner, Fab, Thumbnail } from 'native-base';

//import styles from './ItineraryStyles';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getItinerarySigned } from '../../api/itineraryAPI';
import { Itinerary as ItineraryModel, PlanitLocation } from './../../models/location';
import CreateNewItinerary from '../CreateItinerary/components/CreateItineraryStepper';
import styles, {backgroundBlue} from './ItineraryStyles';

//App stack to go from list of itineraries --> specific itinerary
// const itineraries=require("./../../models/MockItineraryList.json");

export function Itinerary(props) {
    const { navigate } = props.navigation;    // Handle navigations
    const [itineraries, setItineraries] = useState<ItineraryModel[]>(null);
    const [selected, setSelected] = useState(-1);
    const [newItineraryModalOpen, setNewItinerayModal] = useState(false);

    // Get itinerary on each render
    getItinerarySigned().then(res => {
        console.log("reloadItineraries");
        if (!itineraries && res != undefined) {
            setItineraries(res);
        }
    });

    const reload = () => {
        setItineraries(null);
        getItinerarySigned().then(res => {
            console.log("reloadItineraries");
            if (!itineraries && res != undefined) {
                setItineraries(res);
            }
        });
        
    }
    
    /**Get the earliest event in an itinerary 
     * @param events The list of events to search in. MUST BE NON-EMPTY.
     * @returns The event with the earliest start time in given itinerary
    */
    const getEarliestEventInItinerary = (events: PlanitLocation[]): PlanitLocation => {
        var result = events[0]; // Base case, only one event exists

        for(let i=0; i < events.length; i++){
            if(events[i].StartTime < result.StartTime){
                result = events[i]
            }
        }
        return result;
    }

    /**Get the latest event in an itinerary 
     * @param events The list of events to search in. MUST BE NON-EMPTY.
     * @returns The event with the latest end time in given itinerary
    */
   const getLatestEventInItinerary = (events: PlanitLocation[]): PlanitLocation => {
        var result = events[0]; // Base case, only one event exists

        for(let i=0; i < events.length; i++){
            if(events[i].EndTime > result.EndTime){
                result = events[i]
            }
        }
        return result;
    }

    /**Get a random integer between min and max */
    function getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    /**Given a list of events, return a random one */
    const getRandomEvent = (events: PlanitLocation[]): PlanitLocation => {
        var index = getRndInteger(0, events.length);
        return events[index];
    }

    /**Bold text more easily */
    const Bold = (props) => <Text style={{...props.style, fontWeight: 'bold'}}>{props.children}</Text>

    return (
        <Container>
            {/* Header content */}
            <View style={styles.header}>
                <Text style={styles.heading}>
                    My Itineraries
                </Text>

                <Button disabled={!itineraries} transparent onPress={() => reload()}>
                    <Icon name="refresh" style={{fontSize: 32, color: backgroundBlue}} />
                </Button>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {!itineraries && <Spinner color='blue' />}
                {itineraries && itineraries.map((element: ItineraryModel, index) => {
                    return (
                    <Card style={{marginBottom: 20}} key={index}>
                        <TouchableOpacity onPress={() => navigate("ViewItineraryEvents", { data: element })}>

                            {/* Image for this itinerary */}
                            <CardItem cardBody>
                                <Image source={{uri: getRandomEvent(element.events).imageURL}} style={{height: 200, width: null, flex: 1}}/>
                            </CardItem>

                            {/* Itinerary Name */}
                            <CardItem>
                                <Text style={styles.cardHeader}> {element.name} </Text>
                            </CardItem>

                            {/* Summary details for itinerary */}
                            <CardItem>
                                <Body>
                                    {element.events && 
                                    <Text style={styles.itineraryBody}> <Bold>Events: </Bold>{element.events.length}</Text>
                                    }
                                    <Text style={styles.itineraryBody}> <Bold>Starts: </Bold> {getEarliestEventInItinerary(element.events).StartTime.toLocaleString()}</Text>
                                    <Text style={styles.itineraryBody}> <Bold>Ends: </Bold>{getLatestEventInItinerary(element.events).EndTime.toLocaleString()} </Text>
                                    {element.last_edit_time && 
                                    <Text style={styles.itineraryBody}> <Bold>Last Edited: </Bold>{element.last_edit_time.toLocaleString().substring(0, 10)}</Text>
                                    }
                                    <Right/>
                                </Body>
                            </CardItem>
                        </TouchableOpacity>
                        
                        {/* Footer content */}
                        <CardItem bordered footer style={{ flexDirection: 'row-reverse', justifyContent: "space-between" }}>
                            <Button style={styles.iconButton} transparent bordered iconLeft onPress={() => navigate("GMap", { data: element })}>
                                <Icon name="map" style={{color: backgroundBlue, fontSize: 28}}/>
                                <Text style={{color: backgroundBlue}}>Map</Text>
                            </Button>
                        </CardItem>
                    </Card>);
                })}
            </ScrollView>

            <Fab
                active={false}
                direction="up"
                containerStyle={{}}
                style={styles.fab}
                position="bottomRight"
                onPress={() => setNewItinerayModal(true)}>
                <Icon name="ios-add" />
            </Fab>

            {
                newItineraryModalOpen && 
                <CreateNewItinerary reloadItineraries={() => reload()} open={newItineraryModalOpen} close={() => setNewItinerayModal(false)} />
            }
        </Container>
    );
}