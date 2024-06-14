import fs from 'node:fs';
import createClient from '@mirochiu/firebase-storage-for-backend';

// please load your service account key
import serviceAccountKey from '../serviceAccountKey.json' assert { type: 'json' };

// init the client for firebase storage
// FIREBASE_STORAGE_BUCKET=<firebase-project-name>.appspot.com
const client = createClient(process.env.FIREBASE_STORAGE_BUCKET, serviceAccountKey);

console.log(client.bucketName);

// upload to firebase storage
const file = await client.upload('test.json', fs.readFileSync('./package.json'));

console.log('upload done');

// read json from firebase storage
console.log(await client.getJson('test.json'))


await client.setMetadata(file, {
    metadata: {
        description: `file description...${new Date().toISOString()}`,
        modified: '1900-01-02',
    },
});

console.log(JSON.stringify(await client.getMetadata(file), null, 2));

const all = await client.listAllFiles();
console.log(`${all.length} file(s) on filebase`);

await client.uploadFromLocalFile('LICENSE', 'LICENSE');
const filesList = await client.listFilesWithPrefix('LICE');
console.log(`${filesList.length} file(s) listed, first name is ${filesList[0].name}`);

const loaclDir = './sampleDir';
const uploadedFileInDir = await client.uploadLocalDirectory(loaclDir);
console.log(`${uploadedFileInDir.length} file(s) uploaded from ${loaclDir}, first name is ${uploadedFileInDir[0].name}`);