import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List} from 'native-base';
import PropTypes, { checkPropTypes } from 'prop-types';
import styles from './CreateItineraryStyles';
import { View , Text, Image, ScrollView, GestureResponderEvent, TextInput} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { clearUpdateCacheExperimentalAsync } from 'expo/build/Updates/Updates';
import {ItineraryAPI} from "../../api/itineraryAPI";

export default function NewItinerary(props){
  const [Museum, setMuseum] = useState(false);
  const onSetMuseum = (value: GestureResponderEvent) => {
    setMuseum(!Museum)
  }
  const [Aquarium, setAquarium] = useState(false);
  const onSetAquarium = (value: GestureResponderEvent) => {
    setAquarium(!Aquarium)
  }
  const [Festival, setFestival] = useState(false);
  const onSetFestival = (value: GestureResponderEvent) =>{
    setFestival(!Festival)
  }  
  const [Beach, setBeach] = useState(false);
  const onSetBeach = (value: GestureResponderEvent) =>{
    setBeach(!Beach)
  }
  const [Galleries, setGalleries] = useState(false);
  const onsetGalleries = (value: GestureResponderEvent) => {
    setGalleries(!Galleries)
  }
  const [Hotels, setHotels]=useState(false);
  const onSetHotels = (value: GestureResponderEvent) =>{
    setHotels(!Hotels)
  }
const [name, setName] = useState("");
const handleSetName=(name)=>{
  setName(name)
}

const [date, setDate] = useState("");
const handleSetDate=(date)=>{
  setDate(date)
}
    const listOfData = {"Name": name, "Date":date, "Museum":Museum, "Aquarium":Aquarium, "Festival":Festival, "Galleries":Galleries, "Beach":Beach, "Hotels":Hotels}
    return(
      <Container>
        <Content>
        <Form>
            <Item fixedLabel>
              <TextInput keyboardType="default" placeholder="Name" onChange={text => handleSetName(text)}/>
            </Item>
            <Item fixedLabel>
              <TextInput keyboardType="default" placeholder="Date Planned" onChange={text => handleSetName(text)}/>
            </Item>
          </Form>
          <Right>
          <Text>Please select the activies you are interested in</Text>
          </Right>

          <ListItem>
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
              <CheckBox checked={Beach} onPress={onSetFestival}/>
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

          <Button style={styles.button} onPress={constructItinerary(listOfData)}>
              <Text> Submit </Text>
              

          </Button>
          </Content>
        </Container>
    );
}
