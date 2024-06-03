const fs = require('node:fs');
const createClient = require('@mirochiu/firebase-storage-for-backend');

// please load your service account key
const serviceAccountKey = require('../serviceAccountKey.json');

// init the client for firebase storage
// FIREBASE_STORAGE_BUCKET=<firebase-project-name>.appspot.com
const client = createClient(process.env.FIREBASE_STORAGE_BUCKET, serviceAccountKey);

console.log(client.bucketName);

(async () => {
    // upload to firebase storage
    await client.upload('test.json', fs.readFileSync('./package.json'));

    console.log('upload done');

    // read json from firebase storage
    console.log(await client.getJson('test.json'))
})();
