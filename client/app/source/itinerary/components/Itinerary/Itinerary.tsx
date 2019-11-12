import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon, Subtitle, Card, CardItem, Fab, Thumbnail} from 'native-base';

//import styles from './ItineraryStyles';
import { View , Text, Image, ScrollView} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { getLocations } from '../../api/locationsAPI';
import { withNavigation, NavigationEvents } from 'react-navigation';
import newItinerary from './../CreateItinerary/CreateItinerary';
import CreateViews from '../card_list_views_events/CreateViews';



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


    const backgroundBlue = '#1977B5';

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
            <Header style={{backgroundColor: backgroundBlue}}>          
                <Body>
                    <Title>
                        Itinerary Page
                    </Title>
                </Body>


              
            </Header>
  
            <ScrollView>
            {/* <Title> <Text>{element.name}</Text> </Title>
                        <Subtitle> <Text>{element.events.length}</Text></Subtitle>
                        <Subtitle> <Text>{element.last_edit_time}</Text> </Subtitle>
                        <Text> {element.time} </Text>  */}
                {itineraries.map(element => {
                return(<Card>
                    <CardItem header button onPress={() => navigate("ViewItineraryEvents", {data: element})}>
                    <Thumbnail source={require('./../../../login/assets/earth.png')} style={{maxWidth:30, maxHeight:30}}></Thumbnail>
                    <Text style={{fontSize: 25}}> {element.name} </Text>
                    </CardItem>
                    <CardItem></CardItem>
                    <CardItem button onPress={() => console.log(`Clicked the description of ${element.name}!`)/* carlos replace with yours*/}>
                        <Body>
                        <Text>{element.events.length} {((element.events.length == 0) && (element.events.length == 1)) ?'event': 'events'}</Text>
                        <Text>Last edited at {element.last_edit_time}</Text>
                        </Body>
                    </CardItem>
                </Card>);
                 })}
            </ScrollView>
            
            <Fab
      active={false}
      direction="up"
      containerStyle={{ }}
      style={{ backgroundColor: backgroundBlue }}
      position="bottomRight"
      onPress={() => navigate("NewItinerary")}
    >
      <Icon name="ios-add" />
    </Fab>
        </Container>
    );
}
export default function ItineraryContainer(props){
    return (
        <EventStack/>
    );
}