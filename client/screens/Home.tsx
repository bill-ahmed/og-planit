import React, { useState } from 'react';
import { Container, Text, Button, Content, Form, Item, Input, Icon, Label, Header, Left, Right, Body, Title } from 'native-base';
import firebase from 'firebase';

export default function Home(props){

    /**Logout the current user, and go to AuthLoading navigator. */
    const logout = () => {
        firebase.auth().signOut()
        .then(res => {
            alert("Signed out!");
            props.navigation.navigate('AuthLoading');
        })
        .catch(err => {
            alert("Error logging out. Check console for details");
            console.log(err);
        });
    }
    return(
        <Container>
            <Header noLeft>
                <Left/>
                <Body>
                    <Title>
                        Home Page!
                    </Title>
                </Body>
                <Right/>
            </Header>
            <Content padder>
                <Text>Home screen.</Text>
                <Button onPress={() => logout()}>
                    <Text>Logout</Text>
                </Button>
            </Content>
        </Container>
    );
}