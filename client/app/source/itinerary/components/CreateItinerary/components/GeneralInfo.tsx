import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List} from 'native-base';
import styles from './GeneralInfoStyles';
import { View , Text, Image, ScrollView, GestureResponderEvent, TextInput, DatePickerAndroid, TimePickerAndroid} from 'react-native';

export default function NewItinerary(props){

  // Keep track of when itinerary should start
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState({hour: new Date().getHours(), minute: new Date().getMinutes()});

  // When itinerary should end
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Keep track of name for this itinerary
  const [name, setName] = useState("");

  const handleSetName=(name)=>{
    setName(name)
  }
  
  const handleSetDate=(date)=>{
    setDate(date)
  }
  const handleSubmitted =(value: any): void =>{
    //constructItinerary(listOfData)
    alert("Clicked submit!");
  }

  /**Handle user selecting a starting date for itinerary*/
  const handleChooseStartDate = (): void => {

  }

  const trigggerDateSelection = async (): Promise<Date> => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
      });

      // Once user has selected date, continue
      if (action !== DatePickerAndroid.dismissedAction) {
        return(new Date(year, month, day));
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', code, message);
    }
  }

  const triggerTimeSelection = async (): Promise<any> => {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: new Date().getSeconds(),
        minute: new Date().getMinutes(),
        is24Hour: false,
      });

      // Once user has selected time, continue
      if(action !== TimePickerAndroid.dismissedAction){
        return({hour: hour, minute: minute});
      }

    } catch ({code, message}) {
      console.log("Error ocurred trying to get the time.", code, message)
    }
  }

    return(
      <Container>
        <Content>
          <View>
          {/* Header content */}
          <View style={styles.header}>
              <Button transparent onPress={() => props.navigation.pop()}>
                <Icon name="arrow-back" />
              </Button>
              
              <Text style={styles.heading}>
                Create an Itinerary
              </Text>
          </View>

          {/* Main content of page */}
          <View style={styles.content}>
              <Text style={styles.text}>
                Lets start with some general information. Fill out all the fields below to continue.
              </Text>

              <TextInput style={styles.textInput} keyboardType="default" placeholder="Name" onChange={text => handleSetName(text)}/>

              <Text style={styles.text}>
                Choose a start and end date.
              </Text>
              {/* Get user to enter date/time for start and end */}
              <View style={styles.selectDateContainer}>

                <Button onPress={() => handleChooseStartDate()}>
                  <Text>Choose Start date</Text>
                </Button>
                
                <Button>
                  <Text>Choose end date</Text>
                </Button>
              </View>

              

          </View>

          {/* <Button  style={styles.button} onPress={() => handleSubmitted(listOfData)}>
            <Text> Submit </Text>
          </Button> */}

          </View>
          </Content>
        </Container>
    );
}
  // const listOfData = {"Name": name, "Date":date, "Museum":Museum, "Aquarium":Aquarium, "Festival":Festival,
  //   "Galleries":Galleries, "Beach":Beach, "Hotels":Hotels, "Arcades":Arcades}


  // const [Museum, setMuseum] = useState(false);
  // const onSetMuseum = (value: GestureResponderEvent) => {
  //   setMuseum(!Museum)
  // }
  // const [Aquarium, setAquarium] = useState(false);
  // const onSetAquarium = (value: GestureResponderEvent) => {
  //   setAquarium(!Aquarium)
  // }
  // const [Festival, setFestival] = useState(false);
  // const onSetFestival = (value: GestureResponderEvent) =>{
  //   setFestival(!Festival)
  // }  
  // const [Beach, setBeach] = useState(false);
  // const onSetBeach = (value: GestureResponderEvent) =>{
  //   setBeach(!Beach)
  // }
  // const [Galleries, setGalleries] = useState(false);
  // const onsetGalleries = (value: GestureResponderEvent) => {
  //   setGalleries(!Galleries)
  // }
  // const [Hotels, setHotels]=useState(false);
  // const onSetHotels = (value: GestureResponderEvent) =>{
  //   setHotels(!Hotels)
  // }
  // const [Arcades, setArcades]=useState(false);
  // const onSetArcades = (value: GestureResponderEvent) =>{
  //   setArcades(!Arcades)
  // }
  // const [name, setName] = useState("");
  // const handleSetName=(name)=>{
  //   setName(name)
  // }


          /* <ListItem>
            <Left>
                <Text>Museums</Text>
            </Left>
            <Body>
              <CheckBox checked= {Museum} onPressOut={onSetMuseum}/>
            </Body>
          </ListItem>

         <ListItem>
            <Left>
              <Text>Aquarium</Text>
            </Left>
            <Body>
              <CheckBox checked={Aquarium} onPress={onSetAquarium}/>
            </Body>
          </ListItem> 

          <ListItem>
            <Left>
              <Text>Festivals</Text>
            </Left>
            <Body>
              <CheckBox checked={Festival} onPress={onSetFestival}/>
            </Body>
          </ListItem>

          <ListItem>
            <Left>
              <Text>Beach</Text>
            </Left>
            <Body>
              <CheckBox checked={Beach} onPress={onSetBeach}/>
            </Body>
          </ListItem>

          <ListItem>
            <Left>
              <Text>Galleries</Text>
            </Left>
            <Body>
              <CheckBox checked={Galleries} onPress={onsetGalleries}/>
            </Body>
          </ListItem>

          <ListItem>
            <Left>
              <Text>
                Hotels
              </Text>
            </Left>
            <Body>
              <CheckBox checked={Hotels} onPress={onSetHotels}/>
            </Body>
          </ListItem>
          <ListItem>
            <Left>
              <Text>
                Arcades
              </Text>
            </Left>
            <Body>
              <CheckBox checked={Arcades} onPress={onSetArcades}/>
            </Body>
          </ListItem> */