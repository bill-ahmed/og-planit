import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Text } from 'native-base';

import styles from './ItineraryStyles';
import { View } from 'react-native';

export default function Itinerary(props){
    return(
        <Container>
            <Header noLeft>
                <Left/>
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
            </Content>
        </Container>
    );
}