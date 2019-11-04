import React, { useState } from 'react';
import MapView, { Region, Marker } from 'react-native-maps';
import { View, Modal, Alert } from 'react-native';

import styles from './GMapStyles';
import LocationDetails from '../LocationDetails/LocationDetails';
export default function GMap(props) {
    const [showLocationDetails, setShowLocationDetails] = useState(false);

    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const [currentRegion, setCurrentRegion] = useState(initialRegion);

    /** Update user's current region as they move around the map */
    const updateRegion = (region: Region) => {
        setCurrentRegion(region);
    }

    return (
        <View style={styles.container}>
            <MapView showsMyLocationButton onRegionChangeComplete={updateRegion} region={currentRegion} style={styles.mapStyle}>
                <Marker coordinate={initialRegion} title="Home" description="Starting point of Google Map" onPress={e => setShowLocationDetails(!showLocationDetails)} />

            </MapView>
            {showLocationDetails &&
                <Modal animationType="slide"
                    transparent={false}
                    visible={showLocationDetails}
                    onRequestClose={() => {
                        setShowLocationDetails(false);
                    }}>
                    <LocationDetails></LocationDetails>
                </Modal>}
        </View>
    );
}