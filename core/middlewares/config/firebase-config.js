const admin = require('firebase-admin');

const serviceAccount = require('./fir-35e73-firebase-adminsdk-qnhvl-e17adfef59.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-35e73-default-rtdb.europe-west1.firebasedatabase.app"
});

module.exports = admin;
