import React, { useState } from 'react';
import MapView, { Region, Marker } from 'react-native-maps';
import { View, Modal, Alert } from 'react-native';

import styles from './GMapStyles';
import LocationDetails from '../LocationDetails/LocationDetails';
import { getLocations } from '../../api/locationsAPI';
import { Spinner } from 'native-base';

const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

export default function GMap(props) {
    const [currentRegion, setCurrentRegion] = useState(initialRegion);
    const [showLocationDetails, setShowLocationDetails] = useState(false);
    const [locationsLoaded, setLocationsLoaded] = useState(false);
    const [locations, setLocations] = useState(null);
    const [currLocation, setCurrLocation] = useState(null);

    getLocations().then(res => {
        if (!locationsLoaded) {
            setLocations(res);
            setLocationsLoaded(true);
        }
    });

    /** Update user's current region as they move around the map */
    const updateRegion = (region: Region) => {
        setCurrentRegion(region);
    }

    const openMarker = () => {
        const val = Math.floor(Math.random() * locations.length);
        setCurrLocation(locations[val]);
        setShowLocationDetails(!showLocationDetails);
    }

    return (
        <View style={styles.container}>
            {!locationsLoaded && <Spinner color='blue' />}
            {locationsLoaded && <MapView showsMyLocationButton onRegionChangeComplete={updateRegion} region={currentRegion} style={styles.mapStyle}>
                <Marker coordinate={initialRegion} title="Home" description="Starting point of Google Map" onPress={e => openMarker()} />

            </MapView>}
            {showLocationDetails && <LocationDetails location={currLocation} open={showLocationDetails} setModal={setShowLocationDetails} />}
        </View>
    );
}