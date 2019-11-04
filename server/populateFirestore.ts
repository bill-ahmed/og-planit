const admin = require('firebase-admin');

// Private key to connect to Firebase services
var serviceAccount = require("./og-planit-firebase-serviceAccountKey.json");

// Initialize SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Reference to firestore
var db = admin.firestore();
const startingCollection = 'dev'    // starting endpoint

// Data to load
var dataToLoad = require('./FireBaseData.json');

dataToLoad.events.forEach(elem => {
    
    // Create new model
    let newDoc = {
        Name: elem.Name,
        Address: {
            City: elem.Address.city,
            Country: elem.Address.country,
            Number: elem.Address.address1.split(" ")[0],
            Province: elem.Address.state,
            Street: elem.Address.address1.split(" ")[1] + " " + elem.Address.address1.split(" ")[2],
        },
        AvgPrice: elem.AvgPrice,
        AvgTimeSpent: elem.AvgTimeSpent,
        ContactInfo: {
            Phone: elem.Phone,
            Email: !!elem.Email ? elem.Email : "N/A",
        },
        Description: elem.Description,
        EndTime: new Date(elem.EndTime),
        StartTime: new Date(elem.StartTime),
        Location: new admin.firestore.GeoPoint(
            elem.Location.latitude, elem.Location.longitude),
        Tags: [elem.Type],
        Type: elem.Type,
    };

    // Commit to firestore
    db.collection(startingCollection).doc('data').collection('events')
    .add(newDoc)
    .then(res => {
        console.log("Document written with ID: " + res.id)
    })
    .catch(err => {
        console.log("Error writing document. ", err)
    });

    console.log(newDoc);
});