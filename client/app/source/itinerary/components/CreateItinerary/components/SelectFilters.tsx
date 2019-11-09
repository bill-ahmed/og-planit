import React, { useState } from 'react';
import { Container, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List} from 'native-base';
import styles from './SelectFiltersStyles';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid} from 'react-native';

export default function SelectFilters(props){
    const itineraryData = props.itineraryInfo;
    console.log(itineraryData);

    return(
        <View>
            <View style={styles.container}>

                {/* Main Content */}
                <View>
                    <Text>
                        Template for filters such as checkboxes, radio buttons, etc.
                    </Text>
                </View>

                {/* Footer content */}
                <View>
                    <Text>
                        Next button here
                    </Text>
                </View>
            </View>
        </View>
    );
}