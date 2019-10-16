import Routes from './utils/routes';
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const EXPRESS = require('express'); // server
const CORS = require('cors');

const APP = EXPRESS();  // our app instance
const PORT = 4000;  // Port to run the application on


/**     SETUP VARIABLES AND OTHER REQUIRED DATA     **/
var serviceAccount = require("./og-planit-firebase-serviceAccountKey.json"); // Private key to connect to Firebase services

// Initialize SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://og-planit.firebaseio.com"
});


/****     INITIALIZE SERVER       ****/

// Enable CORS
//APP.use(CORS());

/* Enabls CORS */
APP.use(function(req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


/****     API ROUTES      ****/

/**Root page */
APP.get('/', (req: any, res: any) => {
    // Template for simple get request.
    res.send('Hello World!')
});


/** Create new user **/
APP.post('/createUser', bodyParser.json(), (req: any, res: any) => Routes.createUserPOST(req, res));


APP.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (http://localhost:4000)`);
});