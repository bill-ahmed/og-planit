/**All data to describe an event */
export interface PlanitLocation {
    Name: string,
    Address: Address,
    AvgPrice: number,
    AvgTimeSpent: Date,
    Ratings: locationRatings
    ContactInfo: ContactInfo,
    Description: string,
    EndTime: Date,
    Location: Geolocation,
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

export interface locationRatings {
    AveRatings: number,
    NumRatings: number,
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
    rating: [number],
    review: [string],
    time: Date,
    type: string,
    events: PlanitLocation[],
    GroupSize: number
}