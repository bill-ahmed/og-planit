import { Itinerary } from "../models/location";
import { useSelector } from "react-redux";

const firebase = require("firebase");

export async function getLocations(): Promise<Itinerary[]> {
    let startingCollection = 'prod';
    // If in dev environment, grab from dev db
    if(__DEV__){
        startingCollection = 'dev';
    }
    // Reference to firestore db
    var db = firebase.firestore();
    const uid = useSelector(state => state['UserInfo']['uid']);
    
    return new Promise<Itinerary[]>((resolve, reject) => {
        db.collection(startingCollection).doc('data').collection("users").doc(uid).collection("itineraries").get().then((querySnapshot:any) => {
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