import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

/**
 * Config is read from environment variables so this repo carries no secrets.
 * Local dev: copy .env.local.example -> .env.local and fill in the values.
 * Vercel: add the same NEXT_PUBLIC_FIREBASE_* vars under Project Settings -> Environment Variables.
 */
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey && firebaseConfig.projectId
);

if (!isFirebaseConfigured && typeof window !== "undefined") {
    console.warn(
        "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* variables to .env.local"
    );
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

let analytics: Analytics | undefined;
if (typeof window !== "undefined" && isFirebaseConfigured) {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { db, analytics };
