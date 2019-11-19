import Routes from './utils/routes';
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const EXPRESS = require('express'); // server
const CORS = require('cors');

const APP = EXPRESS();  // our app instance
const PORT = 4000;  // Port to run the application on


/**     SETUP VARIABLES AND OTHER REQUIRED DATA     **/

// Private key to connect to Firebase services
var serviceAccount = require("./og-planit-firebase-serviceAccountKey.json");

// Initialize SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Reference to firestore
let db = admin.firestore();


/****   API ROUTES  ****/
const routes = new Routes(admin, db);   // Instantiate routes

/** Create new user **/
APP.post('/createUser', bodyParser.json(), (req: any, res: any) => routes.createUserPOST(req, res));

/** Get events collection */
APP.get('/getEventsList', (req: any, res: any) => routes.getEventsList(req, res));

/**Create a new itinerary */
APP.post('/createItinerary', bodyParser.json(), (req: any, res: any) => routes.createItineraryPOST(req, res));

/**Delete an existing itinerary */
APP.post('/deleteItinerary', bodyParser.json(), (req: any, res: any) => routes.deleteItineraryPost(req, res));

/****   INITIALIZE SERVER   ****/

//Enabls CORS
APP.use(function(req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Run the server
APP.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (http://localhost:4000)`);
});