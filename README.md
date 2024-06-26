# @mirochiufirebase-storage-for-backend

## installation

`npm install @mirochiu/firebase-storage-for-backend`

## upgrade

`npm install @mirochiu/firebase-storage-for-backend@latest`

## usage

### cjs

```javascript
const fs = require('node:fs');
const createClient = require('@mirochiu/firebase-storage-for-backend');

// please load your service account key
const serviceAccountKey = require('../serviceAccountKey.json');

// init the client for firebase storage
const client = createClient('<firebase-project-name>.appspot.com', serviceAccountKey);

console.log(client.bucketName);

(async () => {
    // upload to firebase storage
    await client.upload('test.json', fs.readFileSync('./package.json'));

    console.log('upload done');

    // read json from firebase storage
    console.log(await client.getJson('test.json'))
})();
```

### mjs

```javascript
import fs from 'node:fs';
import createClient from '@mirochiu/firebase-storage-for-backend';

// please load your service account key
import serviceAccountKey from './serviceAccountKey.json' assert { type: 'json' };

// init the client for firebase storage
const client = createClient('<firebase-project-name>.appspot.com', serviceAccountKey);

// upload to firebase storage
await client.upload('test.json', fs.readFileSync('./package.json'));
console.log('upload done');

// read json from firebase storage
console.log(await client.getJson('test.json'))
```

## reference

[Bucket API documentation](https://googleapis.dev/nodejs/storage/latest/Bucket.html)
