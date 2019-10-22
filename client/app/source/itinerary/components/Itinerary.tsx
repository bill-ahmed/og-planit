import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Text, Button, Icon } from 'native-base';

import styles from './ItineraryStyles';
import { View } from 'react-native';
import GMap from './GMap';
import LocationDetails from './LocationDetails';
import Cards from "./Cards";
export default function Itinerary(props){
    const [locationDetailsOpen, setLocationDetailsOpen] = useState(false);
    
    return(
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back"/>
                    </Button>
                </Left>
                <Body>
                    <Title>
                        Itinerary Page
                    </Title>
                </Body>
                <Right/>
            </Header>

            
            <Content padder>
                <Text>
                    Look at mockup for inspiration ~
                </Text>
                
                {<GMap openLocationDetails={e => setLocationDetailsOpen(true)} />}
                {/* <Cards/> */}
            </Content>
            {/*close modal is the function i passed in */}
            {locationDetailsOpen && <LocationDetails open={locationDetailsOpen} closeModal={e => setLocationDetailsOpen(false)}/>}
        </Container>
    );
}