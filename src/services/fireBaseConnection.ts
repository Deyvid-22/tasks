import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnEbo7WTxvOW5Xf9FvR5K4bq3Oq5RYobg",
  authDomain: "tarefasplus-26f29.firebaseapp.com",
  projectId: "tarefasplus-26f29",
  storageBucket: "tarefasplus-26f29.appspot.com",
  messagingSenderId: "97052135805",
  appId: "1:97052135805:web:93efba5a686defcaefbc14",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
