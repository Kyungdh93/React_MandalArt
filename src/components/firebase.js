import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyCJf8QP6hTXlYDWIiiN-gZkn16ybDUsBqM",
    authDomain: "mandalart-dcebc.firebaseapp.com",
    databaseURL: "https://mandalart-dcebc-default-rtdb.firebaseio.com",
    projectId: "mandalart-dcebc",
    storageBucket: "mandalart-dcebc.appspot.com",
    messagingSenderId: "480006732098",
    appId: "1:480006732098:web:9b2c4995952b97f3fd30db",
    measurementId: "G-69DSWCKLV5"
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);