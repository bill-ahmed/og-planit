import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Modal, TouchableHighlight } from 'react-native';
import {Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon } from 'native-base';
import styles from './EventDetailsModalStyles';
import Image from 'react-native-scalable-image';

export default function CreateEventDetailsModal(props){
    // All info needed to populate
    const data = props.data;

    return(
        <Modal animationType="fade" transparent={false} visible={props.open} presentationStyle="overFullScreen" onRequestClose={() => props.closeModal()}>
            <View style={styles.container}>
                <Container>
                    {/* Header content */}
                    <Header noShadow>
                        <Left>
                            {/* Close the pop-up modal */}
                            <Button transparent onPress={() => props.closeModal()}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{data.Name}</Title>
                        </Body>

                        <Right />
                    </Header>

                    {/* Main body content */}
                    <Content padder>
                        <View style={styles.container}>
                            <Image
                                width={Dimensions.get('window').width}
                                source={{uri: data.uri}}
                            />
                        </View>
                        <Text style={styles.textHeader}>About:</Text>
                        <Text style={styles.textBody}>{data.Description}</Text>
                        <Text style={styles.criticalInfo}>
                            {"Pricing: $" + data.AvgPrice + "\nAverage Time Spent: " + data.AvgTimeSpent + "\nStart Time: " + data.StartTime + "\nEnd Time: " + data.EndTime }
                        </Text>
                        <Text style={styles.textHeader}>Contact information:</Text>
                        <Text style={styles.textBody}>{data.ContactInfo.Email + "\n" + data.ContactInfo.Phone}</Text>
                        <Text style={styles.textBody}>{`${data.Address.Number} ${data.Address.Street}, ${data.Address.City} ${data.Address.Province}, ${data.Address.Country}`}</Text>
                    </Content>
                </Container>
            </View>
        </Modal>
    );
}