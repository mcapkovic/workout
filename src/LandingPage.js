import React from "react";
import { FirebaseContext } from "./context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, TextBox, Separator } from "./common";

function SignIn() {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <Button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
      {/* <p>
        Do not violate the community guidelines or you will be banned for life!
      </p> */}
    </>
  );
}

function LandingPage(props) {
  return (
    <div className="landing-page">
      <h1 className="landing-title">Hello :)</h1>
      <SignIn />
    </div>
  );
}

export default LandingPage;
