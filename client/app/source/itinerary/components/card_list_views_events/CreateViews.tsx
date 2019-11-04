import React, { Component, useState } from 'react';
import {Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon } from 'native-base';
import {Rating} from 'react-native-ratings';

import styles from './CreateViewsStyles';
import { View, Text, ScrollView, Dimensions, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Card, ListItem} from 'react-native-elements';
import Image from 'react-native-scalable-image';
import EventDetailsModal from './EventDetailsModal';
import ItineraryName from '../ItineraryName/ItineraryName';
import { EventEmitter } from '@unimodules/core';
import { array } from 'prop-types';
import { database } from 'firebase';

export default function CreateViews(props){
    // Control if modal is open or not
    const [eventDetailsModalOpen, setEventDetailsModal] = useState(false);

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

    const changeName = (val: boolean) => {
        ItineraryName(val);
    }

    const itineraryInfo = props.navigation.state.params.data
    const json = itineraryInfo.events //require("../ratings/mockDatabase.json");

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
                        {itineraryInfo.name}
                    </Title>
                    <Subtitle>
                        Events
                    </Subtitle>
                </Body>
                <Right>
                    <Button onPress={() => changeName(true)}>
                        <Icon name="create"/>
                    </Button>
                </Right>
            </Header>
            <ScrollView>
                {json.map(event => {
                    return(
                        <TouchableOpacity onPress={() => setModalOpen(true, event)}>
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
            {eventDetailsModalOpen && <EventDetailsModal data={detailsdModalData} closeModal={() => setModalOpen(false, null)}/>}
        </Container>
    );
}
