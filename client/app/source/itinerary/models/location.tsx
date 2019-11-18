import firebase from 'firebase/app';

/**All data to describe an event */
export interface PlanitLocation {
    Name: string,
    Address: Address,
    AvgPrice: number,
    AvgTimeSpent: Date,
    Ratings: {
        AveRatings: number,
        NumRatings: number,
    },
    ContactInfo: ContactInfo,
    Description: string,
    EndTime: Date,
    Location: firebase.firestore.GeoPoint,
    StartTime: Date,
    Tags: [string],
    Type: string,
    GroupSize: number,
    imageURL: string,
    websiteURL: string
}

/**Address to represent where a location is */
export interface Address {
    City: string,
    Country: string,
    Number: string,
    Province: string,
    Street: string
}

/**Rating given by user for a location.*/
export interface locationRatings {
    AveRatings: number,
    NumRatings: number
}

/**Contact information for the event */
export interface ContactInfo {
    Email: string,
    Phone: string
}

/**An itinerary for a user */
export interface Itinerary {
    id: string,
    name: string,
    last_edit_time: Date,
    location: string,
    price: number,
    startTime: Date,
    endTime: Date,
    type: string,
    events: PlanitLocation[],
    GroupSize: number,
    Filter: Filter,
    time: any
}

/** Filter Object that goes with each itinerary. Records user filters for easier modification. */
export interface Filter {
    Name: string,
    City: string,
    StartTime: Date,
    EndTime: Date,
    TravelDistance: number,
    Categories: String[],
    GroupSize: number,
    Budget: number
}