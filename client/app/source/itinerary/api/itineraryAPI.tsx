import { Itinerary } from "../models/location";
import { useSelector } from "react-redux";
const firebase = require("firebase");

// Required for side-effects
require("firebase/firestore");

export async function getItinerarySigned(filterFn: (itin:Itinerary) => boolean = (itin) => true): Promise<Itinerary[]> {
    let startingCollection = 'prod';
    // If in dev environment, grab from dev db
    if(__DEV__){
        startingCollection = 'dev';
    }
    // Reference to firestore db
    var db = firebase.firestore();
    const uid = useSelector(state => state['UserInfo']['uid']);

    return new Promise<Itinerary[]>((resolve, reject) => {
        db.collection(startingCollection).doc('data').collection('users').doc(uid).collection('itineraries').get().then((querySnapshot:any) => {
            
                let arr = [];
    
                querySnapshot.forEach(doc => arr.push(doc.data()));

                arr.forEach(itin => {
                    if(itin.time) {
                        const start = itin.time.seconds;
                        itin.time = toDateTime(start.toString());
                    }
                    if(itin.last_edit_time) {
                        const start = itin.last_edit_time.seconds;
                        itin.last_edit_time = toDateTime(start.toString());
                    }
                });

                arr = arr.filter((itin:Itinerary) => filterFn(itin));

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