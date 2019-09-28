import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Container, Text, Button, Content, Header, Left, Right, Body, Title } from 'native-base';
import firebase from 'firebase';

/**Home page for user after authenticating */
export default function Home(props){
    const [token, setToken] = useState('');
    const accessToken = useSelector(state => state.UserInfo.accessToken);

    /**Logout the current user, and go to AuthLoading navigator. */
    const logout = () => {
        firebase.auth().signOut()
        .then(res => {
            // Navigate to start of application
            props.navigation.navigate('Auth');
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