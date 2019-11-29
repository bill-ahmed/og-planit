import React, { useState } from 'react';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, ScrollView, TouchableOpacity} from 'react-native';
import { Container, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List, Body, Spinner, Footer} from 'native-base';
import { Card } from 'react-native-elements';
import { Divider, Slider } from 'react-native-elements'
import LocationDetails from '../../../../shared/component/LocationDetails/LocationDetails';
import GenerateItineraryFromFilters from '../../../api/EventFilteringAPI';
import styles from './GenerateItineraryStyles';
import { PlanitLocation } from '../../../models/location';

export default function ReviewNewItinerary(props){
    const [itineraryFilter, setItineraryFilters] = useState(props.itineraryFilterInfo);
    const [events, setEvents] = useState([]);   // All event data
    const [detailsModalOpen, setDetailsModal] = useState(false);    // Whether the modal is open or not
    const [detailsModalEventData, setDetailsModalEvent] = useState(null);   // Data to pass in to details modal
    const [initialized, setInitialized] = useState(false);  // If data is ready to be displayed
    const [loading, setLoading] = useState(false);  // If some loading action is ocurring


    /**Update state with all events that satisfy the provided filter object */
    const getEvents = (): void => {
        setLoading(true);
        GenerateItineraryFromFilters(props.itineraryFilterInfo)
        .then(resp => {
            if(resp){
                // Update dates in all response data
                resp.forEach(event => {
                    event.StartTime = event.StartTime ? event.StartTime.toDate() : new Date();
                    event.EndTime = event.StartTime ? event.EndTime.toDate() : new Date();
                });
                setEvents(resp);
                setInitialized(true);
                setLoading(false);
            }
        })
        .catch(err => {
            setInitialized(false);
            setEvents([]);
            setLoading(false)
            console.log(err);
        });
    }

    const handleDetailsModalOpen = (eventData: PlanitLocation) => {
        setDetailsModalEvent(eventData);
        setDetailsModal(true);
    }

    /**Upload itinerary to server */
    const uploadItinerary = () => {
        setLoading(true);   // Trigger loading

        props.uploadItinerary(events)
        .then(resp => {
            setLoading(false);
            if(resp){
                alert("Successfully created itinerary!");
                props.closeModal();
                props.reloadItineraries();
            } else {
                alert("Error: Missing or invalid itinerary data. Please make sure you have entered all fields and have at least one event in your itinerary.");
            }
        })
        .catch(err => {
            console.log("Error uploading itineraries", err);
            props.reloadItineraries();
        })
    }
    
    return(
        <ScrollView style={styles.content}>
            {/* Main Content */}
            <View style={styles.contentContainer}>

                {/* Overview text */}
                <View>
                    <Text style={styles.text}>
                        {'Click Genereate below to create your new itinerary.\nNote that to update this list, you will need to click Generate each time you change a filter!'}
                    </Text>
                    
                    <Text style={styles.subtext}>
                        Don't worry, you can always modify these events later.
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button iconRight light disabled={loading} style={styles.button} onPress={() => getEvents()}>
                        <Text style={styles.buttonFont}>Build Itinerary</Text>
                        <Icon name="settings"/>
                    </Button>
                    
                    <Button iconRight success disabled={events.length === 0 || loading} style={styles.button} onPress={() => uploadItinerary()}>
                        <Text style={events.length===0 ? styles.buttonFont : styles.buttonFontWhite}>Upload Itinerary</Text>
                        <Icon name="cloud-upload" />
                    </Button>
                </View>

                <View>
                {!loading && initialized && events.length > 0 && events.map((event, index) => {
                    return (
                        <View key={index}>
                            <TouchableOpacity onPress={() => handleDetailsModalOpen(event)}>
                                <Card
                                    image={{ uri: event.imageURL }}>
                                    <Text style={styles.eventHeader}>
                                        {event.Name}
                                    </Text>
                                    <Text>
                                        {"$" + event.AvgPrice + "\n"}
                                        {event.Address.Number + " " + event.Address.Street + ", " + event.Address.City + ", " + event.Address.Province + "\n"}
                                        {event.StartTime + " - " + event.EndTime}
                                    </Text>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    )
                })}

                {loading && <Spinner color="#1977B5"/>}
                </View>
                
            </View>
            {detailsModalOpen && <LocationDetails location={detailsModalEventData} open={detailsModalOpen} setModal={setDetailsModal}/>}

        </ScrollView>
    );
}

