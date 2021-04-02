import React from "react";
import { FirebaseContext } from "../context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button, TextBox, Separator } from "../common";

function NewUserPage(props) {
    const { auth, firestore, firebase } = React.useContext(FirebaseContext);
    const { uid, photoURL } = auth.currentUser;

  const [name, setName] = React.useState("");

  const userRef = firestore.collection(`users/${uid}/userPublicData`).doc('general');

  async function submitUserInfo() {
    await userRef.set({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      name,
    }, { merge: true });
    setName("");
  }

  return (
    <div>
      choose your user name:{" "}
      <TextBox value={name} onChange={(e) => setName(e.target.value)} />
      <Button disabled={!name} onClick={submitUserInfo}>submit</Button>
    </div>
  );
}

export default NewUserPage;
