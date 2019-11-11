import React, { Component, useState } from 'react';
import DialogInput from 'react-native-dialog-input';
import {Container, Header, Left, Right, Body, Title, Subtitle, Content, Button, Icon } from 'native-base';
import Dialog from "react-native-dialog";
import styles from './ItineraryNameStyles';
import { View, TextInput, Text, ScrollView, Dimensions, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Card, ListItem} from 'react-native-elements';
import Image from 'react-native-scalable-image';
import { EventEmitter } from '@unimodules/core';
import { array } from 'prop-types';
import { database } from 'firebase';

export default function ItineraryName(props) {
  const [name, setName] = useState("");
  const currentName = props.data;
  const changedName = name;
  const handleNameChange = (newName: string) => {
    setName(newName);
  }

  const changeName = () => {
    props.close();
  }

  
  return (
    <Modal animationType="fade" transparent={true} visible={props.open} presentationStyle="fullScreen" onRequestClose={() => props.closeDialog()}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={{fontSize: 24, marginBottom: 20}}>Rename Itinerary</Text>

                    <Text style={{fontSize: 16}}>
                        Enter new itinerary name below to update.
                    </Text>

                    <TextInput style={styles.textInput}  
                        value={name} 
                        onChange={text => setName(text.nativeEvent.text)} 
                        placeholder= {currentName} />
                    <Button full style={styles.button} onPress={() => changeName()}>
                      <Text>
                        Change
                      </Text>
                    </Button>
                    <Button light full style={styles.button} onPress={() => props.close()}>
                      <Text>
                        Cancel
                      </Text>
                    </Button>
                </View>
            </View>
        </Modal>
  );
}