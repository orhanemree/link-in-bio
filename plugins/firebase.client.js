import { initializeApp } from "firebase/app";

export default defineNuxtPlugin(nuxtApp => {
    const env = useRuntimeConfig();
    const config = {
        apiKey: env.API_KEY,
        authDomain: `${env.PROJECT_ID}.firebaseapp.com`,
        projectId: env.PROJECT_ID,
        storageBucket: `${env.PROJECT_ID}.appspot.com`,
        messagingSenderId: env.SENDER_ID,
        appId: env.APP_ID,
        databaseURL: `https://${env.PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app`
    };
    initializeApp(config);
});