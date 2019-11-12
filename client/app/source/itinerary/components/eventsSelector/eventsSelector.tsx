import React, { useState } from 'react';
import { Text, View, Container, Header, Left, Button, Icon, Title, Right, Body, Content} from 'native-base';
import styles from './eventsSelectorStyles';
import { Modal } from 'react-native';

export default function EventsSelector(props) {

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
                            <Title>Select Event</Title>
                        </Body>
                        <Right></Right>
                    </Header>

                    {/* Main body content */}
                    <Content style={styles.content} padder>
                        <Container style={styles.containerContent}>
                        </Container>
                    </Content>
                </Container>
            </View>
        </Modal>
    );
}