import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Text, Button, Icon } from 'native-base';
import { View, Modal, ViewComponent, TouchableWithoutFeedback } from 'react-native';
import styles from './viewItinerariesStyles';
import { setRecoveryProps } from 'expo/build/ErrorRecovery/ErrorRecovery';

export default function viewItinerariesPage(props){
    const itineraries = require("./MockItineraryList.json"); 
    const getItineraries = () => {
        let result = [];
        for (let [key, value] of Object.entries(itineraries)){
            result.push(itineraries[key])
        }
        return result
    }
    

    return(
        <Container>
            <View style={styles.container}>
                <Content>
                {getItineraries()};
                getItineraries.forEach(element => {
                    <Container /*onpress= carlos' function to the events list */ >
                        <View style={styles.innerContainer}>
                            <Content>
                                <Text>getItineraries[element].name </Text>
                                <Text>getItineraries[element].last_edit_time</Text>
                                

                            </Content>
                        </View>
                    </Container>
                });
                </Content>
            </View>
        </Container>

    )
}