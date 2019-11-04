import React, { useState } from 'react';
import { Text, View, Container, Header, Left, Button, Icon, Title, Right, Body, Content, Form } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import styles from './LocationDetailStyles';
import { Modal } from 'react-native';

const events = require("./../../models/MockLocationDatabase.json");

export default function LocationDetails(props) {

    return (
        <Modal animationType="slide" transparent={false} visible={props.open} presentationStyle="overFullScreen" onRequestClose={() => props.setModal(false)}>
            <View style={styles.container}>
                <Container>
                    {/* Header content */}
                    <Header noShadow style={styles.header}>
                        <Left>
                            {/* Close the pop-up modal */}
                            <Button transparent onPress={() => props.setModal(false)}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Sign up</Title>
                        </Body>

                        <Right />
                    </Header>

                    {/* Main body content */}
                    <Content style={styles.content} padder>
                        <Text style={{ color: 'white' }}>
                            Fill out below to get started. All fields with a (*) are required!
                </Text>
                        <Form style={{ width: '90%', flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                            <View>
                            </View>
                        </Form>
                    </Content>
                </Container>
            </View>
        </Modal>
    );

}