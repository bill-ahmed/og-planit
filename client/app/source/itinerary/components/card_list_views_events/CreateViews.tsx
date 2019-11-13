import React, { Component, useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon, View } from 'native-base';

import styles from './CreateViewsStyles';
import { Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Card, Input } from 'react-native-elements';
import LocationDetails from '../../../shared/component/LocationDetails/LocationDetails';

export default function CreateViews(props) {
    // Control if modal is open or not
    const [eventDetailsModalOpen, setEventDetailsModal] = useState(false);
    const [editFields, setEditFields] = useState(false);
    const [itinerayData, setItineraryData] = useState(null);
    const [events, setEvents] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [backup, setBackup] = useState(null);
    // Control what data is sent to the modal
    const [detailsdModalData, setDetailsModalData] = useState(null);
    /**Open or close the event details modal modal
     * @param val If the modal is open or not
     * @param data The data to send to the pop-up modal
     */
    const setModalOpen = (val: boolean, data: any) => {
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
        setBackup(bckup);
    }

    const saveChanges = () => {
        saveBackup();
        setEditFields(false);
    }

    const discardChanges = () => {
        itinerayData.name = backup.name;
        setEditFields(false);
    }

    const setTitle = (e) => {
        itinerayData.name = e;
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
                {initialized && events.map((event, index) => {
                    return (
                        <TouchableOpacity onPress={() => setModalOpen(true, event)} key={index}>
                            <Card
                                image={{uri: event.imageURL}}>
                                <Text style={styles.eventHeader}>
                                    {event.Name}
                                </Text>
                                <View style={styles.cardBody}>
                                    <Text>${event.AvgPrice.toString()}</Text>
                                    {event.Address && <Text>Address: {event.Address.Number}, {event.Address.Street}, {event.Address.City}</Text>}
                                    {event.StartTime && <Text>Starting Time: {event.StartTime.toLocaleTimeString()}</Text>}
                                    {event.EndTime && <Text>Ending Time: {event.EndTime.toLocaleTimeString()}</Text>}
                                </View>
                            </Card>
                        </TouchableOpacity>
                        
                    )
                })}
            </ScrollView>
            {initialized && eventDetailsModalOpen && <LocationDetails location={detailsdModalData} open={eventDetailsModalOpen} setModal={setEventDetailsModal} />}
        </Container>
    );
}
