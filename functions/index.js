const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

exports.getAllPosts = functions.https.onRequest(async (request, response) => {
  const snapshot = await admin
    .firestore()
    .collection('posts')
    .get();
  const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  response.json({ posts });
});

exports.incrementCommentCount = functions.firestore
  .document('posts/{postId}/comments/{commentId}')
  .onCreate(async (snapshot, context) => {
    const { postId } = context.params;
    const postRef = firestore.doc(`posts/${postId}`);

    const snap = await postRef.get();
    const comments = snap.get('comments');

    return postRef.update({ comments: comments + 1 });
  });

exports.decrementCommentCount = functions.firestore
  .document('posts/{postId}/comments/{commentId}')
  .onDelete(async (snapshot, context) => {
    const { postId } = context.params;
    const postRef = firestore.doc(`posts/${postId}`);

    const snap = await postRef.get();
    const comments = snap.get('comments');

    return postRef.update({ comments: comments - 1 });
  });

exports.sanitizeContent = functions.firestore
  .document('posts/{postId}')
  .onWrite(async change => {
    if (!change.after.exists) return;

    const { content, sanitized } = change.after.data();

    if (content && !sanitized) {
      return change.after.ref.update({
        content: content.replace(/CoffeeScript/g, '***'),
        sanitized: true,
      });
    }

    return null;
  });

exports.updateUserInformation = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const { displayName } = change.after.data();

    const posts = await admin
      .firestore()
      .collection('posts')
      .where('user.uid', '==', change.after.id)
      .get();

    return posts.forEach(doc => {
      doc.ref.update({ 'user.displayName': displayName });
    });
  });

exports.createUserDocument = functions.auth.user().onCreate(user => {
  const { uid, email, displayName, photoURL } = user;
  return firestore
    .collection('users')
    .doc(uid)
    .set({
      email,
      displayName,
      photoURL,
      createdByCloudFunction: true,
    });
});
