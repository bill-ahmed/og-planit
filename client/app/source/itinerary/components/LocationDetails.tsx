import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Text, Button, Icon, Subtitle } from 'native-base';

import styles from './LocationDetailStyles';
import { View, Modal, ViewComponent } from 'react-native';
import GMap from'./GMap';

 const events = require("./MockLocationDatabase.json");

export default function LocationDetails(props){
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
            result = "Details: " + events[key].Description + "\n"
        }
    }
    return (
      
            <Modal transparent={true} visible={props.locationDetailsOpen} presentationStyle="overFullScreen" onRequestClose={props.closeModal} animationType="fade" >
                <View style={styles.container}>
                <Container>
                    <Button transparent onPress={props.closeModal}>
                        <Icon name="arrow-back"/>
                        
                    </Button>
                    <Content>
                    {/* {events.Frosh2020.Address.map(elems => {
                                    return <Text> {elems} </Text>
                                })} */}
                    {getAddress()}
                    {getEventInfo()}
                    </Content>
                </Container>
                </View>
            </Modal>
            
    );
        
}