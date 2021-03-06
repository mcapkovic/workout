import React from "react";
import { FirebaseContext } from "../context";
import { Button } from "../common";

function SignIn() {
  const { auth, firestore, firebase } = React.useContext(FirebaseContext);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };

  function demoSignIn() {
    auth
      .signInWithEmailAndPassword("demo@demo.com", "123456")
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Button className="landing-page__google" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
      <Button className="landing-page__demo" onClick={demoSignIn}>
        Sign in to demo accout
      </Button>
    </>
  );
}

export default SignIn;
