import admin from 'firebase-admin';

import serviceAccount from '../credentials/sport-news-87005-firebase-adminsdk-rxeha-ebca6bb47e.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;