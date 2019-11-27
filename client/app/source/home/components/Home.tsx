import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setAccessToken } from '../../login/redux/actions'
import { CardItem,Container, Text, Button, Content, Header, Left, Right, Body, Title, Spinner } from 'native-base';
import { Card, Input, Overlay } from 'react-native-elements';
import firebase from 'firebase';
import styles from './HomeStyles';
import { withNavigation } from 'react-navigation';
import { reload } from 'expo/build/Updates/Updates';
import { PlanitLocation } from '../../itinerary/models/location';
import { View, TouchableOpacity } from 'react-native';
import LocationDetails from '../../shared/component/LocationDetails/LocationDetails';

/**Home page for user after authenticating */
function Home(props){
    const {navigate} = props.navigation;    // Handle navigations
    const [currentItinerary, setCurrentItinerary] = useState<PlanitLocation[]>(null);
    const [eventDetailsModalOpen, setDetailsModal] = useState(false);   // Whether modal is open or not
    const [modalDetails, serModalDetails] = useState<PlanitLocation>(null); // Data to send to modal

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

    /**Open the event details modal */
    const handleDetailsModalOpen = (eventData: PlanitLocation) => {
        setDetailsModal(true);
        serModalDetails(eventData);
    }

    /**Get itinerary that user is currently following */
    const getCurrItinerary = async (): Promise<PlanitLocation[]> => {
        const uid = firebase.auth().currentUser.uid;

        var currentItineraryID = await getCurrentItineraryID(uid);  // UID of logged in user
        var currentItineraryEvents = await getCurrentItinerary(uid, currentItineraryID);    // All events in current itinerary

        return currentItineraryEvents;
    }

    // Get itinerary user is currently following on render
    if(!currentItinerary){
        getCurrItinerary()
        .then((resp) => {
            console.log("got itineraries", resp);
            setCurrentItinerary(resp);
        })
        .catch(err => {
            console.log(err);
            setCurrentItinerary([]);
        });
    }

    return(
        <Container>
            {/* Header content */}
            <View style={styles.header}>
                <Text style={styles.heading}>
                    Home
                </Text>

                <Button danger onPress={() => logout()}>
                    <Text>Logout</Text>
                </Button>
            </View>

            <Content padder >
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={{fontWeight: 'bold'}}>
                                Today's Events:
                            </Text>
                        </Body>
                    </CardItem>
                </Card>

                {!currentItinerary && 
                <Spinner/>
                }

                {currentItinerary && 
                currentItinerary.map((event: PlanitLocation, index: number) => {
                    return(
                        <View key={index}>
                            <TouchableOpacity onPress={() => handleDetailsModalOpen(event)}>
                                <Card image={{uri: event.imageURL}}>
                                        <Text style={styles.eventHeader}>
                                            {event.Name}
                                        </Text>
                                        
                                        <View style={styles.cardBody}>
                                            {event.AvgPrice && <Text>Pricing: ${event.AvgPrice.toString()}</Text>}
                                            {event.GroupSize && <Text>Accomodation: up to {event.GroupSize} people</Text>}
                                            {event.Address && <Text>Address: {event.Address.Number}, {event.Address.Street}, {event.Address.City}</Text>}
                                            
                                            {event.StartTime && <Text>Starting Time: {JSON.stringify(event.StartTime).substring(12, 17)}</Text>}
                                            {event.EndTime && <Text>Ending Time: {JSON.stringify(event.EndTime).substring(12, 17)}</Text>}
                                        </View>
                                    </Card>
                            </TouchableOpacity>
                        </View>
                    );
                })
                }

                {currentItinerary && currentItinerary.length === 0 && 
                    <Text>Looks like you don't have any upcoming itineraries. Create one in the Itinerary tab below.</Text>
                }
            </Content>
            {eventDetailsModalOpen && <LocationDetails location={modalDetails} open={eventDetailsModalOpen} setModal={setDetailsModal} />}
        </Container>
    );
}

export default withNavigation(Home);

async function getCurrentItineraryID (uid): Promise<String> {

    return new Promise((resolve, reject) => {
        let startingCollection = 'dev';

        // Reference to firestore db
        let db = firebase.firestore();
        // Find all events that match user specifications
        let query = db.collection(startingCollection).doc('data').collection('users').doc(uid)
        .get()
        .then(doc => {
            if(doc.exists){
                    var temp = doc.data()
                    var currentItinerary = temp.currentItinerary
                    resolve(currentItinerary ? currentItinerary : null);
                    
            } else{
                    console.log("user does not exist");
                    reject(null);
            }
        })
    });
    
}


async function getCurrentItinerary (uid, CurrID): Promise<PlanitLocation[]> {
    return new Promise((resolve, reject) => {
        let startingCollection = 'dev';
        let db = firebase.firestore();
        let events = [];
        let query = db.collection(startingCollection).doc('data').collection('users').doc(uid).collection('itineraries').doc(CurrID).collection("events")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let currEventData = doc.data();

                // Need to convert time stamp to date object
                currEventData.StartTime = currEventData.StartTime.toDate();
                currEventData.EndTime = currEventData.EndTime.toDate();

                events.push(currEventData);
            });
            // Return the result to user
            resolve(events);
        })
        .catch(resp => {
            console.log("error getting itinerary", resp);
            reject([]);     // Error ocurred while trying to get events, return empty array
        }); 
    });
}