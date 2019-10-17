import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Text, Button, Icon, Subtitle } from 'native-base';

import styles from './ItineraryStyles';
import { View } from 'react-native';
import GMap from'./GMap';

export default function LocationDetails(props){
    return (
        <Container>
            <Header>
                <Body>
                    <Title>
                        University of Toronto Scarborough
                    </Title>
                        <Subtitle>
                            Toronto Ontario
                        </Subtitle>
                    <Content>
                        Address: 1265 Military Trail
                    </Content>
                </Body>
            </Header>
        </Container>
    );
        
}