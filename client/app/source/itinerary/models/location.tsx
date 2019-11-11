/**All data to describe an event */
export interface location {
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
    Location: Geolocation,
    StartTime: Geolocation,
    Tags: [string],
    Type: string,
    GroupSize: number
}

/**Address to represent where a location is */
export interface Address {
    City: string,
    Country: string,
    Number: string,
    Province: string,
    Street: string
}

/**Contact information for the event */
export interface ContactInfo {
    Email: string,
    Phone: string
}

/**An itinerary for a user */
export interface Itinerary {
    Id: string,
    Name: string,
    LastEditTime: Date,
    Location: string,
    Price: number,
    Time: Date,
    Type: string,
    Events: [location],
    GroupSize: number
}