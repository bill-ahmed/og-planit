import React, { useState } from 'react';
import MapView, { Region, Marker, AnimatedRegion, MapViewAnimated } from 'react-native-maps';
import { View, Modal, Alert } from 'react-native';

import styles from './GMapStyles';
import LocationDetails from '../../../shared/component/LocationDetails/LocationDetails';
import { getLocations } from '../../api/locationsAPI';
import { Spinner } from 'native-base';

export default function GMap(props) {
    const [currentRegion, setCurrentRegion] = useState(props.initialRegion ? props.initialRegion : null);
    const [showLocationDetails, setShowLocationDetails] = useState(false);
    const [locationsLoaded, setLocationsLoaded] = useState(false);
    const [locations, setLocations] = useState(null);
    const [currLocation, setCurrLocation] = useState(null);

    getLocations().then(res => {
        if (!locationsLoaded) {
            setLocations(res);
            setCurrentRegion(res[0].Location);
            setLocationsLoaded(true);
        }
    });

    /** Update user's current region as they move around the map */
    const updateRegion = (region: Region) => {
        setCurrentRegion(region);
    }

    const openMarker = (index: number) => {
        setCurrLocation(locations[index]);
        setShowLocationDetails(!showLocationDetails);
    }

    // If we're ready to render the map
    if(locationsLoaded){
        return(
            <View style={styles.container}>
                <MapView showsMyLocationButton onRegionChangeComplete={updateRegion} region={currentRegion} style={styles.mapStyle}>
                    {/* <Marker coordinate={initialRegion} title="Home" description="Starting point of Google Map" onPress={e => openMarker()} /> */}
                    {locationsLoaded && locations.map((event: any, index: number) => {
                        return(
                            <Marker coordinate={event.Location} title={event.Name} description={event.Description} onPress={() => openMarker(index)}/>
                        );
                    })}

                </MapView>
                {showLocationDetails && <LocationDetails location={currLocation} open={showLocationDetails} setModal={setShowLocationDetails} />}
            </View>
        );
    } else{
         return (
            <View style={styles.container}>
                <Spinner color='blue' />
            </View>
        );
    }
}