import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content,  Button, Icon, Subtitle, Form, Item, Label, Input } from 'native-base';

import styles from './ItineraryStyles';
import { View , Text, Image, ScrollView} from 'react-native';

export default function NewItinerary(props){
    return(
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
    );
}