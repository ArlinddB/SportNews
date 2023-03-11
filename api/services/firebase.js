import admin from 'firebase-admin';

import serviceAccount from '../credentials/sport-news-87005-firebase-adminsdk-rxeha-d956f6203f.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;