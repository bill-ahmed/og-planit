import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Modal, TouchableHighlight } from 'react-native';
import {Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon } from 'native-base';
import styles from './EventDetailsModalStyles';


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
                        <Text>Some more detailed info:</Text>
                        <Text>{data.Description}</Text>
                        <Text>{`${data.Address.Number} ${data.Address.Street}, ${data.Address.City} ${data.Address.Province}, ${data.Address.Country}`}</Text>
                    </Content>
                </Container>
            </View>
        </Modal>
    );
}