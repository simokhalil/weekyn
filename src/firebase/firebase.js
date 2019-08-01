import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const prodConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: '',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
};

const devConfig = {
  apiKey: 'AIzaSyDCRwDpaLBe5vUifXNsLQpND-6Tj1MihDA',
  authDomain: 'weekyn-fea79.firebaseapp.com',
  databaseURL: 'https://weekyn-fea79.firebaseio.com',
  projectId: 'weekyn-fea79',
  storageBucket: 'weekyn-fea79.appspot.com',
  messagingSenderId: '617757654254',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const db = firebase.firestore();
const settings = {
  /* your settings... */
};
db.settings(settings);

db.enablePersistence();

const storage = firebase.storage();

export {
  auth,
  db,
  storage,
};