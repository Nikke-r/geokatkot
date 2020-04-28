import firebase from 'firebase';

const config = {
apiKey: process.env.REACT_APP_FB_APIKEY,
authDomain: "geokatkot-e83e8.firebaseapp.com",
databaseURL: "https://geokatkot-e83e8.firebaseio.com",
projectId: "geokatkot-e83e8",
storageBucket: "geokatkot-e83e8.appspot.com",
messagingSenderId: "531859359451",
appId: "1:531859359451:web:32ba689347a29edfd82efe"
};

firebase.initializeApp(config);

export default firebase;