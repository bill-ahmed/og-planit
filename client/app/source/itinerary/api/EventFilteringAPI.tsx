/** Determines if euclidian distance between point and center is less than or equal to range */

import { useSelector } from "react-redux";
import { Itinerary, PlanitLocation, Filter } from "../models/location";
const firebase = require("firebase");

async function inRange(point: firebase.firestore.GeoPoint, center: firebase.firestore.GeoPoint, range: number) {
    let distance = Math.sqrt(Math.pow((point.latitude - center.latitude), 2) + Math.pow((point.longitude - center.longitude), 2));
    if (distance <= range) {
        return true;
    }
    else {
        return false;
    }
}

async function filterIntervals(events) {
    // Sort events in ascending order by start time
    events.sort((a, b) => {
        return a.StartTime - b.StartTime;
    })
    let  newEvents = [];

    // Make sure no time intervals overlap
    while (events.length != 0) {
        let curr = events[0];
        newEvents.push(curr);

        // If any event interval overlaps with curr, remove it
        for (let i = 0; i < events.length; i++) {
            if (curr.StartTime.setMinutes(curr.StartTime.getMinutes + curr.AvgTimeSpent) > events[i].StartTime) {
                events.splice(i, 1);
            }
        }
    }
    return newEvents;
}

/**Takes in filter object created by user and returns data object containing all events matching the user's criteria */
export async function CreateFromUserSettings(filter : Filter) {
    let startingCollection = 'prod';
    // If in dev environment, grab from dev db
    if (__DEV__) {
        startingCollection = 'dev';
    }
    // Reference to firestore db
    let db = firebase.firestore();
    const accessToken = useSelector(state => state['UserInfo']['accessToken']);
    let itin = {
        accessToken: accessToken,
        itineraryDetails: {
            name: filter.Name,
            last_edit_time: Date.now()
        },
        events: []
    };
    // Find all events that match user specifications 
    let query = db.collection(startingCollection).doc('data').collection('events')
    .where('Type', 'in', filter.Categories)
    .where('GroupSize', '>=', filter.GroupSize)
    .where('Address.city', '==', filter.City)
    .where('StartTime', '<', 'EndTime')
    .where('StartTime', '>=', filter.StartTime).get().then(snapshot => {
        // If no records were found, return empty array of events
        if (snapshot.empty) {
            return itin;
        }

        // Otherwise need to evaluate each found event
        let budget = 0;
        snapshot.forEach(doc => {
            // If list is empty place in list
            if (itin.events.length == 0) {
                itin.events.push(doc);
            }
            // Else
            else {
                // If budget + avgPrice is greater than user's budget, move to next
                if (budget + doc.AvgPrice > filter.Budget) {
                    return;
                }
                // If distance between points is greater than travel distance, move to next
                if (!inRange(doc.Location, itin.events[0].Location, filter.TravelDistance)) {
                    return;
                }
                itin.events.push(doc);
                budget += doc.AvgPrice;
            }
        })
        return itin;
    }).then(filterIntervals(itin.events)).then(newEvents => {
        itin.events = newEvents;
    });
    return itin;
}