import React, { Component, useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon, View, Spinner } from 'native-base';

import styles from './CreateViewsStyles';
import { Text, ScrollView, TextInput, TouchableOpacity, ColorPropType, Platform, Modal } from 'react-native';
import { Card, Input, Overlay } from 'react-native-elements';
import LocationDetails from '../../../shared/component/LocationDetails/LocationDetails';
import EventsSelector from '../eventsSelector/eventsSelector';
import { Itinerary } from '../../models/location';
import { getLocations } from '../../../maps/api/locationsAPI';
import { httpPost } from '../../../shared/services/http';
import { useSelector } from 'react-redux';
import { combineLatest } from 'rxjs';

export default function CreateViews(props) {
    // Control if modal is open or not
    const accessToken = useSelector(state => state['UserInfo']['accessToken']);
    const uid = useSelector(state => state['UserInfo']['uid']);
    const [eventDetailsModalOpen, setEventDetailsModal] = useState(false);
    const [chooseEventModalOpen, setChooseEventModal] = useState(false);
    const [editFields, setEditFields] = useState(false);
    const [itinerayData, setItineraryData] = useState(null);
    const [events, setEvents] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [backup, setBackup] = useState(null);
    const [indexAdd, setindexAdd] = useState(0);
    const [locations, setLocations] = useState(null);
    const [updating, setUpdating] = useState(false);
    // Control what data is sent to the modal
    const [detailsdModalData, setDetailsModalData] = useState(null);
    /**Open or close the event details modal modal
     * @param val If the modal is open or not
     * @param data The data to send to the pop-up modal
     */

    if (!locations) {
        getLocations().then(res => {
            setLocations(res);
        })
    }

    const setEventDetailsModalOpen = (val: boolean, data: any) => {
        setEventDetailsModal(val);
        setDetailsModalData(data);
    }

    const initState = () => {
        setEvents(props.data.events);
        setItineraryData(props.data);
        setInitialized(true);
    }

    const saveBackup = (elem) => {
        let bckup = JSON.parse(JSON.stringify(elem));
        if (events) {
            bckup.events = events
        }
        setBackup(bckup);
    }

    const saveChanges = () => {
        saveBackup(itinerayData);
        setEditFields(false);
        let copy = JSON.parse(JSON.stringify(itinerayData));
        copy.events = null;
        setUpdating(true);
        combineLatest(
            httpPost('deleteItinerary',
                {
                    accessToken: accessToken,
                    itineraryId: copy.id
                },
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
            httpPost('createItinerary',
                {
                    accessToken: accessToken,
                    uid: uid,
                    itineraryDetails: copy,
                    events: events
                },
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                })
        ).subscribe((res: any[]) => {
            res[1].json().then((json => {
                copy.id = json;
                setItineraryData(copy);
                props.data.events = events;
                setUpdating(false);
                props.reloadItineraries()
            }));
        });
    }

    const discardChanges = () => {
        setItineraryData(backup);
        setEvents(backup.events);
        setTitle(backup.name);
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

    if (props.data && !initialized) {
        initState();
        saveBackup(props.data);
    }

    // Check if user is in android/iOS platform so we can restrict write operations
    const mobilePlatform = Platform.OS === "android" || Platform.OS === "ios";

    return (
        <Modal animationType="slide" transparent={false} visible={props.open} presentationStyle="overFullScreen" onRequestClose={() => props.close()}>
            <Container>
                <Header>
                    <Left>
                        {!editFields &&
                            <Button transparent onPress={() => props.close()}>
                                <Icon name="arrow-back" />
                            </Button>
                        }
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
                        {!editFields && mobilePlatform &&
                            <Button onPress={() => setEditFields(true)}>
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
                            <View key={index}>
                                <TouchableOpacity onPress={() => setEventDetailsModalOpen(true, event)}>
                                    <Card
                                        image={{ uri: event.imageURL }}>
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
                {updating && <Overlay isVisible><Spinner color='blue' /></Overlay>}
            </Container>
        </Modal>
    );
}
