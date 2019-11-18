import React, { useState } from 'react';
import { Text, View, Container, Header, Left, Button, Icon, Title, Right, Body, Content, Card, List, ListItem } from 'native-base';
import styles from './eventsSelectorStyles';
import { Modal, TouchableOpacity } from 'react-native';
import LocationDetails from '../../../shared/component/LocationDetails/LocationDetails';
import { PlanitLocation } from '../../models/location';

export default function EventsSelector(props) {
    const [init, setInit] = useState(false);
    const [locations, setLocations] = useState(null);
    const [eventDetailsModalOpen, setEventDetailsModal] = useState(false);
    const [detailsdModalData, setDetailsModalData] = useState(null);

    const setEventDetailsModalOpen = (val: boolean, data: any) => {
        setEventDetailsModal(val);
        setDetailsModalData(data);
    }

    const addLocation = (location: PlanitLocation) => {
        if(props.addLocation) {
            props.addLocation(location);
        }
        props.setModal(false);
    }

    if (!init && props.locations) {
        setLocations(props.locations);
        setInit(true);
    }

    return (
        <Modal animationType="slide" transparent={false} visible={props.open} presentationStyle="overFullScreen" onRequestClose={() => props.setModal(false)}>
            <View style={styles.container}>
                <Container>
                    {/* Header content */}
                    <Header noShadow style={styles.header}>
                        <Left>
                            {/* Close the pop-up modal */}
                            <Button transparent onPress={() => props.setModal(false)}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Select Event</Title>
                        </Body>
                        <Right></Right>
                    </Header>

                    {/* Main body content */}
                    <Content style={styles.content} padder>
                        <List>
                            {init && locations && locations.map((location, index) =>
                                <ListItem key={index}>
                                    <Button light icon bordered style={styles.floatingButton} onPress={() => addLocation(location)}>
                                        <Icon name="ios-add" />
                                    </Button>
                                    <TouchableOpacity onPress={() => setEventDetailsModalOpen(true, location)}>
                                        <View>
                                            <Text style={[styles.eventHeader, styles.Text]}>
                                                {location.Name}
                                            </Text>
                                            <Text style={styles.Text}>
                                                {location.AvgPrice && "$" + location.AvgPrice + "\n"}
                                                {location.Address &&
                                                    location.Address.Number + " " + location.Address.Street + ", " + location.Address.City + ", " + location.Address.Province + "\n"}
                                                {location.StartTime && location.EndTime && location.StartTime + " to\n" + location.EndTime}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                </ListItem>
                            )}
                        </List>
                    </Content>
                </Container>
            </View>
            {init && eventDetailsModalOpen && <LocationDetails location={detailsdModalData} open={eventDetailsModalOpen} setModal={setEventDetailsModal} />}
        </Modal >
    );
}