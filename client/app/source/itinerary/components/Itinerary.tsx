import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Button, Icon } from 'native-base';

import GMap from './GMap';
import LocationDetails from './LocationDetails';
import { getLocations } from '../api/locationsAPI';

export default function Itinerary(props) {
    
    const [locationDetailsOpen, setLocationDetailsOpen] = useState(false);
    const [locationsLoaded, setlocationsLoaded] = useState(false);
    let locations = null;
    getLocations().then(res => {
        locations = res;
        setlocationsLoaded(true);
    });

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        Itinerary Page
                    </Title>
                </Body>
                <Right />
            </Header>


            <Content padder>
                {<GMap openLocationDetails={e => setLocationDetailsOpen(true)} />}
            </Content>
            {locationsLoaded && locationDetailsOpen && <LocationDetails list={locations} open={locationDetailsOpen} closeModal={e => setLocationDetailsOpen(false)} />}
        </Container>
    );
}