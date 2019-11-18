import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setAccessToken } from '../../login/redux/actions'
import { Container, Text, Button, Content, Header, Left, Right, Body, Title } from 'native-base';
import firebase from 'firebase';
import styles from './HomeStyles';
import { withNavigation } from 'react-navigation';

import CreateFromUserSettings from '../../itinerary/api/EventFilteringAPI';
import { Filter } from '../../itinerary/models/location';

/**Home page for user after authenticating */
function Home(props){
    const [token, setToken] = useState('');
    const accessToken = useSelector(state => state['UserInfo']['accessToken']);
    const uid = useSelector(state => state['UserInfo']['uid']);
    const {navigate} = props.navigation;    // Handle navigations

    const dispatch = useDispatch();
    console.log(uid);

    /**Logout the current user, and go to AuthLoading navigator. */
    const logout = () => {
        firebase.auth().signOut()
        .then(res => {
            // Navigate to start of application
            navigate('Auth');
            console.log("inside signout");
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

    const getNewItinerary = () => {
        var filters : Filter = {
            Name: "name",
            City: "Vancouver",
            StartTime: new Date(),
            EndTime: new Date(2019, 12, 4),
            TravelDistance: 2.25,
            Categories: ["Museums", "Hotels"],
            GroupSize: 2,
            Budget: 200
        };

        CreateFromUserSettings(filters)
        .then(resp => console.log("new itineray events", resp))
        .catch(err => console.log("error getting new events", err));
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

                <Button danger style={styles.button} onPress={() => logout()}>
                    <Text>Logout</Text>
                </Button>

                <Button danger style={styles.button} onPress={() => getNewItinerary()}>
                    <Text>Get new itinerary</Text>
                </Button>


                <Text>{token}</Text>
            </Content>
        </Container>
    );
}

export default withNavigation(Home);