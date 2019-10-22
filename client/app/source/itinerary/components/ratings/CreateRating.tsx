import React, { Component, useState } from 'react';
import {Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon } from 'native-base';
import {Rating} from 'react-native-ratings';

import styles from './CreateRatingStyles';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';
import { EventEmitter } from '@unimodules/core';

export default function CreateRating(props){
    const [rating, setRating] = useState(0);
    const data = require("./mockDatabase.json");

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
                        Reviews
                    </Title>
                    <Subtitle>
                        Past trips
                    </Subtitle>
                </Body>
                <Right/>
            </Header>

            

            <ScrollView>
                <View style={styles.ratingHeader}>
                    <Text style={{ fontSize: 28 }}>Let us know how you liked your past trips!</Text>
                </View>

                {data.map(event => {
                    return (
                        <View style={styles.container}>
                            <View style={styles.content}>
                                <Text>
                                    <Text style={styles.eventHeader}>
                                        {event.name}
                                    </Text>
                                </Text>

                                <Rating
                                    showRating
                                    startingValue={0}
                                    imageSize={28}
                                    onFinishRating={rate => setRating(rate)} />

                            </View>

                            <View>
                                <Image
                                    width={Dimensions.get('window').width}
                                    source={event}

                                />
                            </View>
                        </View>
                    )
                })}
            </ScrollView>


        </Container>
    );
}