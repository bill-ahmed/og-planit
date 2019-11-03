import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Text, Button, Icon, Subtitle } from 'native-base';

import styles from './LocationDetailStyles';
import { View, Modal, ViewComponent, TouchableWithoutFeedback } from 'react-native';
import GMap from'./../GMap/GMap';

 const events = require("./../../models/MockLocationDatabase.json");

export default function LocationDetails(props){
    const [locations, setLocations] = useState(null);

    const getAddress = () => {
        let result;
        for (let [key,value] of Object.entries(events)){
            result = "Address: " + events[key].Address.Number + " "+ events[key].Address.Street + ", " + events[key].Address.City + " " + events[key].Address.Province + " " +
             events[key].Address.Country;
        }
        return <Text> {result} </Text>; 
    }
    const getEventInfo = () => {
        let result;
        for (let [key,value] of Object.entries(events)){
            result = " Details: " + events[key].Description + "\n" + " Average Cost: " + events[key].AvgPrice + "\n" + 
            " Start Time: " + events[key].StartTime + "\n" + "End Time: " + events[key].EndTime + "\n"
            + " Contact Infromation:" + "\n" + " Phone Number: " + events[key].ContactInfo.Phone + "\n" + " Email: " + events[key].ContactInfo.Email
        }
        return <Text> {result} </Text>
    }
    const getEventName = () => {
        let result;
        for (let [key,value] of Object.entries(events)){
            result = events[key]
        }
        return <Text> {result} </Text>
    }
    return (
            <Modal transparent={true} visible={props.locationDetailsOpen} presentationStyle="overFullScreen" onRequestClose={props.closeModal} animationType="fade" >
                <View style={styles.container}>
                <Container>
                    <Button transparent onPress={props.closeModal}>
                        <Icon name="arrow-back"/>
                        
                    </Button>
                    {/* {onRequestClose={() => props.closeModal} */}
                    <Content>
                    {/* {events.Frosh2020.Address.map(elems => {
                                    return <Text> {elems} </Text>
                                })} */}
                    {getEventName()}
                    {getAddress()}
                    {getEventInfo()}
                    </Content>
                </Container>
                </View>
            </Modal>

    );
        
}