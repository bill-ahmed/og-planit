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
    rating: [number],
    review: [string],
=======
>>>>>>> 04f52cd5132d3dbbec2cd95fe94e0460aa7d490a
    time: Date,
    type: string,
    events: [location]
}