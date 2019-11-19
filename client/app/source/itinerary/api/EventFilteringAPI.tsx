import { Filter } from "../models/location";
const firebase = require("firebase");

/**Calculate distance between two geological points on Earth's surface
 * GeoDataSource.com (C) All Rights Reserved 2018 
 * Official Web site: https://www.geodatasource.com  
 * 
 * Definition: South latitudes are negative, east longitudes are positive
 * 
 * @param startLocation The initial location
 * @param endLocation The destination
 * @param unit The units to return the distance in, one of: ["M", "K", "N"] (M = miles, K = kilometers, N = nautical miles)
 */
function distanceBetweenGeoPoints(startLocation: firebase.firestore.GeoPoint, endLocation: firebase.firestore.GeoPoint, unit: string) {

    // Starting location
    let lat1 = startLocation.latitude;
    let lon1 = startLocation.longitude;

    // Ending location
    let lat2 = endLocation.latitude;
    let lon2 = endLocation.longitude;

	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

/** Determines if euclidian distance between point and center is less than or equal to range
 * @param point The first location
 * @param center The second location
 * @param range The distance between the two locations allowed
 * @returns True iff the given locations are within 'range' distance of each other
 */
function inRange(point: firebase.firestore.GeoPoint, center: firebase.firestore.GeoPoint, range: number) {
    let distance = distanceBetweenGeoPoints(point, center, "K");
    
    return distance <= range;
}


/**Given an array of itineraries, return an optimal (non-overlapping) sequence of events
 * @param events The list of events as the source
 * @returns An optimal sequence of events
 */
function filterIntervals(events) {
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
            // Compare seconds of start time + average time spent with when the event starts
            if ((curr.StartTime.seconds + curr.AvgTimeSpent * 60) > events[i].StartTime.seconds) {
                events.splice(i, 1);
            }
        }
    }
    return newEvents;
}

/**Give an array of events where each event is withing range distance of events[0]
 * @param events The list of events
 * @param range The max distance between any event and events[0]
 * @returns A sequence of events that are within range distance of the first
 */
function filterDistance(events, range: number): any[]{
    let newEvents = [];
    newEvents.push(events[0]);

    for(let i = 1; i < events.length; i++){
        if(inRange(events[0].Location, events[i].Location, range)){
            newEvents.push(events[i]);
        }
    }

    return newEvents
}

/**Determine if an event is valid, given an object of filters */
function EventIsValid(event: any, filter: Filter): boolean {
    var result = true;

    if(event.AvgPrice > filter.Budget || filter.Categories.indexOf(event.Type) === -1 || event.GroupSize < filter.GroupSize){
        result = false;
    } 
    else if(event.StartTime.seconds > Math.floor(filter.EndTime.getTime()/1000) || event.StartTime < Math.floor(filter.StartTime.getTime()/1000)){
        result = false;
    }

    return result;
}

/**Takes in filter object created by user and returns data object containing all events matching the user's criteria
 * @param filter The filters provided by the user
 * @returns An optimal sequence of events
 */
export default async function CreateFromUserSettings(filter : Filter): Promise<any> {
    return new Promise((resolve, reject) => {
        console.log('recieved filters:', filter)
        let startingCollection = 'prod';

        // If in dev environment, grab from dev db
        if (__DEV__) {
            startingCollection = 'dev';
        }

        // Reference to firestore db
        let db = firebase.firestore();
        let itin = {
            itineraryDetails: {
                name: filter.Name,
                last_edit_time: Date.now()
            },
            events: []
        };
        
        // Find all events that match user specifications
        let query = db.collection(startingCollection).doc('data').collection('events')  // NOTE: Can't seem to do compound queries...idk why...
        .where('Address.City', '==', filter.City)
        .get()
        .then(snapshot => {

            snapshot.forEach(doc => {
                let currEventData = doc.data();

                // If the event is within user filters, add it
                if(EventIsValid(currEventData, filter)){
                    itin.events.push(currEventData);
                }
                
            });
            // Return the result to user
            resolve(filterDistance(filterIntervals(itin.events), filter.TravelDistance));
        })
        .catch(resp => {
            console.log(resp);
            reject([]);     // Error ocurred while trying to get events, return empty array
        }); 
        
    });
}