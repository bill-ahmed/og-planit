export interface location {
    Address: Address,
    AvgPrice: number,
    AvgTimeSpent: Date,
    ContactInfo: ContactInfo,
    Description: string,
    EndTime: Date,
    Location: Geolocation,
    StartTime: Geolocation,
    Tags: [string],
    Type: string    
}

export interface Address {
    City: string,
    Country: string,
    Number: string,
    Province: string,
    Street: string
}

export interface ContactInfo {
    Email: string,
    Phone: string
}