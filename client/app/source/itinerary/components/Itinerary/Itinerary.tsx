import React, { useState } from 'react';
<<<<<<< HEAD
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon, Subtitle, Card, CardItem, Fab, Thumbnail} from 'native-base';
=======
import { Container, Header, Left, Right, Body, Title, Content, Button, Icon, Subtitle, Card, CardItem, Radio, Spinner } from 'native-base';
>>>>>>> origin/develop

//import styles from './ItineraryStyles';
import { View, Text, Image, ScrollView } from 'react-native';
import { getItinerarySigned } from '../../api/itineraryAPI';
import { Itinerary as ItineraryModel } from './../../models/location';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

//App stack to go from list of itineraries --> specific itinerary
// const itineraries=require("./../../models/MockItineraryList.json");

export function Itinerary(props) {
    const { navigate } = props.navigation;    // Handle navigations
    const [itineraries, setItineraries] = useState(null);
    const [selected, setSelected] = useState(-1);

<<<<<<< HEAD

    const backgroundBlue = '#1977B5';

    let locations = null;
    getLocations().then(res => {
        locations = res;
        setlocationsLoaded(true);
        console.log(locations);
=======
    getItinerarySigned().then(res => {
        if (!itineraries && res != undefined) {
            setItineraries(res);
        }
>>>>>>> origin/develop
    });

    const goToItineraryViews = () => {
        navigate(/* carlos' part */);
    }

<<<<<<< HEAD


    return (
        <Container>
            <Header style={{backgroundColor: backgroundBlue}}>          
=======
    const handleRadioButtonChange = (newRadioButtonValue: number) => {
        setSelected(newRadioButtonValue);
        console.log("User selected " + newRadioButtonValue);
    }

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
>>>>>>> origin/develop
                <Body>
                    <Title>
                        Itinerary Page
                    </Title>
                </Body>
<<<<<<< HEAD


              
=======
                <Right>
                    <Button transparent onPress={() => navigate('NewItinerary')}>
                        <Icon name="ios-add" />
                        <Text> Create New Itinerary</Text>
                    </Button>
                </Right>
>>>>>>> origin/develop
            </Header>

            <ScrollView>
<<<<<<< HEAD
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
=======
                {!itineraries && <Spinner color='blue' />}
                {itineraries && itineraries.map((element: ItineraryModel, index) => {
                    return (<Card key={index}>
                        <CardItem header button onPress={() => navigate("ViewItineraryEvents", { data: element })}>
                            <Text> {element.name} </Text>
                        </CardItem>
                        <CardItem button onPress={() => console.log(`Clicked the description of ${element.name}!`) /* carlos replace with yours*/}>
                            <Body>
                                {element.events && <Text>Number of Events: {element.events.length}</Text>}
                                {element.last_edit_time && <Text>Last Edited: {element.last_edit_time.toLocaleString()}</Text>}
                                <Right>
                                    <Radio selected={selected === index} onPress={() => handleRadioButtonChange(index)} />
                                </Right>
                            </Body>
                        </CardItem>
                    </Card>);
                })}
            </ScrollView>
>>>>>>> origin/develop
        </Container>
    );
}