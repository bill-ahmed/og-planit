import { PlanitLocation } from "../models/location";
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
export async function getLocations(): Promise<PlanitLocation[]> {
    let startingCollection = 'prod';
    // If in dev environment, grab from dev db
    if(__DEV__){
        startingCollection = 'dev';
    }
    // Reference to firestore db
    var db = firebase.firestore();

    return new Promise<PlanitLocation[]>((resolve, reject) => {
        db.collection(startingCollection).doc('data').collection("events").get()
        .then((querySnapshot:any) => {
            const arr = [];

            querySnapshot.forEach(doc => arr.push(doc.data()));
            resolve(arr);
        })
        .catch((err:any) => {
            console.log("Error getting document", err);
            reject(err);
        });
    });
}