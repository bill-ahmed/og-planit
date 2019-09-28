import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { getAccessToken } from '../redux/actions';
import { Container, Text, Button, Content, Header, Left, Right, Body, Title } from 'native-base';
import firebase from 'firebase';
import { AsyncStorage } from 'react-native';

export default function Home(props){
    const [token, setToken] = useState('');
    const accessToken = useSelector(state => state.UserInfo.accessToken);

    /**Logout the current user, and go to AuthLoading navigator. */
    const logout = () => {
        firebase.auth().signOut()
        .then(res => {
            // Navigate to start of application
            props.navigation.navigate('AuthLoading');
        })
        .catch(err => {
            alert("Error logging out. Check console for details");
            console.log(err);
        });
    }

    const getToken = () => {
        setToken(accessToken);
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

                <Button onPress={() => {getToken()}}>
                    <Text>Show access token</Text>
                </Button>

                <Button onPress={() => logout()}>
                    <Text>Logout</Text>
                </Button>

                <Text>{token}</Text>
            </Content>
        </Container>
    );
}