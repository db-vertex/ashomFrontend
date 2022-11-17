// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { updateDeviceToken } from "../API/Userapis";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAqo6KKZE1dC34bu9Zxn3-PIlzs-Fhpz78",
    authDomain: "ashom-277f0.firebaseapp.com",
    projectId: "ashom-277f0",
    storageBucket: "ashom-277f0.appspot.com",
    messagingSenderId: "902457448135",
    appId: "1:902457448135:web:de472b98107026f176d0e2",
    measurementId: "G-37YDP0PFP9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const messaging = getMessaging();
export const requestForToken = () => {
    try{
    return getToken(messaging, { vapidKey: 'BOWKiZMo9oPAVqNCFE1QC7f_5s37Pr3m4Qb-tZ_0GfvcKFqOUQ4_zOusiFyQ_MQK5Dj6aP0m9i7mXFk_Us1k3zI' })
        .then((currentToken) => {
            if (currentToken) {
                window.localStorage.setItem('device_token', currentToken);
                updateDeviceToken(currentToken);
                // console.log('current token for client: ', currentToken);
                // Perform any other neccessary action with the token
            } else {
                // Show permission request UI
                // console.log('No registration token available. Request permission to generate one.');
            }
           
        })
        .catch((err) => {
            // console.log('An error occurred while retrieving token. ', err);
        });
    }
    catch(e){
        
    } 
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload);
        });
    });