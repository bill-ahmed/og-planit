import React, { useState } from 'react';
import MapView, { Region, Marker, AnimatedRegion, MapViewAnimated } from 'react-native-maps';
import { View, Modal, Alert, Geolocation } from 'react-native';

import styles from './GMapStyles';
import LocationDetails from '../../../shared/component/LocationDetails/LocationDetails';
import GMapCardView from '../GMapPullUp/GMapCardView';

const openingLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 50,
    longitudeDelta: 50
};

export default function GMap(props) {

    const [currentRegion, setCurrentRegion] = useState(openingLocation);
    const [showLocationDetails, setShowLocationDetails] = useState(false);
    const [locationsLoaded, setLocationsLoaded] = useState(false);
    const [locations, setLocations] = useState(null);
    const [currLocation, setCurrLocation] = useState(null);


    /** Update user's current region as they move around the map */
    const updateRegion = (region: Region) => {
        setCurrentRegion(region);
    }

    const openMarker = (index: number) => {
        setCurrLocation(locations[index]);
        //setShowLocationDetails(!showLocationDetails);
    }

    const openLocationDetails = () => {
        setShowLocationDetails(!showLocationDetails);
    }

    if (props.navigation.state.params && !locationsLoaded) {
        setCurrentRegion({
            latitude: props.navigation.state.params.data.events[0].Location._lat,
            longitude: props.navigation.state.params.data.events[0].Location._long,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5
        });
        setLocations(props.navigation.state.params.data.events);
        setLocationsLoaded(true);
    }

    // If we're ready to render the map
    return(
        <View style={styles.container}>
            <MapView loadingEnabled={true} onRegionChangeComplete={updateRegion} 
                region={currentRegion}
                style={styles.mapStyle}  onPress={() => setCurrLocation(null)}>
                {locationsLoaded && locations.map((event: any, index: number) => {

                    return(
                        <Marker key={index} coordinate={
                            {longitude: event.Location._long ? event.Location._long : 0,
                                latitude: event.Location._lat ? event.Location._lat : 0
                            }} title={event.Name} description={event.Description} onPress={() => openMarker(index)}/>
                    );
                })}

            </MapView>

            {currLocation && <GMapCardView eventInfo={currLocation} seeEventDetails={() => openLocationDetails()}/>}
            {showLocationDetails && <LocationDetails location={currLocation} open={showLocationDetails} setModal={setShowLocationDetails} />}
        </View>
    );
} 