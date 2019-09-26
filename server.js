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
APP.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


/****     API ROUTES      ****/

/**Root page */
APP.get('/', (req, res) => {
    // Template for simple get request.
    res.send('Hello World!')
});


/** Create new user **/
APP.post('/createUser', bodyParser.json(), (req, res) => {
    console.log(req.body);
    res.header("Content-Type", "application/json");
    
    // Make a request to firebase to create a user
    admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: false,
        phoneNumber: req.body.phoneNumber,
        displayName: `${req.body.firstName} ${req.body.middleName} ${req.body.lastName}`,
        photoURL: req.body.photoURL,
        disabled: false,
        age: req.body.age
    })
    .then(userRecord => {
        console.log(`Created new user with ID: ${userRecord.uid}`)
        res.statusCode = 200;   // 200 = okay
        res.json(userRecord);   // Return the response back
    })
    .catch(error => {
        console.log(`Error creating user: ${error}`);
        res.statusCode = 400;   // 400 = user error caused it to fail...probably
        res.json(error);    // Return the response back
    });
});


APP.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});