import React, { Component, useState } from 'react';
import {Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon } from 'native-base';
import {Rating} from 'react-native-ratings';

import styles from './CreateViewsStyles';
import { View, Text, ScrollView, Dimensions, Modal, TouchableHighlight } from 'react-native';
import { Card, ListItem} from 'react-native-elements';
import Image from 'react-native-scalable-image';
import { EventEmitter } from '@unimodules/core';
import { array } from 'prop-types';
import { database } from 'firebase';
export default function CreateViews(props){

    const json = require("../ratings/mockDatabase.json");

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
            <ScrollView>
                {json.map(event => {
                    return(
                        <Card
                            image={{uri: event.uri}}>
                            <Text style={styles.eventHeader}>
                                {event.Name}
                            </Text>
                            <Text>
                                {"$" + event.AvgPrice + "\n"}
                                {event.Address.Number + " " + event.Address.Street + ", " + event.Address.City + ", " + event.Address.Province + "\n"}
                                {event.StartTime + " - " + event.EndTime}
                            </Text>

                        </Card>
                    )
                    })}
            </ScrollView>

        </Container>
    );
}
