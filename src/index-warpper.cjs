const createClient = require('./index.mjs');

module.exports = function (storageBucket, serviceAccountKey) {
    return createClient(storageBucket, serviceAccountKey);
};
