import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox } from 'native-base';

import styles from './CreateItineraryStyles';
import { View , Text, Image, ScrollView} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

export default function NewItinerary(props){
  const setChecked = () => {
      
  }
    return(
      <Container>
        <Content>
        <Form>
            <Item fixedLabel>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item fixedLabel>
              <Label>Date Planned</Label>
              <Input />
            </Item>
          </Form>
        
          <Text>Please select the activies you are interested in</Text>
  
          <ListItem>
          <Body>
                <Left>
                <Text>Museums</Text>
                </Left>
              </Body>
            <CheckBox checked={false}/>
              
          </ListItem>
          <ListItem>
            <Body>
              <Left>
                <Text>
                  Concerts
                </Text>
              </Left>
            </Body>
            <CheckBox checked={false} onPress={()=> setChecked(checked)} />
          </ListItem>1
          </Content>
        </Container>
    );
}