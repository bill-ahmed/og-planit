import React, { Component, useState } from 'react';
import {Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon, Input } from 'native-base';

import styles from './CreateViewsStyles';
import { View, Text, ScrollView, Dimensions, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Card, ListItem} from 'react-native-elements';
import LocationDetails from '../../../shared/component/LocationDetails/LocationDetails';

export default function CreateViews(props){
    // Control if modal is open or not
    const [eventDetailsModalOpen, setEventDetailsModal] = useState(false);
    const [editFields, setEditFields] = useState(false);
    const [itinerayData, setItineraryData] = useState(null);
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

    const itineraryInfo = props.navigation.state.params.data
    const json = itineraryInfo.events //require("../ratings/mockDatabase.json");

    if(!itinerayData) {
        setItineraryData(itineraryInfo);
    }

    return(
        <Container>
            <Header noLeft>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back"/>
                    </Button>
                </Left>
                <Body>
                    <Title>
                        {itinerayData && <Input editable={editFields} value={itinerayData.name} placeholder="Title"/>}
                        {itineraryInfo.name}
                    </Title>
                    <Subtitle>
                        Events
                    </Subtitle>
                </Body>
                <Right>
                    <Button onPress={() => setEditFields(true)}>
                        <Icon name="create"/>
                    </Button>
                </Right>
            </Header>
            <ScrollView>
                {json.map((event, index) => {
                    return(
                        <TouchableOpacity onPress={() => setModalOpen(true, event)} key={index}>
                            <Card
                                image={{uri: event.uri}}>
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
                    )
                    })}
            </ScrollView>
            {eventDetailsModalOpen && <LocationDetails location={detailsdModalData} open={eventDetailsModalOpen} setModal={setEventDetailsModal} />}
        </Container>
    );
}
