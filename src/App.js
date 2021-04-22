import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import 'firebase/analytics';
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseContext } from "./context";
import WorkoutsPage from "./workoutsPage/WorkoutsPage";
import History from "./History";
import Room from "./roomsPage/Rooms";
import Profile from "./profilePage/Profile";
import NewUserPage from "./newUserPage/NewUserPage";
import LandingPage from "./landingPage/LandingPage";
import useUserData from "./hooks/useUserData";
import Tabs from "./Tabs";

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
const EXERCISE = "exercise";

function App() {
  const [user, loading] = useAuthState(auth);
  const [firebaseData, setFirebaseData] = React.useState(getFirebase);

  return (
    <div className="App">
      <FirebaseContext.Provider value={firebaseData}>
        <header className="header">
          <div id="header-start" className="header__start" />
          <div id="header-center" className="header__center"></div>
          <div id="header-end" className="header__end" />
        </header>

        <Router>
          {user ? <LogedUser /> : <LandingPage loading={loading} />}
        </Router>

        <footer className="footer">
          <div id="footer-start" />
          <div id="footer-center" footer="footer__center" />
          <div id="footer-end" />
        </footer>
      </FirebaseContext.Provider>
    </div>
  );
}

function LogedUser() {
  const userPubicData = useUserData();

  return (
    <div className="main-content">
      {userPubicData && userPubicData.length > 0&& <Tabs />}
      
      <Switch>
        <Route path="/exercises" component={WorkoutsPage} />
        <Route path="/rooms" component={Room} />
        <Route path="/profile" component={Profile} />
        <Route path="/new-user" component={NewUserPage} />
        <Redirect to="/exercises" from="*" />
      </Switch>
    </div>
  );
}

export default App;
