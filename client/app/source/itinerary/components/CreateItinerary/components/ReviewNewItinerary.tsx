import React, { useState } from 'react';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, ScrollView, TouchableOpacity} from 'react-native';
import { Container, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List, Body, Spinner} from 'native-base';
import { Card } from 'react-native-elements';
import { Divider, Slider } from 'react-native-elements'
import GenerateItineraryFromFilters from '../../../api/EventFilteringAPI';
import styles from './ReviewNewItineraryStyles';

export default function ReviewNewItinerary(props){
    const [itineraryFilter, setItineraryFilters] = useState(props.itineraryFilterInfo);
    const [events, setEvents] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(false);

    const getEvents = () => {
        setLoading(true);
        GenerateItineraryFromFilters(props.itineraryFilterInfo)
        .then(resp => {
            if(resp){
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
    
    return(
        <ScrollView style={styles.content}>
            {/* Main Content */}
            <View style={styles.filtersIntroduction}>

                {/* Overview text */}
                <View>
                    <Text style={styles.text}>
                        Here's your new itinerary! Take a second to review.
                    </Text>
                    
                    <Text style={styles.subtext}>
                        Don't worry, you can always modify these events later.
                    </Text>
                </View>

                <Button onPress={() => getEvents()}>
                    <Text>Build Itinerary</Text>
                </Button>

                <View>
                {!loading && initialized && events.length > 1 && events.map((event, index) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={() => console.log(event)} key={index}>
                                <Card
                                    image={{ uri: event.uri }}>
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

                {loading && <Spinner/>}
                </View>
                
            </View>
        </ScrollView>
    );
}

