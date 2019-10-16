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
            displayName: userData.displayName,
            email: userData.email,
            age: userData.age,
            preferences: {}
        };

        // Commit new document
        let newUserInfoRef = this.db.collection('dev').doc('data').collection('users').doc(uid);
        newUserInfoRef.set(userInfo);
        
    }
}

