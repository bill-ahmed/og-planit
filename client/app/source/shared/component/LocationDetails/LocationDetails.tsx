import React, { useState } from 'react';
import { Text, View, Container, Header, Left, Button, Icon, Title, Right, Body, Content, Form } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import styles from './LocationDetailStyles';
import { Modal, FlatList } from 'react-native';
import { PlanitLocation, Address } from '../../../itinerary/models/location';

const events = require("./../../../maps/models/MockLocationDatabase.json");

export default function LocationDetails(props) {
    const locObj: PlanitLocation = props.location;

    const formRow = (header, text, styleValue = styles.h18) =>
        <View>
            <Text style={[styles.h14, styles.Text]}>
                {header}
            </Text>
            <Text style={[styleValue, styles.Text]}>
                {text}
            </Text>
        </View>

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
                            <Title>Location Details</Title>
                        </Body>
                        <Right></Right>
                    </Header>

                    {/* Main body content */}
                    <Content style={styles.content} padder>
                        <Container style={styles.containerContent}>
                            {locObj.Name && formRow("Name: ", locObj.Name, styles.h24)}
                            {locObj.Name && <Text />}
                            {locObj.Type && formRow("Type of Activity: ", locObj.Type)}
                            {locObj.Tags && formRow("Tags: ", locObj.Tags.map((tag, index) => {
                                if ((index + 1) === locObj.Tags.length) {
                                    return tag;
                                } else {
                                    return tag + ", "
                                }
                            }, styles.h14))}
                            {locObj.Tags && locObj.Type && <Text />}
                            {locObj.Ratings && formRow("Average Rating: ", locObj.Ratings.AveRatings)}
                            {locObj.Ratings && <Text />}
                            {locObj.AvgPrice && formRow("Average Price: ", locObj.AvgPrice)}
                            {locObj.AvgPrice && < Text />}
                            {locObj.StartTime && locObj.EndTime && formRow("Active From: ", locObj.StartTime.toLocaleString() + " :")}
                            {locObj.AvgTimeSpent && <Text style={[styles.h18, styles.Text]}>
                                {"\t\t" + locObj.EndTime.toLocaleString()}
                            </Text>}
                            {locObj.StartTime && locObj.EndTime && locObj.AvgTimeSpent && <Text />}
                            {locObj.Address && formRow("Address: ", locObj.Address.Number + " " + locObj.Address.Street + ", " + locObj.Address.City)}
                            {locObj.Address && <Text />}
                            {locObj.Description && formRow("Description: ", locObj.Description)}
                            {locObj.Description && <Text />}
                            {locObj.ContactInfo && formRow("Phone: ", locObj.ContactInfo.Phone)}
                            {locObj.ContactInfo && formRow("Email: ", locObj.ContactInfo.Email)}

                        </Container>
                    </Content>
                </Container>
            </View>
        </Modal>
    );

}