import React, { useState } from 'react';
import { Container, Text, Button, Content, Form, Item, Input, Icon, Label, Header, Left, Right, Body, Title } from 'native-base';
import firebase from 'firebase';
import { AsyncStorage } from 'react-native';

export default function Home(props){
    const [accessToken, setToken] = useState(null);

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

    /**Retrieve access token from local storage */
    const getAccessToken = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            return token;
        } catch (error) {
            console.log(error);
        }
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

                <Button onPress={() => {getAccessToken().then(resp => setToken(resp))}}>
                    <Text>Print access token</Text>
                </Button>

                <Button onPress={() => logout()}>
                    <Text>Logout</Text>
                </Button>

                <Text>{accessToken}</Text>
            </Content>
        </Container>
    );
}