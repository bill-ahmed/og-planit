import { PlanitLocation } from "../../itinerary/models/location";
const firebase = require("firebase");

// Required for side-effects
require("firebase/firestore");

/**Acquires all elements Locations at a radius
 * @param userLocation The location of the user currently
 * @param radius The radius of locations to search for from 
 * @returns A Promise for get request to Firestore
*/
export async function getLocationsFrom(userLocation: string, radius: number){

}

/**Acquires all Location elements
 * @returns A Promise for get request to Firestore
*/
export async function getLocations(filterFn: (location:PlanitLocation) => boolean = (location) => true): Promise<PlanitLocation[]> {
    let startingCollection = 'dev';

    // Reference to firestore db
    var db = firebase.firestore();

    return new Promise<PlanitLocation[]>((resolve, reject) => {
        db.collection(startingCollection).doc('data').collection("events").get()
        .then((querySnapshot:any) => {
            let arr = [];

            querySnapshot.forEach(doc => arr.push(doc.data()));
            arr.forEach(item => {

                if(item.StartTime) {
                    const start = item.StartTime.seconds;
                    item.StartTime = toDateTime(start.toString());
                }
                if(item.EndTime) {
                    const end = item.EndTime.seconds;
                    item.EndTime = toDateTime(end.toString());
                }
            })

            arr = arr.filter(location => filterFn(location));
            resolve(arr);
        })
        .catch((err:any) => {
            console.log("Error getting document", err);
            reject(err);
        });
    });
}

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}