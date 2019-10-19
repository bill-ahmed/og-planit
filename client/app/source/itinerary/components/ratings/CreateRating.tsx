import React, { Component, useState } from 'react';
import {Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon } from 'native-base';
import {Rating} from 'react-native-ratings';

import styles from './CreateRatingStyles';
import { View, Image, Text, ScrollView } from 'react-native';
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

            
            <Content contentContainerStyle={styles.container} padder>

                <ScrollView>
                    <View style={styles.ratingHeader}>
                        <Text style={{fontSize: 28}}>Let us know how you liked your past trips!</Text>
                    </View>

                    {data.map(event => {
                        return <View style={styles.content}>
                                    <View style={styles.container}>
                                        <Text>
                                            <Text style={styles.eventHeader}>
                                                {event.name}
                                            </Text>
                                        </Text>
                                
                                        <Image
                                            style={{width: 400, height: 300}}
                                            source={event}
                                            resizeMode="stretch"
                                        />
                                        
                                    </View>
                                
                                    <View style={styles.ratingContainer}>
                                        <Rating
                                            showRating
                                            startingValue={0}
                                            imageSize={28}
                                            onFinishRating={rate => setRating(rate)}/>
                                    </View>
                                 </View>
                    })}
                </ScrollView>

            </Content>
        </Container>
    );
}