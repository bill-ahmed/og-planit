import React, { useState } from 'react';
import { Container, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List} from 'native-base';
import styles from './SelectFiltersStyles';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid} from 'react-native';

export default function SelectFilters(props){
    const itineraryData = props.itineraryInfo;
    console.log(itineraryData);

    return(
        <View style={styles.content}>
            {/* Main Content */}
            <View style={styles.filtersIntroduction}>
                <Text style={styles.text}>
                    Now for some filters! This will help us give you a more personalized itinerary.
                </Text>
                
                <Text style={styles.subtext}>
                    Don't worry, you can always modify any events we add.
                </Text>
            </View>

            {/* Footer content */}
            <View>
                <Text>
                    Next button here
                </Text>
            </View>
        </View>
    );
}