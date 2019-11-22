/**Define API routes for Express.js back-end **/

export default class Routes {
    private admin: any; // Reference to initialized firebase-admin object
    private db: any;    // Reference to firestore

    /**Instantiate firebase-admin conneciton */
    constructor(firebaseAdmin: any, dbRef: any) {
        this.admin = firebaseAdmin;
        this.db = dbRef;

    }

    /**Create a new user in Firebase and provision space in Firestore */
    public createUserPOST(req: any, res: any) {
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
                console.log(new Date(), `Created new user with ID: ${userRecord.uid}`);

                // Provision this new user a document in our db
                try {
                    this.provisionNewUser(userInformation, userRecord.uid);

                    res.statusCode = 200;   // 200 = okay
                    res.json(userRecord);   // Return the response back

                } catch (error) {
                    console.log(new Date(), error);
                    res.statusCode = 500;   // Internal error with Firestore
                    res.json(error)
                }
            })
            .catch((error: any) => {
                console.log(new Date(), `Error creating user: ${error}`);
                res.statusCode = 400;   // 400 = user error caused it to fail...probably
                res.json(error);    // Return the response back
            });

    }

    /**Given an access token and itinerary info, create a new itinerary for this user
     * Request body MUST be in the format:
     * 
     * {
     *  accessToken: string,
     *  itineraryDetails: {name: string || null, last_edit_time: TimeStamp || null},
     *  events: [Array of event objects]
     * }
     * 
     */
    public createItineraryPOST(req: any, res: any) {
        res.header("Content-Type", "application/json");

        // Validate access token
        this.admin.auth().verifyIdToken(req.body.accessToken)
            .then((decodedToken: any) => {

                // If access token is valid, add this itinerary to the user's collection of itineraries
                let uid = decodedToken.uid
                const newItinerary = req.body.itineraryDetails;
                const newItineraryEvents = req.body.events;

                let newItineararyRef = this.db.collection('dev').doc('data').collection('users').doc(uid).collection('itineraries').add(newItinerary).then((resp: any) => {
                    console.log(new Date(), "Created new itinerary for user " + uid + " with id " + resp.id);

                    // Add events to this itinerary
                    newItineraryEvents.map((elem: any) => {
                        elem.EndTime = new Date(elem.EndTime)
                        elem.StartTime = new Date(elem.StartTime)
                        this.db.collection('dev').doc('data').collection('users').doc(uid).collection('itineraries').doc(resp.id).collection('events').add(elem);
                    })
                    res.statusCode = 200;
                    res.json(resp.id);
                });


            })
            .catch((err: any) => {
                console.log(err);
                res.statusCode = 400;
                res.json(err);
            })

    }

    /**Given an access token and itinerary id, removes that itinerary
     * Request body MUST be in the format:
     * 
     * {
     *  accessToken: string,
     *  itineraryId: string,
     * }
     * 
     */
    public deleteItineraryPost(req: any, res: any) {
        // console.log("New itinerary", req.body);
        res.header("Content-Type", "application/json");

        // Validate access token
        this.admin.auth().verifyIdToken(req.body.accessToken).then((decodedToken: any) => {

            // If access token is valid, add this itinerary to the user's collection of itineraries
            let uid = decodedToken.uid;
            const itineraryId = req.body.itineraryId;

            this.db.collection('dev').doc('data').collection('users').doc(uid).collection('itineraries').doc(itineraryId).delete().then((resp: any) => {
                console.log(new Date(), "Deleted itinerary doc:", itineraryId);
                this.db.collection('dev').doc('data').collection('users').doc(uid).collection('itineraries').doc(itineraryId).collection('events').get().then((resp: any[]) => {
                    console.log(new Date(), "done");
                    res.statusCode = 200;
                    res.json(resp);
                });
            });
        })
        .catch((err: any) => {
            console.log(new Date(), err);
            res.statusCode = 400;
            res.json(err);
        })

    }

    /**Provision a new user into Firestore
     * @param userData An object containing email, name, age, etc.
     * @param uid The unique ID of this new user
     */
    private provisionNewUser(userData: any, uid: string) {
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
            name: null, last_edit_time: null  // Firebase requires at least ONE doc per collection
        });

    }

    /** Obtain JSON collection of all stored events */
    public getEventsList(req: any, res: any) {
        // Set response header
        res.header("Content-Type", "application/json");
        // Retrieve all doccuments in 'events' collection
        let resString = "";
        try {
            let collection = this.db.collection('dev').doc('data').collection('events').get()
                .then((snapshot: any) => {
                    snapshot.forEach((doc: any) => {
                        console.log(new Date(), doc.Name);
                    });
                });
            res.status(200).json(collection);
        }

        catch (error) {
            console.log(new Date(), "Error retrieving events collection");
            res.status(500).send('Error retrieving events collection');
        }
    }
}
