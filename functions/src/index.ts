import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const json2csv = require("json2csv").parse;

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.jsonReport = functions.https.onRequest( (request, response) => {
    const db = admin.firestore();
    let data:any = [];
    db.collection('_forms').get()
        .then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                data.push(doc.data());
            });
            response.status(200).json(data);         
        }).catch( (error) => {
            console.log('Error gettin document: ', error);
            response.status(200).send('Error gettin document: ' + error);
        });
});

exports.cssJsonReport = functions.https.onRequest( (request, response) => {
    const db = admin.firestore();
    let data: any = [];
    db.collection('_forms').get()
        .then( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                data.push(doc.data());
            });
            const csv = json2csv(data, {
                flatten: true,                
                delimiter: ';',
                excelStrings: true,
                includeEmptyRows: true,
            });  
            response.setHeader(
                'Content-disposition',
                'attachment; filename=report.csv'
            )
            response.set('Content-type', 'text/csv');
            response.set('Access-Control-Allow-Origin', '*');
            response.status(200).send(csv);                   
        }).catch( (error) => {
            console.log('Error gettin document: ', error);
            response.status(200).send('Error gettin document: ' + error);
        });    
});