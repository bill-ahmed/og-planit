import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setAccessToken} from './source/login/redux/actions'
import { Container, Text, Button, Content, Header, Left, Right, Body, Title } from 'native-base';
import firebase from 'firebase';
import styles from './HomeStyles';

/**Home page for user after authenticating */
export default function Home(props){
    const [token, setToken] = useState('');
    const accessToken = useSelector(state => state['UserInfo']['accessToken']);
    const {navigate} = props.navigation;    // Handle navigations

    const dispatch = useDispatch();


    /**Logout the current user, and go to AuthLoading navigator. */
    const logout = () => {
        firebase.auth().signOut()
        .then(res => {
            // Navigate to start of application
            navigate('Auth');
        })
        .catch(err => {
            alert("Error logging out. Check console for details");
            console.log(err);
        });
    }

    const goToItinerary = () => {
        navigate('Itinerary');
    }

    const goToCreateRatingsPage = () => {
        navigate('CreateRating');
    }

    const getToken = () => {
        console.log(accessToken);
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
                <Right />
            </Header>
            <Content padder>

                <Button info style={styles.button} onPress={() => {getToken()}}>
                    <Text>Show access token</Text>
                </Button>

                <Button style={styles.button} onPress={() => goToItinerary()}>
                    <Text>Itinerary Page</Text>
                </Button>

                <Button style={styles.button} onPress={() => goToCreateRatingsPage()}>
                    <Text>Create Ratings Page</Text>
                </Button>

                <Button danger style={styles.button} onPress={() => logout()}>
                    <Text>Logout</Text>
                </Button>

                <Text>{token}</Text>
            </Content>
        </Container>
    );
}