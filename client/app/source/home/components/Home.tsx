import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setAccessToken } from '../../login/redux/actions'
import { Container, Text, Button, Content, Header, Left, Right, Body, Title } from 'native-base';
import firebase from 'firebase';
import styles from './HomeStyles';
import { withNavigation, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FilterEvents from '../../itinerary/components/filtering/FilterEvents';


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

    const [eventFilterModalOpen, setEventFilterModal] = useState(false);
    const setModalOpen = (val: boolean) => {
        setEventFilterModal(val);
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

                <Button style={styles.button} onPress={() => setModalOpen(true)}>
                    <Text>
                        Event Filtering Page
                    </Text>
                </Button>

                <Button danger style={styles.button} onPress={() => logout()}>
                    <Text>Logout</Text>
                </Button>

                <Text>{token}</Text>
            </Content>
            {eventFilterModalOpen && <FilterEvents closeModal={() => setModalOpen(false)}/>}
        </Container>
    );
}
export default withNavigation(Home);

