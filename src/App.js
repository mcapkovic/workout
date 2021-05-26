import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./App.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import 'firebase/analytics';
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseContext, AppContext } from "./context";
import WorkoutsPage from "./workoutsPage";
import History from "./History";
import Room from "./roomsPage/Rooms";
import Profile from "./profilePage/Profile";
import NewUserPage from "./newUserPage/NewUserPage";
import LandingPage from "./landingPage/LandingPage";
import useUserData from "./hooks/useUserData";
import Tabs from "./Tabs";
import {
  BottomNavigation,
  NavButton,
  NavigationRail,
  NavigationDrawer,
  MainLayout,
  AppBar,
} from "./common";
import useMedia from "./hooks/useMedia";
import { AnimateSharedLayout } from "framer-motion";
import {
  Person24Filled,
  Person24Regular,
  ConferenceRoom24Regular,
  ConferenceRoom24Filled,
  TextBulletListSquare24Regular,
  TextBulletListSquare24Filled,
  ChevronLeft24Regular,
} from "@fluentui/react-icons";

import NavRail from "./layout/NavRail";
import NavBottom from "./layout/NavBottom";
import NavDrawer from "./layout/NavDrawer";
import AppBarWrapper from "./layout/AppBarWrapper";

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

const Layout = () => {
  const size = useMedia(
    // Media queries
    ["(min-width: 1000px)", "(min-width: 600px)"],
    // Column counts (relates to above media queries by array index)
    ["large", "medium"],
    // Default column count
    "small"
  );

  return (
    <MainLayout
      small={size === "small"}
      medium={size === "medium"}
      large={size === "large"}
      navRail={<NavRail />}
      appBar={<AppBarWrapper />}
      appContent={<LogedUser />}
      navBottom={<NavBottom />}
      navDrawer={<NavDrawer />}
    />
  );
};

const defaultAppDataState = {
  appBarData: { hideStart: true, title: undefined },
};

function App() {
  const [user, loading] = useAuthState(auth);
  const [firebaseData, setFirebaseData] = React.useState(getFirebase);
  const appState = React.useState(defaultAppDataState);

  console.log('render')
  return (
    <div className="App">
      <FirebaseContext.Provider value={firebaseData}>
        <AppContext.Provider value={appState}>
          {/* <header className="header">
          <div id="header-start" className="header__start" />
          <div id="header-center" className="header__center"></div>
          <div id="header-end" className="header__end" />
        </header> */}

          <Router>
            {user ? <Layout /> : <LandingPage loading={loading} />}
          </Router>

          {/* <footer className="footer">
          <div id="footer-start" />
          <div id="footer-center" footer="footer__center" />
          <div id="footer-end" />
        </footer> */}
        </AppContext.Provider>
      </FirebaseContext.Provider>
    </div>
  );
}

function LogedUser() {
  const userPubicData = useUserData();

  return (
    <div className="main-content">
      {userPubicData && userPubicData.length > 0 && <Tabs />}

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
