import React, { useRef, useState } from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import 'firebase/analytics';

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Chat from "./Chat";
import { FirebaseContext } from "./context";

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

function getFirebase() {
  return {
    auth,
    firestore,
    firebase,
  };
}

function App() {
  const [user] = useAuthState(auth);
  const [firebaseData, setFirebaseDate] = React.useState(getFirebase);
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>

        {user ? <SignOut /> : <SignIn />}
      </header>
      {/* <section>
        <CreateName />
      </section> */}
      <section>{user && <ChatRoom />}</section>

      <FirebaseContext.Provider value={firebaseData}>
        <Chat />
      </FirebaseContext.Provider>
    </div>
  );
}

function CreateName() {
  const [value, setValue] = React.useState("");
  const messagesRef = firestore.collection("name");

  const sendMessage = async (e) => {
    const { uid } = auth.currentUser;

    await messagesRef.add({
      name: value,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setValue("");
  };

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />{" "}
      <button onClick={sendMessage}>sent</button>{" "}
    </>
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

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt", "asc").limitToLast(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    // console.log(auth.currentUser)

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
