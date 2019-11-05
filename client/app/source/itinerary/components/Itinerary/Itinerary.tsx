import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon, Subtitle, Card, CardItem, Switch} from 'native-base';

//import styles from './ItineraryStyles';
import { View , Text, Image, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { getLocations } from '../../api/locationsAPI';
import { withNavigation, NavigationEvents } from 'react-navigation';
import newItinerary from './../CreateItinerary/CreateItinerary';
import CreateViews from '../card_list_views_events/CreateViews';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styles  from './ItineraryStyles'

//App stack to go from list of itineraries --> specific itinerary
const itineraries=require("./../../models/MockItineraryList.json");

const EventStack = createAppContainer(createStackNavigator({
    Itinerary: {
        screen: Itinerary, 
        navigationOptions: {
        header: null,   // Remove all headers
      }},
    NewItinerary:{
        screen: newItinerary,
        navigationOptions: {
            header: null,}
        
    },
    ViewItineraryEvents: {
        screen: CreateViews,
        navigationOptions: {
            header: null,
        }
    }

}, 
{
    initialRouteName: "Itinerary",
}));

export function Itinerary(props) {
    
    const [locationDetailsOpen, setLocationDetailsOpen] = useState(false);
    const [locationsLoaded, setlocationsLoaded] = useState(false);
    const {navigate} = props.navigation;    // Handle navigations
    var following = "";

    function follow(name){
        following = name;
    }
    let locations = null;
    getLocations().then(res => {
        locations = res;
        setlocationsLoaded(true);
        console.log(locations);
    });

    const goToItineraryViews = () =>{
        navigate(/* carlos' part */);
    }

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
               
                <Body>
                    <Title>
                        Itinerary Page
                    </Title>
                </Body>

                {/* <Right>
                    <Button transparent onPress={() => navigate('NewItinerary')}>
                        <Icon name="ios-add"/>
                        <Text> Create New Itinerary</Text>
                    </Button>
                </Right> */}


            </Header>
            
            {/* <Button style={styles.addbtn} onPress={() => navigate('NewItinerary')}> */}



            <ScrollView>
            {/* <Title> <Text>{element.name}</Text> </Title>
                        <Subtitle> <Text>{element.events.length}</Text></Subtitle>
                        <Subtitle> <Text>{element.last_edit_time}</Text> </Subtitle>
                        <Text> {element.time} </Text>  */}
                {itineraries.map(element => {
                return(<Card style={styles.card}>
                    <CardItem header button onPress={() => navigate("ViewItineraryEvents", {data: element})}>
                    <Text style={{fontSize: 20}}> {element.name} </Text>
                    </CardItem>
                    <CardItem button onPress={() => console.log(`Clicked the description of ${element.name}!`)/* carlos replace with yours*/}>
                        <Body>
                        <Image source={require('../../../login/assets/earth.png')} style={{width: "90%",height: 200,  alignSelf: "center"}}/>
                        <Text>Number of Events:  {element.events.length}</Text>
                        <Text>Last Edited:  {element.last_edit_time}</Text>
                        </Body>

                    </CardItem>
                    <CardItem footer style={{alignSelf: "flex-end"}}>
                            <Button onPress={() => alert("following")} style={styles.follow}>
                            {console.log(following)}
                            
                            {element.name == following && <Text style={{color: "white"}}>Following!</Text>}
                            {element.name != following && <Text style={{color: "white"}}>Click to follow</Text>}
                            </Button>
                        </CardItem>
                </Card>);
                 })}
            </ScrollView>
            <Button style={styles.addbtn} onPress={() => navigate('NewItinerary')}>
          <Text style={styles.plus} >+</Text>
        </Button>
        </Container>
    );
}
export default function ItineraryContainer(props){
    return (
        <EventStack/>
    );
}