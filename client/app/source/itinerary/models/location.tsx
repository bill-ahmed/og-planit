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
    Type: string
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
<<<<<<< HEAD
<<<<<<< HEAD
    rating: [number],
    review: [string],
=======
>>>>>>> 04f52cd5132d3dbbec2cd95fe94e0460aa7d490a
=======
>>>>>>> 04f52cd5132d3dbbec2cd95fe94e0460aa7d490a
    time: Date,
    type: string,
    events: [PlanitLocation]
}