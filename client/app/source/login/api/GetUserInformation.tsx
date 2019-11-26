const firebase = require("firebase");

// Required for side-effects
require("firebase/firestore");

/**Given an accessToken, retrieve all the data under given user.
 * @param uid The unique ID of current user, as displayed in firebase
 * @returns A Promise for get request to Firestore
*/
export async function GetUserInfo(uid: string){
    let startingCollection = 'dev';

    // Reference to firestore db
    var db = firebase.firestore();
    return new Promise((resolve, reject) =>{
        db.collection(startingCollection).doc('data').collection('users').doc(uid).get()
        .then((doc:any) => {
            // If document is valid and exists
            if(doc.exists){
                resolve(doc.data());
            } else{
                console.log("No such document");
                reject(null);
            }
        })
        .catch((err:any) => {
            console.log("Error getting document", err);
            reject(err);
        });
    });
    
};