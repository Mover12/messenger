import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2k9aEtJhW00-Pwq8y3UKNtacRYiecoq8",
  authDomain: "test-a1769.firebaseapp.com",
  projectId: "test-a1769",
  storageBucket: "test-a1769.appspot.com",
  messagingSenderId: "104340686865",
  appId: "1:104340686865:web:6086f92d2f694be1a0c9b0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider(auth);

const db = getFirestore(app)

export { auth, provider, app, db };