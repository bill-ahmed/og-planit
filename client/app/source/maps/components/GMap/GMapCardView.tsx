import React, { useState } from 'react';

import { View, Modal, Alert, TouchableOpacity } from 'react-native';
import styles from './GMapCardViewStyles';
import { Text, Subtitle } from 'native-base';

export default function GMapCardView(props){
    const eventData = props.eventInfo;

    // Get text to display based on price range
    let price = eventData.AvgPrice;
    let priceNotation = "$";
    if(price >= 80){
        priceNotation = "$$$";
    } else if (price >= 30){
        priceNotation = "$$";
    }

    return(
        
        <View style={styles.container}>
            <TouchableOpacity style={styles.content} onPress={() => props.seeEventDetails()}>
                <View>
                    <Text style={styles.heading}>
                        {eventData.Name}
                    </Text>

                    <Text style={styles.subtitle}>
                        {`${eventData.Address.City}, ${eventData.Address.Province} • ${eventData.Type} • ${priceNotation}`}
                    </Text>

                    <Text style={styles.description}>
                        {eventData.Description}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.subtitle}>
                        Tap to see more
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}