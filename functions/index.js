const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: process.env.DATABASE_URL,
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.scheduledRecommandWriters = functions
  .runWith({
    timeoutSeconds: 300,
  })
  .pubsub.schedule('every 5 minutes')
  .timeZone('Asia/Seoul')
  .onRun(async (context) => {
    const defaultDatabase = admin.database();
    const ref = defaultDatabase.ref('recommandWriter');

    const snapshot = await ref.once('value');
    const schedule = snapshot.val();
    if (!schedule) {
      return null;
    }

    const newSchedule = schedule.map((item) => {
      if (item.at < Date.now()) {
        // 실행
        return null;
      }
      return item;
    });

    ref.set(newSchedule.filter((item) => item !== null));
    return null;
  });

exports.test = functions.https.onRequest(async (req, res) => {
  return;
});
