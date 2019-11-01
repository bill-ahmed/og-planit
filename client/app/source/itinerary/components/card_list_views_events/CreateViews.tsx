import React, { Component, useState } from 'react';
import {Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon } from 'native-base';
import {Rating} from 'react-native-ratings';

import styles from './CreateViewsStyles';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';
import { EventEmitter } from '@unimodules/core';
export default function CreateViews(props){

    return(
        <Container>
            <Header noLeft>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back"/>
                    </Button>
                </Left>
                <Body>
                    <Title>
                        Itinerary 1
                    </Title>
                    <Subtitle>
                        Events
                    </Subtitle>
                </Body>
                <Right/>
            </Header>

        </Container>
    );
}
