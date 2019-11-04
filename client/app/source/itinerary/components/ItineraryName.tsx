import React, { useState } from 'react';
import { Container, Header, Left, Right, Body, Title, Content, Text, Button, Icon } from 'native-base';

import styles from './ItineraryNameStyles';
import { View } from 'react-native';
import GMap from './GMap';
import LocationDetails from './LocationDetails';
import { getLocations } from '../api/locationsAPI';
export default function ItineraryName(props) {

    return(<Container>
        <html>
            <body>
                <form>
                    Current itinerary:
                    <select id="myItinerary">
                        <option value="INIT_ITINERARY">INIT_ITINERARY</option>
                        <option value="nAhhGfGAz0qchchkVk1m">nAhhGfGAz0qchchkVk1m</option>
                    </select>
                </form>
            </body>
        </html>
    </Container>)
}
