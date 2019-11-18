import React, { useState } from 'react';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, ScrollView, TouchableOpacity} from 'react-native';
import { Container, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List, Body, Spinner} from 'native-base';
import { Card } from 'react-native-elements';
import { Divider, Slider } from 'react-native-elements'
import LocationDetails from '../../../../shared/component/LocationDetails/LocationDetails';
import GenerateItineraryFromFilters from '../../../api/EventFilteringAPI';
import styles from './ReviewNewItineraryStyles';
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
                    event.StartTime = event.StartTime.toDate();
                    event.EndTime = event.EndTime.toDate();
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

                <Button light disabled={loading} style={styles.button} onPress={() => getEvents()}>
                    <Text style={styles.buttonFont}>Build Itinerary</Text>
                </Button>

                <View>
                {!loading && initialized && events.length > 1 && events.map((event, index) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => handleDetailsModalOpen(event)} key={index}>
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

