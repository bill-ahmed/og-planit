/**Define API routes for Express.js back-end **/

export default class Routes{
    private admin: any; // Reference to initialized firebase-admin object
    private db: any;    // Reference to firestore

    /**Instantiate firebase-admin conneciton */
    constructor(firebaseAdmin: any, dbRef: any){
        this.admin = firebaseAdmin;
        this.db = dbRef;
        
    }

    /**Create a new user in Firebase and provision space in Firestore */
    public createUserPOST(req: any, res: any){
        console.log(req.body);
        res.header("Content-Type", "application/json");

        /** Make a request to firebase to create a user **/
        const userInformation = {
            email: req.body.email,
            password: req.body.password,
            emailVerified: false,
            displayName: `${req.body.firstName} ${req.body.middleName} ${req.body.lastName}`,
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            photoURL: req.body.photoURL,
            disabled: false,
            age: req.body.age
        };

        this.admin.auth().createUser(userInformation)
        .then((userRecord: any) => {
            console.log(`Created new user with ID: ${userRecord.uid}`);

            // Provision this new user a document in our db
            try {
                this.provisionNewUser(userInformation, userRecord.uid);

                res.statusCode = 200;   // 200 = okay
                res.json(userRecord);   // Return the response back

            } catch (error) {
                console.log(error);
                res.statusCode = 500;   // Internal error with Firestore
                res.json(error)
            }
        })
        .catch((error: any) => {
            console.log(`Error creating user: ${error}`);
            res.statusCode = 400;   // 400 = user error caused it to fail...probably
            res.json(error);    // Return the response back
        });

    }

    /**Provision a new user into Firestore
     * @param userData An object containing email, name, age, etc.
     * @param uid The unique ID of this new user
     */
    private provisionNewUser(userData: any, uid: string){
        /** Create document for this new user **/
        let userInfo = {
            name: [userData.firstName, userData.middleName, userData.lastName],
            displayName: userData.displayName,  // Display name is just concatenation of first, middle, and last names
            email: userData.email,
            age: userData.age,
            currentItinerary: null,     // Track which itinerary a user is following
            preferences: {}
        };

        // Commit new document
        let newUserInfoRef = this.db.collection('dev').doc('data').collection('users').doc(uid);
        newUserInfoRef.set(userInfo);

        // Also need to store collection of itineraries for this user
        let itineraries = this.db.collection('dev').doc('data').collection('users').doc(uid).collection('itineraries').doc('INIT_ITINERARY');
        itineraries.set({
            id: null, type: null, price: null, location: null, time: null, referenceToOriginal: null, last_edit_time: null  // Firebase requires at least ONE doc per collection
        });
        
    }

    /** Obtain JSON collection of all stored events */
    public getEventsList(req : any, res : any) {
        // Set response header
        res.header("Content-Type", "application/json");
        // Retrieve all doccuments in 'events' collection
        let resString = "";
        try {
            let collection = this.db.collection('dev').doc('data').collection('events').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.Name);
                });
            });
            res.status(200).json(collection);
        }
        
        catch (error) {
            console.log("Error retrieving events collection");
            res.status(500).send('Error retrieving events collection');
        }
    }

    /** Query's events by 'Type' index */
    public getEventsByType(req : any, res : any) {

    }

    /**Create a new event in Firebase and provision space in Firestore */
    public createEventPOST(req: any, res: any){
        console.log(req.body);
        res.header("Content-Type", "application/json");

        /** Make a request to firebase to create a event **/
        const eventInformation = {
            City: req.body.Address.City,
            Country: req.body.Address.Country,
            Number: req.body.Address.Number,
            Province: req.body.Province,
            Street: req.body.Street,
            AvgPrice: req.body.AvgPrice,
            AvgTimeSpent: req.body.AvgTimeSpent,
            Email: req.body.ContactInfo.Email,
            Phone: req.body.ContactInfo.Phone,
            Description: req.body.Description,
            EndTime: req.body.EndTime,
            Location: req.body.Location,
            Name: req.body.Name,
            AveRating: req.body.Ratings.AveRating,
            NumRatings: req.body.Ratings.NumRatings,
            StartTime: req.body.StartTime,
			Type: req.body.Type
        };

        this.admin.auth().createEvent(eventInformation)
        .then((eventRecord: any) => {
            console.log(`Created new Event with ID: ${eventRecord.uid}`);

            // Provision this new event a document in our db
            try {
                this.provisionNewEvent(eventInformation, eventRecord.uid);

                res.statusCode = 200;   // 200 = okay
                res.json(eventRecord);   // Return the response back

            } catch (error) {
                console.log(error);
                res.statusCode = 500;   // Internal error with Firestore
                res.json(error)
            }
        })
        .catch((error: any) => {
            console.log(`Error creating event: ${error}`);
            res.statusCode = 400;   // 400 = event error caused it to fail...probably
            res.json(error);    // Return the response back
        });

    }

    /**Provision a new event into Firestore
     * @param eventData An object containing address, name, description, ect.
     * @param eid The unique ID of this new event
     */
    private provisionNewEvent(eventData: any, eid: string){
        /** Create document for this new event **/
        let eventInfo = {
            City: eventData.Address.City,
            Country: eventData.Address.Country,
            Number: eventData.Address.Number,
            Province: eventData.Address.Province,
            Street: eventData.Address.Street,
            AvgPrice: eventData.AvgPrice,  
            AvgTimeSpent: eventData.AvgTimeSpent,
            Email: eventData.ContactInfo.Email,
            Phone: eventData.ContactInfo.Phone,
            Description:  eventData.Description, 
			EndTime:  eventData.EndTime, 
			Location:  eventData.Location, 
			Name:  eventData.Name,
            AveRating: eventData.Ratings.AveRating,
            NumRatings: eventData.Ratings.NumRatings,
			StartTime:  eventData.StartTime, 
			Type:  eventData.Type, 
            Tags: {}
        };

        // Commit new document
        let newEventInfoRef = this.db.collection('dev').doc('data').collection('events').doc(eid);
        newEventInfoRef.set(eventInfo);
    }

}

