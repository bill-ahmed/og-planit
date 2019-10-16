/**Define API routes for Express.js back-end **/

export default class Routes{
    private admin: any; // Reference to initialized firebase-admin object 

    /**Instantiate firebase-admin conneciton */
    constructor(firebaseAdmin: any){
        this.admin = firebaseAdmin;
        
    }

    /**Create a new user in Firebase and provision space in Firestore */
    public createUserPOST(req: any, res: any){
        console.log(req.body);
        res.header("Content-Type", "application/json");

        // Make a request to firebase to create a user
        this.admin.auth().createUser({
            email: req.body.email,
            password: req.body.password,
            emailVerified: false,
            displayName: `${req.body.firstName} ${req.body.middleName} ${req.body.lastName}`,
            photoURL: req.body.photoURL,
            disabled: false,
            age: req.body.age
        })
        .then((userRecord: any) => {
            console.log(`Created new user with ID: ${userRecord.uid}`)
            res.statusCode = 200;   // 200 = okay
            res.json(userRecord);   // Return the response back
        })
        .catch((error: any) => {
            console.log(`Error creating user: ${error}`);
            res.statusCode = 400;   // 400 = user error caused it to fail...probably
            res.json(error);    // Return the response back
        });
    }
}

