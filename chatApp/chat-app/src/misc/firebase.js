import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAsp8rB8jMGnLnjSnpNZFGK_7qjY3dBMeE',
  authDomain: 'galaxychat-ddf61.firebaseapp.com',
  projectId: 'galaxychat-ddf61',
  storageBucket: 'galaxychat-ddf61.appspot.com',
  messagingSenderId: '900284334768',
  appId: '1:900284334768:web:9c665a6c0961e19558b175',
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const storage = app.storage();
export const database = app.database();
