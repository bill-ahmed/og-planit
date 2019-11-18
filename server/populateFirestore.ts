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

/**Populate all event data to firestore */
function loadDataToFirestore(){
    GetEventsData().forEach((newDoc: any) => {
        // Commit to firestore
        db.collection(startingCollection).doc('data').collection('events')
        .add(newDoc)
        .then((res: any) => {
            console.log("Document written with ID: " + res.id)
        })
        .catch((err: any) => {
            console.log("Error writing document. ", err)
        });
    });
}


/**Give the user with unique id "uid" an itinerary */
function createItineraryForUser(uid: string, data: any): void{
    let newItineraryRef = db.collection('dev').doc('data').collection('users').doc(uid).collection('itineraries').add(data.itineraryInfo).then((resp: any) => {
        console.log("Created itinerary with id " + resp.id);

        data.events.map((elem: any) => {

            db.collection('dev').doc('data').collection('users').doc(uid).collection('itineraries').doc(resp.id).collection('events').add(elem);
        });
    });
}

/*** Helper functions to accomplish other tasks***/

/**Get a random integer between min and max */
function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

/**Get properly formatted data for firestore */
function GetEventsData(): Array<any>{
    var allEventsData = dataToLoad.events.map((elem: any) => {
        return({
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
                GroupSize: elem['Reccomended Group Size'],
                imageURL: elem["Image Url"],
                websiteURL: elem.Url
            }
        );
    });

    return allEventsData;
}

function main(){
    // const uid = "7XVFTyYojiUTiFMeTI1pTRFhhiB2";
    // var eventsToAdd = GetEventsData().filter(() => getRndInteger(1, 100)%3 === 0);

    // createItineraryForUser(uid, {
    //     itineraryInfo: {
    //         name: "Test itinerary 1",
    //         last_edit_time: new Date()
    //     },
    //     events: eventsToAdd
    // });

    
}