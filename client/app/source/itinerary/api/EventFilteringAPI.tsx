import { Filter, PlanitLocation } from "../models/location";
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
function filterIntervals(events: any[]): PlanitLocation[] {

    // Sort events in ascending order by start time
    events.sort((a, b) => {
        return a.StartTime.seconds - b.StartTime.seconds;
    })
    let newEvents = [];
    let prev_finish_time = 0;

    if(events.length > 0){
        newEvents.push(events[0]);
        prev_finish_time = events[0].StartTime.seconds + events[0].AvgTimeSpent;
    }

    for(let i = 1; i < events.length; i++){
        if(events[i].StartTime.seconds >= prev_finish_time){
            newEvents.push(events[i]);
            prev_finish_time = events[i].StartTime.seconds + events[i].AvgTimeSpent;
        }
    }

    return newEvents;
}

/**Give an array of events where each event is withing range distance of events[0]
 * @param events The list of events
 * @param range The max distance between any event and events[0]
 * @returns A sequence of events that are within range distance of the first
 */
function filterDistance(events, range: number): PlanitLocation[]{
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
    else if(event.StartTime.toDate() > filter.EndTime || event.StartTime.toDate() < filter.StartTime || event.EndTime.toDate() > filter.EndTime){
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
        let startingCollection = 'dev';

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

                // If end greater than start, swap them
                if(currEventData.StartTime.seconds > currEventData.EndTime.seconds){
                    let temp = currEventData.StartTime;
                    currEventData.StartTime = currEventData.EndTime;
                    currEventData.EndTime = temp;
                }

                // If the event is within user filters, add it
                if(EventIsValid(currEventData, filter)){
                    itin.events.push(currEventData);
                }
                
            });
            // Return the result to user
            var result = filterDistance(filterIntervals(itin.events), filter.TravelDistance);

            resolve(result);
        })
        .catch(resp => {
            console.log(resp);
            alert("Error: " + JSON.stringify(resp));
            reject([]);     // Error ocurred while trying to get events, return empty array
        }); 
        
    });
}