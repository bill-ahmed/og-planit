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
            setCurrentItinerary(resp);
        })
        .catch(err => {
            console.log(err);
            setCurrentItinerary([]);
        });
    }

    /**Bold text more easily */
    const Bold = (props) => <Text style={{...props.style, fontWeight: 'bold'}}>{props.children}</Text>

    return(
        <Container>
            {/* Header content */}
            <View style={styles.header}>
                <Text style={styles.heading}>
                    Home
                </Text>
            </View>

            <Content padder >
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={{fontWeight: 'bold', fontSize:24}}>
                                Upcoming Events:
                            </Text>
                            {currentItinerary && currentItinerary.length === 0 && 
                                <Text>Looks like you don't have any upcoming itineraries. Create one in the Itinerary tab below.</Text>
                            }
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
                                            {event.AvgPrice && <Text><Bold>Pricing:</Bold> ${event.AvgPrice.toString()}</Text>}
                                            {event.Address && <Text><Bold>Address:</Bold> {event.Address.Number}, {event.Address.Street}, {event.Address.City}</Text>}
                                            {event.StartTime && <Text><Bold>Start Date:</Bold> {event.StartTime.getFullYear()}/{(event.StartTime.getMonth()+1)}/{event.StartTime.getDate()} at {event.StartTime.toTimeString().substring(0,8)}</Text>}
                                            {event.EndTime && <Text><Bold>End Date:</Bold> {event.EndTime.getFullYear()}/{(event.EndTime.getMonth()+1)}/{event.EndTime.getDate()} at {event.EndTime.toTimeString().substring(0,8)}</Text>}
                                        </View>
                                    </Card>
                            </TouchableOpacity>
                        </View>
                    );
                })
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
        let today = new Date();
        let query = db.collection(startingCollection).doc('data').collection('users').doc(uid).collection('itineraries').doc(CurrID).collection("events")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let currEventData = doc.data();

                // Need to convert time stamp to date object
                currEventData.StartTime = currEventData.StartTime.toDate();
                currEventData.EndTime = currEventData.EndTime.toDate();
                
                // If (1) event has already started and hasn't ended yet OR (2) event is going to start in future, add it
                if((currEventData.StartTime < today && currEventData.EndTime > today) || currEventData.StartTime > today){
                    events.push(currEventData);
                }

                
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