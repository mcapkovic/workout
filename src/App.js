import React, { useRef, useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import 'firebase/analytics';
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseContext } from "./context";
import Chat from "./Chat";
import PushUpPage from "./PushUpPage";
import History from "./History";
import Room from "./Rooms";
import Profile from "./Profile";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();
// const perf = firebase.performance();

function getFirebase() {
  return {
    auth,
    firestore,
    firebase,
  };
}

const PUSH_UP_COUNT_PAGE = "push-up-count";
const PUSH_UP_HISTORY = "push-up-history";
const PUSH_UP_ROOM = "push-up-room";
const PROFILE_PAGE = "profile-page";

function App() {
  const [user] = useAuthState(auth);
  const [firebaseData, setFirebaseDate] = React.useState(getFirebase);
  const [tab, setTab] = React.useState("");

  return (
    <div className="App">
      <header>
        {user ? (
          <>
            <button onClick={() => setTab(PUSH_UP_COUNT_PAGE)}>
              Workouts
            </button>
            <button onClick={() => setTab(PUSH_UP_HISTORY)}>History</button>
            <button onClick={() => setTab(PUSH_UP_ROOM)}>Rooms</button>
            <button onClick={() => setTab(PROFILE_PAGE)}>Profile</button>{" "}
          </>
        ) : (
          <SignIn />
        )}
      </header>
      <FirebaseContext.Provider value={firebaseData}>
        {/* <section>
          {user && <Chat />}
          </section> */}

        {tab === PUSH_UP_COUNT_PAGE && <PushUpPage />}
        {tab === PUSH_UP_HISTORY && <History />}
        {tab === PUSH_UP_ROOM && <Room />}
        {tab === PROFILE_PAGE && <Profile />}
      </FirebaseContext.Provider>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

export default App;
