import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Text, Button, Icon } from 'native-base';
import { View, Modal, ViewComponent, TouchableWithoutFeedback } from 'react-native';
import styles from './viewItinerariesStyles';

export default function viewItinerariesPage(props){
    const itineraries = require("./MockItineraryList.json"); 
    return(
        <Container>
        <View style={styles.Container}>
            
            </View>
        </Container>

    )
}