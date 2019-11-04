import React, { Component, useState } from 'react';
import {Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon } from 'native-base';
import {Rating} from 'react-native-ratings';

import styles from './ItineraryNameStyles';
import { View, TextInput, Text, ScrollView, Dimensions, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Card, ListItem} from 'react-native-elements';
import Image from 'react-native-scalable-image';
import { EventEmitter } from '@unimodules/core';
import { array } from 'prop-types';
import { database } from 'firebase';


export default function ItineraryName(props) {

    return( <Container>
        <Header noLeft>
            <Left>
                <Button transparent onPress={() => props.navigation.goBack()}>
                    <Icon name="arrow-back"/>
                </Button>
            </Left>
            <Body>
                <Title>
                    <TextInput style={styles.textInput} 
                        keyboardType="default" 
                        placeholder="Rename" />
                </Title>
                <Subtitle>
                    Events
                </Subtitle>
            </Body>
            <Right>
            </Right>
        </Header>
    </Container>)
}
