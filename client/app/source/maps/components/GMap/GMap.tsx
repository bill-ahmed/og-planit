import React, { useState } from 'react';
import MapView, { Region, Marker, AnimatedRegion, MapViewAnimated } from 'react-native-maps';
import { View, Modal, Alert, Geolocation } from 'react-native';
import GMapCardView from './GMapCardView';

import styles from './GMapStyles';
import LocationDetails from '../../../shared/component/LocationDetails/LocationDetails';
import { getLocations } from '../../api/locationsAPI';
import { Spinner, Text } from 'native-base';

export default function GMap(props) {
    const [currentRegion, setCurrentRegion] = useState(props.initialRegion ? props.initialRegion : null);
    const [showLocationDetails, setShowLocationDetails] = useState(false);
    const [locationsLoaded, setLocationsLoaded] = useState(false);
    const [locations, setLocations] = useState(null);
    const [currLocation, setCurrLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

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
        //setShowLocationDetails(!showLocationDetails);
    }

    const openLocationDetails = () => {
        setShowLocationDetails(!showLocationDetails);
    }

    // If we're ready to render the map
    if(locationsLoaded){
        return(
            <View style={styles.container}>
                <MapView loadingEnabled={true} showsMyLocationButton onRegionChangeComplete={updateRegion} 
                 region={currentRegion}
                 style={styles.mapStyle}  onPress={() => setCurrLocation(null)}>
                    {/* <Marker coordinate={initialRegion} title="Home" description="Starting point of Google Map" onPress={e => openMarker()} /> */}
                    {locationsLoaded && locations.map((event: any, index: number) => {
                        return(
                            <Marker coordinate={event.Location} title={event.Name} description={event.Description} onPress={() => openMarker(index)}/>
                        );
                    })}

                </MapView>
                
                {currLocation && <GMapCardView eventInfo={currLocation} seeEventDetails={() => openLocationDetails()}/>}
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