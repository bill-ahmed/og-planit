import React, { useState } from 'react';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid, ScrollView, TouchableOpacity} from 'react-native';
import { Container, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List, Body, Spinner} from 'native-base';
import { Card } from 'react-native-elements';
import { Divider, Slider } from 'react-native-elements'
import LocationDetails from '../../../../shared/component/LocationDetails/LocationDetails';
import styles from './UploadNewItineraryStyles';
import { PlanitLocation } from '../../../models/location';

export default function UploadNewItinerary(props){



    return(
        <ScrollView style={styles.content}>
            {/* Main Content */}
        </ScrollView>
    );
}