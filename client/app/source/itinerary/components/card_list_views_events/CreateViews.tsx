import React, { Component, useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon, View } from 'native-base';

import styles from './CreateViewsStyles';
import { Text, ScrollView, TextInput, TouchableOpacity, ColorPropType } from 'react-native';
import { Card, Input } from 'react-native-elements';
import LocationDetails from '../../../shared/component/LocationDetails/LocationDetails';
import EventsSelector from '../eventsSelector/eventsSelector';
import { Itinerary } from '../../models/location';
import { getLocations } from '../../../maps/api/locationsAPI';

export default function CreateViews(props) {
    // Control if modal is open or not
    const [eventDetailsModalOpen, setEventDetailsModal] = useState(false);
    const [chooseEventModalOpen, setChooseEventModal] = useState(false);
    const [editFields, setEditFields] = useState(false);
    const [itinerayData, setItineraryData] = useState(null);
    const [events, setEvents] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [backup, setBackup] = useState(null);
    const [indexAdd, setindexAdd] = useState(0);
    const [locations, setLocations] = useState(null);
    // Control what data is sent to the modal
    const [detailsdModalData, setDetailsModalData] = useState(null);
    /**Open or close the event details modal modal
     * @param val If the modal is open or not
     * @param data The data to send to the pop-up modal
     */

    if(!locations) {
        getLocations().then(res => {
            setLocations(res);
        })
    }
    
    const setEventDetailsModalOpen = (val: boolean, data: any) => {
        setEventDetailsModal(val);
        setDetailsModalData(data);
    }

    const initState = () => {
        setItineraryData(props.navigation.state.params.data);
        setEvents(props.navigation.state.params.data.events);
        setInitialized(true);
    }

    const saveBackup = () => {
        let bckup = JSON.parse(JSON.stringify(props.navigation.state.params.data));
        if (events) {
            bckup.events = events
        }
        setBackup(bckup);
    }

    const saveChanges = () => {
        saveBackup();
        setEditFields(false);
    }

    const discardChanges = () => {
        setItineraryData(backup);
        setEvents(backup.events);
        setEditFields(false);
    }

    const setTitle = (e) => {
        itinerayData.name = e;
    }

    const removeItem = (index) => {
        const copy = [...events];
        copy.splice(index, 1);
        setEvents(copy);
    }

    const openAddEventModal = (index) => {
        setChooseEventModal(true);
        setindexAdd(index);
    }

    const addItem = (location) => {
        const copy = [...events];
        const l = copy.slice(0, indexAdd + 1)
        const r = copy.slice(indexAdd + 1, copy.length);
        setEvents([].concat(l, [location], r));
    }

    if (props.navigation.state.params.data && !initialized) {
        initState();
        saveBackup();
    }

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                {initialized && <Body>
                    {editFields && <Input onChangeText={(e) => setTitle(e)}><Title>{itinerayData.name}</Title></Input>}
                    {!editFields && <Title>{itinerayData.name}</Title>}
                </Body>}
                {initialized && <Right>
                    {editFields && <Button onPress={() => saveChanges()}>
                        <Icon name="save" />
                    </Button>}
                    {editFields && <Button onPress={() => discardChanges()}>
                        <Icon name="ios-close" />
                    </Button>}
                    {!editFields && <Button onPress={() => setEditFields(true)}>
                        <Icon name="create" />
                    </Button>}
                </Right>}
            </Header>
            <ScrollView>
                <View style={styles.floatingContainter}>
                    {editFields && <Button rounded style={[styles.floatingButton, styles.headerButton]} onPress={() => openAddEventModal(-1)}>
                        <Icon name="ios-add" />
                    </Button>}
                </View>
                {initialized && events.map((event, index) => {
                    
                    return (
                        <View>
                            <TouchableOpacity onPress={() => setEventDetailsModalOpen(true, event)} key={index}>
                                <Card
                                        image={{uri: event.imageURL}}>
                                        <Text style={styles.eventHeader}>
                                            {event.Name}
                                        </Text>
                                        
                                        <View style={styles.cardBody}>
                                            {event.AvgPrice && <Text>Pricing: ${event.AvgPrice.toString()}</Text>}
                                            {event.GroupSize && <Text>Accomodation: up to {event.GroupSize} people</Text>}
                                            {event.Address && <Text>Address: {event.Address.Number}, {event.Address.Street}, {event.Address.City}</Text>}
                                            
                                            {event.StartTime && <Text>Starting Time: {JSON.stringify(event.StartTime).substring(12, 17)}</Text>}
                                            {event.EndTime && <Text>Ending Time: {JSON.stringify(event.EndTime).substring(12, 17)}</Text>}
                                        </View>
                                    </Card>
                            </TouchableOpacity>
                            <Text />
                            <View style={styles.floatingContainter}>
                                {editFields && <Button rounded style={styles.floatingButton} onPress={() => openAddEventModal(index)}>
                                    <Icon name="ios-add" />
                                </Button>}
                                {editFields && <Button rounded danger style={styles.floatingButton} onPress={() => removeItem(index)}>
                                    <Icon name="ios-close" />
                                </Button>}
                            </View>
                            <Text />
                        </View>
                    )
                })}
                
            </ScrollView>
            {initialized && eventDetailsModalOpen && <LocationDetails location={detailsdModalData} open={eventDetailsModalOpen} setModal={setEventDetailsModal} />}
            {initialized && chooseEventModalOpen && <EventsSelector locations={locations} addLocation={addItem} open={chooseEventModalOpen} setModal={setChooseEventModal} />}
        </Container>
    );
}
