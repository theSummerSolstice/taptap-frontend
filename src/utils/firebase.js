import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const loginGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const { user } = await firebase.auth().signInWithPopup(provider);

  return user;
};

const logoutGoogle = async () => {
  await firebase.auth().signOut();
};

firebase.initializeApp(firebaseConfig);

export default {
  loginGoogle,
  logoutGoogle,
};
