import React, { useRef, useState } from "react";
import "./App.scss";
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
import NewUserPage from "./NewUserPage";
import LandingPage from "./LandingPage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ButtonGroup, Button, ButtonGroupItem } from "./common";

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

const WORKOUT = "workout";
const PUSH_UP_HISTORY = "push-up-history";
const PUSH_UP_ROOM = "push-up-room";
const PROFILE_PAGE = "profile-page";

function App() {
  const [user] = useAuthState(auth);
  const [firebaseData, setFirebaseData] = React.useState(getFirebase);

  return (
    <div className="App">
      <FirebaseContext.Provider value={firebaseData}>
        {user ? <LogedUser /> : <LandingPage />}
      </FirebaseContext.Provider>
    </div>
  );
}

function LogedUser(props) {
  const { uid } = auth.currentUser;
  const [tab, setTab] = React.useState(WORKOUT);

  const userPubicDataRef = firestore.collection(`users/${uid}/userPublicData`);
  const query2 = userPubicDataRef.where("uid", "==", uid);
  const [userPubicData = []] = useCollectionData(query2, { idField: "id" });

  return (
    <>
      {userPubicData.length > 0 ? (
        <>
          <header className="header">
            <div id="header-start" className="header__start" />
            <div id="header-center" className="header__center">
              <ButtonGroup className="header__center__tabs">
                <ButtonGroupItem
                  isSelected={tab === WORKOUT}
                  onClick={() => setTab(WORKOUT)}
                >
                  WORKOUTS
                </ButtonGroupItem>
                <ButtonGroupItem
                  isSelected={tab === PUSH_UP_ROOM}
                  onClick={() => setTab(PUSH_UP_ROOM)}
                >
                  ROOMS
                </ButtonGroupItem>
                <ButtonGroupItem
                  isSelected={tab === PROFILE_PAGE}
                  onClick={() => setTab(PROFILE_PAGE)}
                >
                  PROFILE
                </ButtonGroupItem>
              </ButtonGroup>
            </div>

            <div id="header-end" className="header__end" />
          </header>

          <div className="main-content">
            {tab === WORKOUT && <PushUpPage />}
            {tab === PUSH_UP_HISTORY && <History />}
            {tab === PUSH_UP_ROOM && <Room />}
            {tab === PROFILE_PAGE && <Profile />}
          </div>

          <footer className="footer">
            <div id="footer-start" />
            <div id="footer-center" footer="footer__center" />
            <div id="footer-end" />
          </footer>
        </>
      ) : (
        <NewUserPage />
      )}
    </>
  );
}

export default App;
