import React, { useState } from 'react';
import { Container, Content,  Button, Icon, Subtitle, Form, Item, Label, Input, ListItem, CheckBox, List} from 'native-base';
import styles from './SelectFiltersStyles';
import { View , Text, TextInput, DatePickerAndroid, TimePickerAndroid} from 'react-native';

export default function SelectFilters(props){
    const { navigate } = props.navigation;
    const data = props.navigation.state.params.data;
    console.log(data);

    return(
        <View>
            <View style={styles.container}>
                {/* Header content */}
                <View style={styles.header}>
                    <Button transparent onPress={() => props.navigation.pop()}>
                    <Icon name="arrow-back" />
                    </Button>
                    
                    <Text style={styles.heading}>
                        Filter Selection
                    </Text>
                </View>

                {/* Main Content */}
                <View>
                    
                </View>

                {/* Footer content */}
                <View>

                </View>
            </View>
        </View>
    );
}