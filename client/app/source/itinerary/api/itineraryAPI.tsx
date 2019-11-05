import { Itinerary, PlanitLocation } from "../models/location";
import { useSelector } from "react-redux";
import { async } from "rxjs/internal/scheduler/async";
import { Subject, Observable, combineLatest } from "rxjs";
const firebase = require("firebase");

// Required for side-effects
require("firebase/firestore");

async function getItineraryEvents(db, startingCollection, uid, itinID): Promise<PlanitLocation[]> {
    return new Promise<PlanitLocation[]>((resolve, reject) => {
        db.collection(startingCollection).doc('data').collection('users').doc(uid).collection('itineraries').doc(itinID).collection('events').get().then(query => {
            let arr = [];

            query.forEach(doc => arr.push(doc.data()));
            arr.forEach(item => {
                if (item.StartTime && item.StartTime.seconds) {
                    const start = item.StartTime.seconds;
                    item.StartTime = toDateTime(start.toString());
                }
                if (item.EndTime && item.EndTime.seconds) {
                    const end = item.EndTime.seconds;
                    item.EndTime = toDateTime(end.toString());
                }
            });
            resolve(arr);
        })
            .catch((err: any) => {
                console.log("Error getting document", err);
                reject(err);
            });
    });
}

export async function getItinerarySigned(filterFn: (itin: Itinerary) => boolean = (itin) => true): Promise<Itinerary[]> {
    let startingCollection = 'prod';
    // If in dev environment, grab from dev db
    if (__DEV__) {
        startingCollection = 'dev';
    }
    // Reference to firestore db
    var db = firebase.firestore();
    const uid = useSelector(state => state['UserInfo']['uid']);

    return new Promise<Itinerary[]>((resolve, reject) => {
        db.collection(startingCollection).doc('data').collection('users').doc(uid).collection('itineraries').get().then((querySnapshot) => {
            let obsArr = [];
            let i = 0;
            querySnapshot.forEach(doc => {
                obsArr[i] = Observable.create(obs => {
                    const obj = (doc.data() as Itinerary);
                    getItineraryEvents(db, startingCollection, uid, doc.id).then(resolve => {
                        obj.events = resolve;
                        obs.next(obj);
                    });
                });
                i++;
            });

            combineLatest(obsArr).subscribe((res: Itinerary[]) => {
                res.forEach(itin => {
                    if (itin.time && (itin.time as any).seconds) {
                        const start = (itin.time as any).seconds;
                        itin.time = toDateTime(start.toString());
                    }
                    if (itin.last_edit_time && (itin.last_edit_time as any).seconds) {
                        const start = (itin.last_edit_time as any).seconds;
                        itin.last_edit_time = toDateTime(start.toString());
                    }
                });

                res = res.filter((itin: Itinerary) => filterFn(itin));

                resolve(res);
            })
        })
            .catch((err: any) => {
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